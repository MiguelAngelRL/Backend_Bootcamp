import { PropertyRepository } from './property.repository';
import { ListingAndReview, PropertyReview } from '../property.model';
import { getDBInstance } from 'core/servers';
import { Db } from 'mongodb';


export const dbRepository: PropertyRepository = {

  getPropertyList: async (uppercasedCountry) => {
    const db = getDBInstance();
    return uppercasedCountry ? 
            await db.collection<ListingAndReview>('listingsAndReviews').find({"address.country": new RegExp(`^${uppercasedCountry}$`, 'i')}).toArray():
            await db.collection<ListingAndReview>('listingsAndReviews').find().toArray();
  },
  
  getProperty: async (id: string) => {
    const db = getDBInstance();
    // Modo simple, nos traemos la propiedad con todas las reviews y después nos quedamos con las 5 últimas desde código
    // ToDo: Si no lo hacemos así, ya no haría falta el ordenar y recortar el array en los mappers, sólo para el mock
    // return await db.collection<ListingAndReview>('listingsAndReviews').findOne({_id: id});

    //Modo complicado, haciendo que desde Mongo se nos devuelvan directamente las 5 últimas reviews
    return await getPropertyWithAggregation(db, id);
  },
  
  saveReview: async (newReview: PropertyReview) => {
    const db = getDBInstance();
    const id = newReview.listing_id;
    await db.collection<ListingAndReview>('listingsAndReviews').findOneAndUpdate({'_id': id}, {"$push": {reviews: newReview}});
    return await getPropertyWithAggregation(db, id);
  },
  
  saveProperty: async (property: ListingAndReview) => {
    const db = getDBInstance();
    throw new Error('Not implemented');
  },
  
  deleteProperty: async (id: string) => {
    const db = getDBInstance();
    throw new Error('Not implemented');
  },
};

const getPropertyWithAggregation = async (db: Db, id: string) => {
  const agg = [
    {'$match': {'_id': id}},
    {
      '$addFields': {
        reviews: {
          '$function': {
            body: `function(reviews){
              const sortReviewsByDate = function(a, b){
                const dateA = (new Date(a.date)).getTime();
                const dateB = (new Date(b.date)).getTime();
                return (dateB - dateA);
              }
              const sortedArray = reviews.sort(sortReviewsByDate);
              const slicedArray = sortedArray.slice(0, 5);
              return slicedArray;
            }`,
            args: ["$reviews"],
            lang: "js"
          }
        }
      }
    }
  ];
  return await db.collection('listingsAndReviews').aggregate(agg)?.next() as ListingAndReview;
}
