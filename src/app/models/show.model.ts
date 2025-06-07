<<<<<<< HEAD
export interface ThumbnailImage {
  small: string;
  medium?: string;
  large: string;
}

export interface Thumbnail {
  trending?: ThumbnailImage;
  regular: ThumbnailImage;
=======
export interface DriveImageIds {
  small?: string;
  medium?: string;
  large?: string;
}

export interface DriveThumbnails {
  trending?: DriveImageIds;
  regular?: DriveImageIds;
>>>>>>> 7b50bd95ecdd6c1c0c5f8566e91b2083a9a21fde
}

export interface Show {
  title: string;
<<<<<<< HEAD
  thumbnail: Thumbnail;
=======
>>>>>>> 7b50bd95ecdd6c1c0c5f8566e91b2083a9a21fde
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
<<<<<<< HEAD

=======
  driveThumbnails?: DriveThumbnails;
>>>>>>> 7b50bd95ecdd6c1c0c5f8566e91b2083a9a21fde
  imageUrl?: string;
}
