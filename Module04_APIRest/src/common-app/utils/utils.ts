import { PropertyReview } from '../../dals'

export const sortReviewsByRecentDate = (a: PropertyReview, b: PropertyReview) => {
  const dateA = (new Date(a.date)).getTime();
  const dateB = (new Date(b.date)).getTime();
  return sortByRecentDate(dateA, dateB);
}

const sortByRecentDate = (dateA: number, dateB: number) => {
  return (dateB - dateA);
}