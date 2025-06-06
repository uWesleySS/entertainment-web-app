export interface DriveImageIds {
  small?: string;
  medium?: string;
  large?: string;
}

export interface DriveThumbnails {
  trending?: DriveImageIds;
  regular?: DriveImageIds;
}

export interface Show {
  title: string;
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
  driveThumbnails?: DriveThumbnails;
  imageUrl?: string;
}
