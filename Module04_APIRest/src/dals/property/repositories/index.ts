import { mockRepository } from './property.mock-repository';
import { dbRepository } from './property.db-repository';
import { envConstants } from 'core/constants';

export const propertyRepository = envConstants.isApiMock
  ? mockRepository
  : dbRepository;
