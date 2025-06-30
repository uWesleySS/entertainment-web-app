import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Media } from 'src/app/models/media.model';
import { Observable, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bookmarked',
  templateUrl: './bookmarked.component.html',
  styleUrls: ['./bookmarked.component.scss'],
})
export class BookmarkedComponent implements OnInit {
  bookmarkedShows$!: Observable<Media[]>;
  searchResults$!: Observable<Media[]>;
  searchQuery: string = '';
  showSearchResults: boolean = false;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.bookmarkedShows$ = this.movieService.getBookmarkedShows();
    this.searchResults$ = of([]);
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    if (query.length > 0) {
      this.showSearchResults = true;

      this.searchResults$ = this.bookmarkedShows$.pipe(
        map((shows) =>
          shows.filter((show) =>
            show.title.toLowerCase().includes(query.toLowerCase())
          )
        )
      );
    } else {
      this.showSearchResults = false;
      this.searchResults$ = of([]);
    }
  }

  onToggleBookmark(title: string): void {
    this.movieService.toggleBookmark(title);
  }
}
