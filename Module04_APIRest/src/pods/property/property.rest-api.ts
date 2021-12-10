import { Router } from 'express';
import { propertyRepository } from 'dals';
import {
  mapPropertyListFromModelToApi,
  mapPropertyDetailsFromApiToModel,
  mapPropertyDetailsFromModelToApi,
  mapPropertyReviewFromApiToModel
} from './property.mappers';
import { getDBInstance } from 'core/servers';

export const propertyApi = Router();

propertyApi
  .get('/', async (req, res, next) => { // Getting properties list
    try {
      const uppercasedCountry: string = req.query.country?.toString().toUpperCase();
      const propertyList = await propertyRepository.getPropertyList(uppercasedCountry);
      // console.log("Total properties:: " + propertyList.length)
      res.send(mapPropertyListFromModelToApi(propertyList));
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => { // Getting a property details
    try {
      const { id } = req.params;
      const property = await propertyRepository.getProperty(id);
      res.send(mapPropertyDetailsFromModelToApi(property));
    } catch (error) {
      next(error);
    }
  })
  .put('/', async (req, res, next) => { // Adding new property
    try {
      const modelProperty = mapPropertyDetailsFromApiToModel(req.body);
      const newProperty = await propertyRepository.saveProperty(modelProperty);
      res.status(201).send(mapPropertyDetailsFromModelToApi(newProperty));
    } catch (error) {
      next(error);
    }
  })
  .patch('/', async (req, res, next) => {
    try {
      const modelReview = mapPropertyReviewFromApiToModel(req.body);
      const newProperty = await propertyRepository.saveReview(modelReview);
      res.status(201).send(mapPropertyDetailsFromModelToApi(newProperty));          
    } catch (error) {
      next(error);
    }
  });