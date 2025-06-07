import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DriveApiService } from 'src/app/services/drive-api.service';
import { Show } from '../../models/show.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
})
export class TrendingComponent implements OnInit {
  trendingShows: Show[] = [];
  loadingShows: boolean = true;
  errorLoadingShows: string | null = null;

  constructor(private http: HttpClient, private driveApi: DriveApiService) {}

  ngOnInit(): void {
    this.loadTrendingShows();
  }

  loadTrendingShows(): void {
    this.loadingShows = true;
    this.errorLoadingShows = null;

    this.http.get<Show[]>('assets/data.json').subscribe({
      next: (allShows: Show[]) => {
        const trendingOnly = allShows.filter(
          (show) =>
            show.isTrending &&
            show.driveThumbnails &&
            show.driveThumbnails.trending &&
            show.driveThumbnails.trending.large
        );

        this.trendingShows = trendingOnly.map((show) => {
          const driveImageId = show.driveThumbnails?.trending?.large;

          return {
            ...show,
            imageUrl: driveImageId
              ? this.driveApi.getImageUrl(driveImageId)
              : 'assets/placeholder.jpg',
          } as Show;
        });

        this.loadingShows = false;
        console.log(
          'Shows em destaque carregados e imagens do Drive (tamanho grande de trending) integradas:',
          this.trendingShows
        );
      },
      error: (err) => {
        console.error(
          'Erro ao carregar shows ou integrar imagens do Drive:',
          err
        );
        this.errorLoadingShows =
          'Não foi possível carregar o conteúdo em destaque. Tente novamente mais tarde.';
        this.loadingShows = false;
      },
    });
  }

  retryLoadShows(): void {
    this.loadTrendingShows();
  }
}
