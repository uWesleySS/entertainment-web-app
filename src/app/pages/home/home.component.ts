import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Media } from 'src/app/models/media.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  trendingShows$!: Observable<Media[]>;
  recommendedShows$!: Observable<Media[]>;
  searchResults$!: Observable<Media[]>;
  searchQuery: string = '';
  showSearchResults: boolean = false;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.trendingShows$ = this.movieService.getTrendingShows(); 
    this.recommendedShows$ = this.movieService.getRecommendedShows(); 
    this.searchResults$ = of([]);
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    if (query.length > 0) {
      this.showSearchResults = true;
      this.searchResults$ = this.movieService.searchShows(query);
    } else {
      this.showSearchResults = false;
      this.searchResults$ = of([]);
    }
  }

  onToggleBookmark(title: string): void {
    this.movieService.toggleBookmark(title);
  }
}
