import { PropertyRepository } from './property.repository';
import { ListingAndReview, PropertyReview } from '../property.model';
import { db } from '../../mock-data';

export const mockRepository: PropertyRepository = {
  getPropertyList: async () => db.properties,
  getProperty: async (_id: string) => db.properties.find((b) => b._id === _id),
  saveReview: async (review: PropertyReview) => await insertReview(review),
  saveProperty: async (property: ListingAndReview) =>
    Boolean(property._id) ? updateProperty(property) : insertProperty(property),
  deleteProperty: async (_id: string) => {
    db.properties = db.properties.filter((b) => b._id !== _id);
    return true;
  },
};

const insertProperty = (property: ListingAndReview) => {
  const _id = getIdFromArrayLength(db.properties);
  const newProperty: ListingAndReview = {
    ...property,
    _id,
  };

  db.properties = [...db.properties, newProperty];
  return newProperty;
};

const updateProperty = (property: ListingAndReview) => {
  db.properties = db.properties.map((b) => (b._id === property._id ? { ...b, ...property } : b));
  return property;
};

const insertReview = async (newReview: PropertyReview): Promise<ListingAndReview> => {
  const property = await mockRepository.getProperty(newReview?.listing_id);
  const reviewsList = property?.reviews || [] as PropertyReview[];
  reviewsList.push({ ...newReview, _id: getIdFromArrayLength(reviewsList), date: { $date: getDateAsString()} });
  property.reviews = reviewsList;
  return await updateProperty(property);
}

const getIdFromArrayLength = (array: any[]): string => (array.length + 1).toString();

const getDateAsString = (): string => (new Date()).toISOString();


