import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Media } from '../models/media.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private moviesDataSubject: BehaviorSubject<Media[]> = new BehaviorSubject<
    Media[]
  >([]);
  public moviesData$: Observable<Media[]> =
    this.moviesDataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadMovies();
  }

  private loadMovies(): void {
    this.http.get<Media[]>('assets/movies.json').subscribe({
      next: (data) => {
        const initializedData = data.map((item) => ({
          ...item,
          imageUrl:
            item.isTrending && item.thumbnail?.trending?.large
              ? item.thumbnail.trending.large
              : item.thumbnail.regular.large,
        }));
        this.moviesDataSubject.next(initializedData);
      },
      error: (error) => console.error('Error loading movies:', error),
    });
  }

  getTrendingShows(): Observable<Media[]> {
    return this.moviesData$.pipe(
      map((movies) => movies.filter((movie) => movie.isTrending))
    );
  }

  getRecommendedShows(): Observable<Media[]> {
    return this.moviesData$.pipe(
      map((movies) => movies.filter((movie) => !movie.isTrending))
    );
  }

  getMovies(): Observable<Media[]> {
    return this.moviesData$.pipe(
      map((movies) => movies.filter((movie) => movie.category === 'Movie'))
    );
  }

  getTvSeries(): Observable<Media[]> {
    return this.moviesData$.pipe(
      map((movies) => movies.filter((movie) => movie.category === 'TV Series'))
    );
  }

  getBookmarkedShows(): Observable<Media[]> {
    return this.moviesData$.pipe(
      map((movies) => movies.filter((movie) => movie.isBookmarked))
    );
  }

  toggleBookmark(title: string): void {
    const currentMovies = this.moviesDataSubject.getValue();
    const updatedMovies = currentMovies.map((movie) =>
      movie.title === title
        ? { ...movie, isBookmarked: !movie.isBookmarked }
        : movie
    );
    this.moviesDataSubject.next(updatedMovies);
  }

  searchShows(query: string, category?: string): Observable<Media[]> {
    if (!query) {
      return of([]);
    }
    return this.moviesData$.pipe(
      map((movies) => {
        let filteredMovies = movies;
        if (category && category !== 'all') {
          filteredMovies = movies.filter(
            (movie) => movie.category === category
          );
        }
        return filteredMovies.filter((movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        );
      })
    );
  }
}
