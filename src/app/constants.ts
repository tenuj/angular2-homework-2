/**
 * This code has been written by Denis Shavenzov
 * If you have any questions or notices you can contact me by email shavenzov@gmail.com
 */

import {Observable} from "rxjs";

export const FreeSoundSortTypes : string[] = [
  'score',
  'duration_desc',
  'duration_asc',
  'created_desc',
  'created_asc',
  'downloads_desc',
  'downloads_asc',
  'rating_desc',
  'rating_asc'
];

export const sortFields : SortButtonParam[] = [
  {
    label : 'Score', ascSort : 'score'
  },
  {
    label : 'Duration', ascSort : 'duration_asc', descSort : 'duration_desc'
  },
  {
    label : 'Created', ascSort : 'created_asc', descSort : 'created_desc'
  },
  {
    label : 'Downloads', ascSort : 'downloads_asc', descSort : 'downloads_desc'
  },
  {
    label : 'Rating', ascSort : 'rating_asc', descSort : 'rating_desc'
  }
];

export type FreeSoundResolverResult = {
  data : Observable<SearchResult>
}

export type FreeSoundResolverData = {
  loadingInfo : FreeSoundResolverResult;
}
