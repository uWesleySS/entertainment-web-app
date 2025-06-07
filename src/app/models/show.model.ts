export interface ThumbnailImage {
  small: string;
  medium?: string;
  large: string;
}

export interface Thumbnail {
  trending?: ThumbnailImage;
  regular: ThumbnailImage;
}

export interface Show {
  title: string;
  thumbnail: Thumbnail;
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;

  imageUrl?: string;
}
