import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Media } from 'src/app/models/media.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies$!: Observable<Media[]>;
  searchResults$!: Observable<Media[]>;
  searchQuery: string = '';
  showSearchResults: boolean = false;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movies$ = this.movieService.getMovies();
    this.searchResults$ = of([]);
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    if (query.length > 0) {
      this.showSearchResults = true;
      this.searchResults$ = this.movieService.searchShows(query, 'Movie');
    } else {
      this.showSearchResults = false;
      this.searchResults$ = of([]);
    }
  }

  onToggleBookmark(title: string): void {
    this.movieService.toggleBookmark(title);
  }
}
