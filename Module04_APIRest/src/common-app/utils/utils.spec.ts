import { sortReviewsByRecentDate } from "./utils";

describe("Utils tests", () => {
  it("should return positive number when reviewA is older than reviewB", () => {
    //Assert
    const reviewA = {
      _id: '1',
      listing_id: '6613d28e3babee59afcd61fc',
      date: '2024-04-08T11:21:03.331Z',
      reviewer_id: '1',
      reviewer_name: 'Myname1',
      comments: 'New comment to this property by 1'
    };
    const reviewB = {
      _id: '2',
      listing_id: '6613d28e3babee59afcd61fc',
      date: '2024-04-08T11:34:31.879Z',
      reviewer_id: '2',
      reviewer_name: 'Myname2',
      comments: 'More recent comment to this property by 2'
    };
    //Act
    const result = sortReviewsByRecentDate(reviewA, reviewB);
    //Assert
    expect(result).toBeGreaterThan(0);
  });

  it("should return negative number when reviewA is more recent than reviewB", () => {
    //Assert
    const reviewA = {
      _id: '2',
      listing_id: '6613d28e3babee59afcd61fc',
      date: '2024-04-08T11:34:31.879Z',
      reviewer_id: '2',
      reviewer_name: 'Myname2',
      comments: 'More recent comment to this property by 2'
    };
    const reviewB = {
      _id: '1',
      listing_id: '6613d28e3babee59afcd61fc',
      date: '2024-04-08T11:21:03.331Z',
      reviewer_id: '1',
      reviewer_name: 'Myname1',
      comments: 'New comment to this property by 1'
    };
    //Act
    const result = sortReviewsByRecentDate(reviewA, reviewB);
    //Assert
    expect(result).toBeLessThan(0);
  });

  it("should return 0 number when both reviews have same date", () => {
    //Assert
    const reviewA = {
      _id: '1',
      listing_id: '6613d28e3babee59afcd61fc',
      date: '2024-04-08T11:21:03.331Z',
      reviewer_id: '1',
      reviewer_name: 'Myname1',
      comments: 'New comment to this property by 1'
    };
    const reviewB = {
      _id: '2',
      listing_id: '6613d28e3babee59afcd61fc',
      date: '2024-04-08T11:21:03.331Z',
      reviewer_id: '2',
      reviewer_name: 'Myname2',
      comments: 'New comment to this property by 2'
    };
    //Act
    const result = sortReviewsByRecentDate(reviewA, reviewB);
    //Assert
    expect(result).toEqual(0);
  });
});