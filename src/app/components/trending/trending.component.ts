import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { MovieService } from 'src/app/services/movie.service'; // Importe o MovieService
import { Media } from 'src/app/models/media.model'; // Importe a interface Media
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
})
export class TrendingComponent implements OnInit, AfterViewInit, OnDestroy {
  trendingShows: Media[] = []; // Use a interface Media
  loadingShows: boolean = true;
  errorLoadingShows: string | null = null;

  @ViewChild('carouselContainer')
  carouselContainer!: ElementRef<HTMLDivElement>;

  private destroy$ = new Subject<void>();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getTrendingShows().subscribe({
      next: (shows) => {
        this.trendingShows = shows;
        this.loadingShows = false;
      },
      error: (err) => {
        console.error('Erro ao carregar shows em destaque:', err);
        this.errorLoadingShows =
          'Não foi possível carregar o conteúdo em destaque. Tente novamente mais tarde.';
        this.loadingShows = false;
      },
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.carouselContainer) {
        this.setupCarouselScroll();
      } else {
        console.warn(
          'Elemento carouselContainer não encontrado em AfterViewInit.'
        );
      }
    }, 0);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onToggleBookmark(title: string): void {
    this.movieService.toggleBookmark(title);
  }

  setupCarouselScroll(): void {
    const carousel = this.carouselContainer.nativeElement;
    if (carousel) {
      fromEvent<WheelEvent>(carousel, 'wheel')
        .pipe(takeUntil(this.destroy$))
        .subscribe((event) => {
          event.preventDefault();
          carousel.scrollLeft += event.deltaY;
        });
    } else {
      console.error(
        'Erro: carouselContainer.nativeElement é nulo ao tentar configurar o scroll.'
      );
    }
  }
}
