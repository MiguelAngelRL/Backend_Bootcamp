import { PropertyRepository } from './property.repository';
import { ListingAndReview, PropertyReview } from '../property.model';

export const dbRepository: PropertyRepository = {
  getPropertyList: async () => {
    throw new Error('Not implemented');
  },
  getProperty: async (id: string) => {
    throw new Error('Not implemented');
  },
  saveReview: async (review: PropertyReview) => {
    throw new Error('Not implemented');
  },
  saveProperty: async (property: ListingAndReview) => {
    throw new Error('Not implemented');
  },
  deleteProperty: async (id: string) => {
    throw new Error('Not implemented');
  },
};
