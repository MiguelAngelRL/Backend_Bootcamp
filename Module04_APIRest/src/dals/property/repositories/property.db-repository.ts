import { PropertyRepository } from './property.repository';
import { ListingAndReview, PropertyReview } from '../property.model';
import { getDBInstance } from 'core/servers';
import { Db, ObjectId } from 'mongodb';

const listingsAndReviewsCollection = 'listingsAndReviews';

export const dbRepository: PropertyRepository = {

  getPropertyList: async (uppercasedCountry) => {
    const db = getDBInstance();
    return uppercasedCountry ? 
            await db.collection<ListingAndReview>(listingsAndReviewsCollection).find({"address.country": new RegExp(`^${uppercasedCountry}$`, 'i')}).toArray():
            await db.collection<ListingAndReview>(listingsAndReviewsCollection).find().toArray();
  },
  
  getProperty: async (id: string) => {
    const db = getDBInstance();
    // Modo simple, nos traemos la propiedad con todas las reviews y después nos quedamos con las 5 últimas desde código
    // ToDo: Si no lo hacemos así, ya no haría falta el ordenar y recortar el array en los mappers, sólo para el mock
    return await db.collection<ListingAndReview>(listingsAndReviewsCollection).findOne({_id: id});

    //Modo complicado, haciendo que desde Mongo se nos devuelvan directamente las 5 últimas reviews
    // return await getPropertyWithAggregation(db, id);
  },
  
  saveProperty: async (property: ListingAndReview) => {
    return Boolean(property._id) ? await updateProperty(property) : await insertProperty(property)
  },
  
  deleteProperty: async (id: string) => {
    const db = getDBInstance();
    throw new Error('Not implemented');
  },

  saveReview: async (review: PropertyReview) => {
    return Boolean(review._id) ? await updateReview(review) : await insertReview(review);
  }
};

const insertProperty = async (newProperty: ListingAndReview): Promise<ListingAndReview> => {
  const db = getDBInstance();
  newProperty._id = new ObjectId().toString();;
  await db.collection<ListingAndReview>(listingsAndReviewsCollection).insertOne(newProperty);
  return await db.collection<ListingAndReview>(listingsAndReviewsCollection).findOne({_id: newProperty._id});
};

const updateProperty = async (propertyModification: ListingAndReview): Promise<ListingAndReview> => {
  const db = getDBInstance();
  const currentProperty = await db.collection<ListingAndReview>(listingsAndReviewsCollection).findOne({_id: propertyModification._id});
  await db.collection<ListingAndReview>(listingsAndReviewsCollection).updateOne({_id: propertyModification._id}, {$set: {...currentProperty, ...propertyModification}});
  return await db.collection<ListingAndReview>(listingsAndReviewsCollection).findOne({_id: propertyModification._id});
};

const insertReview = async (review: PropertyReview): Promise<ListingAndReview> => {
  const db = getDBInstance();
  review._id = new ObjectId().toString();
  await db.collection<ListingAndReview>(listingsAndReviewsCollection).updateOne({'_id': review.listing_id}, {"$push": {reviews: review}});
  return await db.collection<ListingAndReview>(listingsAndReviewsCollection).findOne({_id: review.listing_id});
};

const updateReview = async (review: PropertyReview): Promise<ListingAndReview> => {
  const db = getDBInstance();
  await db.collection<ListingAndReview>(listingsAndReviewsCollection).
    updateOne({_id: review.listing_id, 'reviews._id': review._id}, {$set: {"reviews.$.reviewer_name": review.reviewer_name, "reviews.$.comments": review.comments}});
  return await db.collection<ListingAndReview>(listingsAndReviewsCollection).findOne({_id: review.listing_id});
};

//Modo complicado, haciendo que desde Mongo se nos devuelvan directamente las 5 últimas reviews
const getPropertyWithAggregation = async (db: Db, id: string): Promise<ListingAndReview> => {
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
  return await db.collection(listingsAndReviewsCollection).aggregate(agg)?.next() as ListingAndReview;
}