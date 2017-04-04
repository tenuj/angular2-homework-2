/**
 * This code has been written by Denis Shavenzov
 * If you have any questions you can contact me by email shavenzov@gmail.com
 */

type SortButtonParam = {
  label     : string;
  ascSort   : FreeSoundSort;
  descSort? : FreeSoundSort;
}

type FreeSoundSort =
  'score' |
  'duration_desc' |
  'duration_asc' |
  'created_desc' |
  'created_asc' |
  'downloads_desc' |
  'downloads_asc' |
  'rating_desc' |
  'rating_asc';

type FreeSoundSearchParams = {
  query?      : string;
  page?       : number;
  pageSize?   : number; //By default pageSize=15, and the maximum is pageSize=150.
  sort?       : FreeSoundSort;
}

type FreeSoundAPIEnvironment = {
  key                 : string;
  clientId            : string;
  baseURL             : string;
  defaultPageSize     : number,
  maximumPageSize     : number,
  defaultSort         : string,
  defaultSearchParams : FreeSoundSearchParams;
}

type PaginatorEvent = {
  first     : number; //Index of the first record
  rows      : number; //Number of rows to display in new page
  page      : number; //Index of the new page
  pageCount : number; //Total number of pages
}

type SoundPreviews = {
  "preview-lq-ogg" : string;
  "preview-lq-mp3" : string;
  "preview-hq-ogg" : string;
  "preview-hq-mp3" : string;
}

type SoundImages = {
  waveform_l : string;
  waveform_m : string;
  spectral_m : string;
  spectral_l : string;
}

type SoundInstance = {
  id              : string;
  url             : string;
  name            : string;
  tags            : string[];
  description     : string;
  geotag          : string;
  created         : string;
  license         : string;
  type            : string;
  channels        : number;
  filesize        : number;
  bitrate         : number;
  bitdepth        : number;
  duration        : number;
  samplerate      : number;
  username        : string;
  pack            : string;
  download        : string;
  bookmark        : string;
  previews        : SoundPreviews;
  images          : SoundImages;
  num_downloads   : number;
  avg_rating      : number;
  num_ratings     : number;
  rate            : string;
  comments        : string;
  num_comments    : number;
  comment         : string;
  similar_sounds  : string;
  analysis        : string;
  analysis_frames : string;
  analysis_stats  : string;
}

type SearchResult = {
  count    : number;
  next     : string;
  previous : string;
  results  : SoundInstance[];
}

type AuthToken = {
  access_token  : string;
  scope         : string;
  expires_in    : number;
  refresh_token : string;
}

type AuthParams = {
  code?  : string;
  error? : string;
  state? : string;
}

type AudioServiceEvent = {
  sound        : SoundInstance;
  relatedEvent : any;
  player       : any;
}

type AudioServiceEventType = 'progress' | 'waiting' | 'timeupdate' | 'ended' | 'error' | 'pause' | 'play' | 'soundChanged';
