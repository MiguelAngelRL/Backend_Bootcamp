import * as propertyMappers from './property.mappers';
import * as api from "./property.api-model";
import * as model from '../../dals/property/property.model';
import { Decimal128 } from 'mongodb';

describe("From Model to Api tests", () =>{
    it("mapPropertyFromModelToApi should return null when receive a null value", ()=>{
        //Arrange
        const objectReceivedFromModel: model.ListingAndReview = null;
        const expectedResult: api.PropertySummary = null;
        // //Act
        const result = propertyMappers.mapPropertyFromModelToApi(objectReceivedFromModel);
        //Assert
        expect(result).toEqual(expectedResult);
    });
    
    it("mapPropertyFromModelToApi should return an api PropertySummary object when receive a model ListingAndReview object", ()=>{
      //Arrange
      const objectReceivedFromModel: model.ListingAndReview = {
        _id: '6613d28e3babee59afcd61fc',
        name:'Flat with small garden in Rio de Janeiro',
        images: { 
          picture_url: 'https://a0.muscache.com/im/pictures/5b408b9e-45da-4808-be65-4edc1f29c453.jpg?aki_policy=large'
        },
        description: 'One bedroom + sofa-bed in quiet and bucolic neighbourhood right next to the Botanical Garden.',
        address: {
          street: 'New street, Rio de Janeiro, Brazil',
          suburb: '',
          government_area: 'Rio de Janeiro',
          market: '',
          country: 'Brazil',
          country_code: 'BR',
          location: {
            type: 'Point',
            coordinates: [29.03079,40.98563],
            is_location_exact: false
          }
        },
        bedrooms: 1,
        beds: 2,
        bathrooms: new Decimal128('1'),
        reviews: [
          {
            _id: '6613d31f3babee59afcd61fe',
            listing_id: '6613d28e3babee59afcd61fc',
            date: '2024-04-08T11:21:03.331Z',
            reviewer_id: '8888',
            reviewer_name: 'Myname8888',
            comments: 'New comment to this property by 8888'
          },
          {
            _id: '6613d64725da69aec6ab0cb4',
            listing_id: '6613d28e3babee59afcd61fc',
            date: '2024-04-08T11:34:31.879Z',
            reviewer_id: '11',
            reviewer_name: 'Myname11',
            comments: 'Adding new comment to this property by 11'
          }
        ]
      };

      const expectedResult: api.PropertySummary = {
        id: "6613d28e3babee59afcd61fc",
        name: "Flat with small garden in Rio de Janeiro",
        picture_url: "https://a0.muscache.com/im/pictures/5b408b9e-45da-4808-be65-4edc1f29c453.jpg?aki_policy=large"
      };
      // //Act
      const result = propertyMappers.mapPropertyFromModelToApi(objectReceivedFromModel);
      //Assert
      expect(result).toEqual(expectedResult);
  });
  
  it("mapPropertyListFromModelToApi should return empty array when receive a null value", ()=>{
    //Arrange
    const objectReceivedFromModel: model.ListingAndReview[] = null;
    const expectedResult: api.PropertySummary[] = [];
    // //Act
    const result = propertyMappers.mapPropertyListFromModelToApi(objectReceivedFromModel);
    //Assert
    expect(result).toEqual(expectedResult);
  });

  it("mapPropertyListFromModelToApi should return array with length 2 when receive a 2 elements list", ()=>{
    //Arrange
    const objectReceivedFromModel: model.ListingAndReview[] = [
      {
        _id: '1',
        name:'Flat 1',
        images: { 
          picture_url: 'picture1'
        },
      },
      {
        _id: '2',
        name:'Flat 2',
        images: { 
          picture_url: 'picture2'
        },
      }
    ] as model.ListingAndReview[];
    const expectedResult = 2;
    // //Act
    const result = propertyMappers.mapPropertyListFromModelToApi(objectReceivedFromModel);
    //Assert
    expect(result).toHaveLength(expectedResult);
  });
  
  it("mapPropertyDetailsFromModelToApi should return null when receive a null value", ()=>{
    //Arrange
    const objectReceivedFromModel: model.ListingAndReview = null;
    const expectedResult: api.PropertyDetails = null;
    // //Act
    const result = propertyMappers.mapPropertyDetailsFromModelToApi(objectReceivedFromModel);
    //Assert
    expect(result).toEqual(expectedResult);
  });

  it("mapPropertyDetailsFromModelToApi should return an api PropertyDetails object when receive a model ListingAndReview object", ()=>{
    //Arrange
    const objectReceivedFromModel: model.ListingAndReview = {
      _id: '6613d28e3babee59afcd61fc',
      name:'Flat with small garden in Rio de Janeiro',
      images: { 
        picture_url: 'https://a0.muscache.com/im/pictures/5b408b9e-45da-4808-be65-4edc1f29c453.jpg?aki_policy=large'
      },
      description: 'One bedroom + sofa-bed in quiet and bucolic neighbourhood right next to the Botanical Garden.',
      address: {
        street: 'New street, Rio de Janeiro, Brazil',
        suburb: '',
        government_area: 'Rio de Janeiro',
        market: '',
        country: 'Brazil',
        country_code: 'BR',
        location: {
          type: 'Point',
          coordinates: [29.03079,40.98563],
          is_location_exact: false
        }
      },
      bedrooms: 1,
      beds: 2,
      bathrooms: new Decimal128('3.0'),
      reviews: [
        {
          _id: '6613d31f3babee59afcd61fe',
          listing_id: '6613d28e3babee59afcd61fc',
          date: '2024-04-08T11:21:03.331Z',
          reviewer_id: '8888',
          reviewer_name: 'Myname8888',
          comments: 'New comment to this property by 8888'
        },
        {
          _id: '6613d64725da69aec6ab0cb4',
          listing_id: '6613d28e3babee59afcd61fc',
          date: '2024-04-08T11:34:31.879Z',
          reviewer_id: '11',
          reviewer_name: 'Myname11',
          comments: 'Adding new comment to this property by 11'
        }
      ]
    };
    const expectedResult: api.PropertyDetails = {
      id: "6613d28e3babee59afcd61fc",
      name: "Flat with small garden in Rio de Janeiro",
      picture_url: "https://a0.muscache.com/im/pictures/5b408b9e-45da-4808-be65-4edc1f29c453.jpg?aki_policy=large",
      description: "One bedroom + sofa-bed in quiet and bucolic neighbourhood right next to the Botanical Garden.",
      address: "New street, Rio de Janeiro, Brazil",
      bedrooms: 1,
      beds: 2,
      bathrooms: 3,
      reviews: [
        {
            review_date: "2024-04-08T11:34:31.879Z",
            reviewer_name: "Myname11",
            review_comment: "Adding new comment to this property by 11"
        },
        {
            review_date: "2024-04-08T11:21:03.331Z",
            reviewer_name: "Myname8888",
            review_comment: "New comment to this property by 8888"
        }
      ]
  };
    // //Act
    const result = propertyMappers.mapPropertyDetailsFromModelToApi(objectReceivedFromModel);
    //Assert
    expect(result).toEqual(expectedResult);
  });

  it("mapPropertyReviewFromModelToApi should return null when receive a null value", ()=>{
    //Arrange
    const objectReceivedFromModel: model.PropertyReview = null;
    const expectedResult: api.PropertyReview = null;
    // //Act
    const result = propertyMappers.mapPropertyReviewFromModelToApi(objectReceivedFromModel);
    //Assert
    expect(result).toEqual(expectedResult);
  });

  it("mapPropertyReviewFromModelToApi should return an api PropertyReview when receive a model PropertyReview", ()=>{
    //Arrange
    const objectReceivedFromModel: model.PropertyReview = {
      _id: '6613d31f3babee59afcd61fe',
      listing_id: '6613d28e3babee59afcd61fc',
      date: '2024-04-08T11:21:03.331Z',
      reviewer_id: '8888',
      reviewer_name: 'Myname8888',
      comments: 'New comment to this property by 8888'
    };
    const expectedResult: api.PropertyReview = {
      review_date: "2024-04-08T11:21:03.331Z",
      reviewer_name: "Myname8888",
      review_comment: "New comment to this property by 8888"
    };
    // //Act
    const result = propertyMappers.mapPropertyReviewFromModelToApi(objectReceivedFromModel);
    //Assert
    expect(result).toEqual(expectedResult);
  });

  it("mapPropertyReviewListFromModelToApi should return empty array when receive a null value", ()=>{
    //Arrange
    const objectReceivedFromModel: model.PropertyReview[] = [];
    const expectedResult: api.PropertyReview[] = [];
    // //Act
    const result = propertyMappers.mapPropertyReviewListFromModelToApi(objectReceivedFromModel);
    //Assert
    expect(result).toEqual(expectedResult);
  });

  it("mapPropertyReviewListFromModelToApi should return an api PropertyReview array with lenght 5 when receive a model PropertyReview with length greater than 5", ()=>{
    //Arrange
    const objectReceivedFromModel: model.PropertyReview[] = [
      {
        _id: '1',
        listing_id: '6613d28e3babee59afcd61fc',
        date: '2024-04-08T11:21:03.331Z',
        reviewer_id: '1',
        reviewer_name: 'Myname1',
        comments: 'New comment to this property by 1'
      },
      {
        _id: '2',
        listing_id: '6613d28e3babee59afcd61fc',
        date: '2024-04-08T11:21:03.331Z',
        reviewer_id: '2',
        reviewer_name: 'Myname2',
        comments: 'New comment to this property by 2'
      },
      {
        _id: '3',
        listing_id: '6613d28e3babee59afcd61fc',
        date: '2024-04-08T11:21:03.331Z',
        reviewer_id: '3',
        reviewer_name: 'Myname3',
        comments: 'New comment to this property by 3'
      },
      {
        _id: '4',
        listing_id: '6613d28e3babee59afcd61fc',
        date: '2024-04-08T11:21:03.331Z',
        reviewer_id: '4',
        reviewer_name: 'Myname4',
        comments: 'New comment to this property by 4'
      },
      {
        _id: '5',
        listing_id: '6613d28e3babee59afcd61fc',
        date: '2024-04-08T11:21:03.331Z',
        reviewer_id: '5',
        reviewer_name: 'Myname5',
        comments: 'New comment to this property by 5'
      },
      {
        _id: '6',
        listing_id: '6613d28e3babee59afcd61fc',
        date: '2024-04-08T11:34:31.879Z',
        reviewer_id: '6',
        reviewer_name: 'Myname6',
        comments: 'More recent comment to this property by 6'
      },
      {
        _id: '7',
        listing_id: '6613d28e3babee59afcd61fc',
        date: '2024-04-08T11:21:03.331Z',
        reviewer_id: '7',
        reviewer_name: 'Myname7',
        comments: 'New comment to this property by 7'
      }
    ];
    const expectedResult = 5;
    // //Act
    const result = propertyMappers.mapPropertyReviewListFromModelToApi(objectReceivedFromModel);
    //Assert
    expect(result).toHaveLength(expectedResult);
  });

  it("mapPropertyReviewListFromModelToApi should return the most recent review in first place", ()=>{
    //Arrange
    const objectReceivedFromModel: model.PropertyReview[] = [
      {
        _id: '1',
        listing_id: '6613d28e3babee59afcd61fc',
        date: '2024-04-08T11:21:03.331Z',
        reviewer_id: '1',
        reviewer_name: 'Myname1',
        comments: 'New comment to this property by 1'
      },
      {
        _id: '2',
        listing_id: '6613d28e3babee59afcd61fc',
        date: '2024-04-08T11:21:03.331Z',
        reviewer_id: '2',
        reviewer_name: 'Myname2',
        comments: 'New comment to this property by 2'
      },
      {
        _id: '3',
        listing_id: '6613d28e3babee59afcd61fc',
        date: '2024-04-08T11:21:03.331Z',
        reviewer_id: '3',
        reviewer_name: 'Myname3',
        comments: 'New comment to this property by 3'
      },
      {
        _id: '4',
        listing_id: '6613d28e3babee59afcd61fc',
        date: '2024-04-08T11:21:03.331Z',
        reviewer_id: '4',
        reviewer_name: 'Myname4',
        comments: 'New comment to this property by 4'
      },
      {
        _id: '5',
        listing_id: '6613d28e3babee59afcd61fc',
        date: '2024-04-08T11:21:03.331Z',
        reviewer_id: '5',
        reviewer_name: 'Myname5',
        comments: 'New comment to this property by 5'
      },
      {
        _id: '6',
        listing_id: '6613d28e3babee59afcd61fc',
        date: '2024-04-08T11:34:31.879Z',
        reviewer_id: '6',
        reviewer_name: 'Myname6',
        comments: 'More recent comment to this property by 6'
      },
      {
        _id: '7',
        listing_id: '6613d28e3babee59afcd61fc',
        date: '2024-04-08T11:21:03.331Z',
        reviewer_id: '7',
        reviewer_name: 'Myname7',
        comments: 'New comment to this property by 7'
      }
    ];
    const expectedResult = {
      review_date: "2024-04-08T11:34:31.879Z",
      reviewer_name: "Myname6",
      review_comment: "More recent comment to this property by 6"
    };
    // //Act
    const result = propertyMappers.mapPropertyReviewListFromModelToApi(objectReceivedFromModel);
    //Assert
    expect(result[0]).toEqual(expectedResult);
  });

});