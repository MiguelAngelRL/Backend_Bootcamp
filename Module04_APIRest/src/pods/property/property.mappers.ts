import * as model from 'dals';
import { PropertyReview } from 'dals';
import * as apiModel from './property.api-model';

export const mapPropertyFromModelToApi = (property: model.ListingAndReview): apiModel.PropertySummary => ({
  _id: property._id,
  name: property.name,
  picture_url: property.images.picture_url
});

export const mapPropertyListFromModelToApi = (propertyList: model.ListingAndReview[]): apiModel.PropertySummary[] =>
  propertyList.map(mapPropertyFromModelToApi);

export const mapPropertyDetailsFromApiToModel = (propertyDetails: apiModel.PropertyDetails): model.ListingAndReview => ({
  _id: propertyDetails._id,
  name: propertyDetails.name,
  images: {
    picture_url: propertyDetails.picture_url,
  },
  address: {
    street: propertyDetails.address
  },
  bathrooms: {
    $numberDecimal: (propertyDetails.bathrooms).toFixed(1)
  },
  bedrooms: propertyDetails.bedrooms,
  beds: propertyDetails.beds,
  description: propertyDetails.description,
});

export const mapPropertyDetailsFromModelToApi = (propertyDetails: model.ListingAndReview): apiModel.PropertyDetails => ({
  _id: propertyDetails._id,
  name: propertyDetails.name,
  picture_url: propertyDetails.images.picture_url,
  description: propertyDetails.description,
  address: propertyDetails.address.street,
  bedrooms: propertyDetails.bedrooms,
  beds: propertyDetails.beds,
  bathrooms: parseFloat(propertyDetails.bathrooms.$numberDecimal),
  reviews: mapPropertyReviewListFromModelToApi(propertyDetails.reviews)
});

const mapPropertyReviewListFromModelToApi = (propertyReviewList: model.PropertyReview[]): apiModel.PropertyReview[] => {
  const sortedArray = propertyReviewList.sort(sortReviewsByDate);
  const slicedArray = sortedArray.slice(0, 5);
  return slicedArray.map(mapPropertyReviewFromModelToApi);
}

const mapPropertyReviewFromModelToApi = (propertyReview: model.PropertyReview): apiModel.PropertyReview => ({
  _id: propertyReview._id,
  property_id: propertyReview.listing_id,
  review_date: propertyReview.date.$date,
  reviewer_id: propertyReview.reviewer_id,
  reviewer_name: propertyReview.reviewer_name,
  review_comment: propertyReview.comments,
});

export const mapPropertyReviewFromApiToModel = (propertyReview: apiModel.PropertyReview): model.PropertyReview => ({
  _id: undefined,
  listing_id: propertyReview.property_id,
  date: undefined,
  reviewer_id: propertyReview.reviewer_id,
  reviewer_name: propertyReview.reviewer_name,
  comments: propertyReview.review_comment
});

const sortReviewsByDate = (a: PropertyReview, b: PropertyReview) => {
  const dateA = (new Date(a.date.$date)).getTime();
  const dateB = (new Date(b.date.$date)).getTime();
  return (dateB - dateA);
}