import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface DriveImage {
  id: string;
  name: string;
  url: string;
  mimeType: string;
  thumbnailUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DriveApiService {
  private backendUrl = environment;

  constructor(private http: HttpClient) {}

  getImageUrl(fileId: string): string {
    return `<span class="math-inline">\{this\.backendUrl\}/images/</span>{fileId}`;
  }

  getImagesFromFolder(folderId: string): Observable<DriveImage[]> {
    return this.http.get<DriveImage[]>(
      `<span class="math-inline">\{this\.backendUrl\}/folder\-images/</span>{folderId}`
    );
  }

  findImageByName(name: string): Observable<DriveImage> {
    return this.http.get<DriveImage>(
      `<span class="math-inline">\{this\.backendUrl\}/find\-image\-by\-name?name\=</span>{name}`
    );
  }
}
