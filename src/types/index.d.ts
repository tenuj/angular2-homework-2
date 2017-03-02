type FreeSoundAPIEnvironment = {
  key     : string;
  baseURL : string;
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

type LoadingInfo = {
  loaded : number;
  total  : number;
  result : SearchResult;
}


