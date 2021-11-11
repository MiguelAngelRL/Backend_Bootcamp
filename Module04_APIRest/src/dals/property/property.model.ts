export interface ListingAndReview {
  _id: string;
  listing_url?: string;
  name: string;
  summary?: string;
  space?: string;
  description: string;
  neighborhood_overview?: string;
  notes?: string;
  transit?: string;
  access?: string;
  interaction?: string;
  house_rules?: string;
  property_type?: string;
  room_type?: string;
  bed_type?: string;
  minimum_nights?: string;
  maximum_nights?: string;
  cancellation_policy?: string;
  last_scraped?: PropertyDate;
  calendar_last_scraped?: PropertyDate;
  first_review?: PropertyDate;
  last_review?: PropertyDate;
  accommodates?: number;
  bedrooms: number;
  beds: number;
  number_of_reviews?: number;
  bathrooms: PropertyDecimalNumber;
  amenities?: string[];
  price?: PropertyDecimalNumber;
  weekly_price?: PropertyDecimalNumber;
  monthly_price?: PropertyDecimalNumber
  security_deposit?: PropertyDecimalNumber;
  cleaning_fee?: PropertyDecimalNumber;
  extra_people?: PropertyDecimalNumber;
  guests_included?: PropertyDecimalNumber;
  images: PropertyImage;
  host?: PropertyHost;
  address: PropertyAddress;
  availability?: PropertyAvailability;
  review_scores?: PropertyReviewScores;
  reviews?: PropertyReview[];
}

interface PropertyImage {
  thumbnail_url?: string;
  medium_url?: string;
  picture_url: string;
  xl_picture_url?: string;
}

interface PropertyHost {
  host_id?: string;
  host_url?: string;
  host_name?: string;
  host_location?: string;
  host_about?: string;
  host_response_time?: string;
  host_thumbnail_url?: string;
  host_picture_url?: string;
  host_neighbourhood?: string;
  host_response_rate?: number;
  host_is_superhost?: boolean;
  host_has_profile_pic?: boolean;
  host_identity_verified?: boolean;
  host_listings_count?: number;
  host_total_listings_count?: number;
  host_verifications?: string[];
}

interface PropertyAddress {
  street: string;
  suburb?: string;
  government_area?: string;
  market?: string;
  country?: string;
  country_code?: string;
  location?: PropertyLocation;
}

interface PropertyLocation {
  type: string;
  coordinates: number[];
  is_location_exact: boolean;
}

interface PropertyDate {
  $date: string;
}

interface PropertyDecimalNumber {
  $numberDecimal: string;
}

interface PropertyAvailability {
  availability_30: number;
  availability_60: number;
  availability_90: number;
  availability_365: number;
}

interface PropertyReviewScores {
  review_scores_accuracy?: number;
  review_scores_cleanliness?: number;
  review_scores_checkin?: number;
  review_scores_communication?: number;
  review_scores_location?: number;
  review_scores_value?: number;
  review_scores_rating?: number;
}

export interface PropertyReview {
  _id: string;
  date: PropertyDate;
  listing_id: string;
  reviewer_id: string;
  reviewer_name: string;
  comments: string;
}
