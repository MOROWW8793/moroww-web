export interface GuestyAddress {
  city?: string;
  country?: string;
  full?: string;
  street?: string;
}

export interface GuestyPicture {
  thumbnail?: string;
  regular?: string;
  original?: string;
}

export interface GuestyPrices {
  basePrice?: number;
  cleaningFee?: number;
  currency?: string;
}

export interface GuestyPublicDescription {
  summary?: string;
  space?: string;
  access?: string;
}

export interface GuestyListing {
  _id: string;
  id?: string;
  title: string;
  nickname?: string;
  address: GuestyAddress;
  bedrooms?: number;
  bathrooms?: number;
  accommodates?: number;
  picture?: GuestyPicture;
  pictures?: { original?: string; thumbnail?: string }[];
  prices?: GuestyPrices;
  publicDescription?: GuestyPublicDescription;
  amenities?: string[];
  active?: boolean;
  externalLinks?: { label?: string; url?: string }[];
}

export interface GuestyListResponse {
  results: GuestyListing[];
  count: number;
  limit: number;
  skip: number;
}
