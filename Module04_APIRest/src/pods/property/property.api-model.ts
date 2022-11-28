export interface PropertySummary {
  id: string;
  name: string;
  picture_url: string;
}

export interface PropertyDetails extends PropertySummary {
  description: string;
  address: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  reviews: PropertyReview[];
}

export interface PropertyReview {
  id: string;
  property_id: string;
  review_date: string;
  reviewer_id: string,
  reviewer_name: string;
  review_comment: string;
}
