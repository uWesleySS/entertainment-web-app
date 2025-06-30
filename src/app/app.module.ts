import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TrendingComponent } from './components/trending/trending.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { TvSeriesComponent } from './pages/tv-series/tv-series.component';
import { BookmarkedComponent } from './pages/bookmarked/bookmarked.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, TrendingComponent, SearchBarComponent, ThumbnailComponent, HomeComponent, MoviesComponent, TvSeriesComponent, BookmarkedComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
