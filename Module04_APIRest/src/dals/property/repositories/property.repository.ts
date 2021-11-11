import { ListingAndReview, PropertyReview } from '../property.model';

export interface PropertyRepository {
  getPropertyList: () => Promise<ListingAndReview[]>;
  getProperty: (id: string) => Promise<ListingAndReview>;
  saveReview: (review: PropertyReview) => Promise<ListingAndReview>;
  saveProperty: (property: ListingAndReview) => Promise<ListingAndReview>;
  deleteProperty: (id: string) => Promise<boolean>;
}
