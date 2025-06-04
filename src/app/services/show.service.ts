import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  private jsonUrl = 'assets/data.json';
  constructor(private http: HttpClient) { }

  getShows(): Observable<any>{  
    return this.http.get<any>(this.jsonUrl);
  }
}
