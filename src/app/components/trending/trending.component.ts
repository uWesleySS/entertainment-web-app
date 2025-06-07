<<<<<<< HEAD
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Show } from '../../models/show.model';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
=======
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DriveApiService } from 'src/app/services/drive-api.service';
import { Show } from '../../models/show.model';
import { HttpClient } from '@angular/common/http';
>>>>>>> 7b50bd95ecdd6c1c0c5f8566e91b2083a9a21fde

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
})
export class TrendingComponent implements OnInit {
  trendingShows: Show[] = [];
  loadingShows: boolean = true;
  errorLoadingShows: string | null = null;
<<<<<<< HEAD
  cardHoverState: { [key: string]: boolean } = {};

  @ViewChild('carouselContainer')
  carouselContainer!: ElementRef<HTMLDivElement>;

  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient) {}
=======

  constructor(private http: HttpClient, private driveApi: DriveApiService) {}
>>>>>>> 7b50bd95ecdd6c1c0c5f8566e91b2083a9a21fde

  ngOnInit(): void {
    this.loadTrendingShows();
  }

<<<<<<< HEAD
  // 🔴 REMOVA ngAfterViewInit() daqui (ou comente), pois chamaremos setupCarouselScroll() manualmente
  // ngAfterViewInit(): void {
  //   if (this.carouselContainer) {
  //     this.setupCarouselScroll();
  //   }
  // }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

=======
>>>>>>> 7b50bd95ecdd6c1c0c5f8566e91b2083a9a21fde
  loadTrendingShows(): void {
    this.loadingShows = true;
    this.errorLoadingShows = null;

<<<<<<< HEAD
    this.http.get<Show[]>('assets/movies.json').subscribe({
      next: (allShows: Show[]) => {
        this.trendingShows = allShows
          .filter((show) => show.isTrending && show.thumbnail?.trending?.large)
          .map((show) => {
            const imageUrlToUse = show.thumbnail?.trending?.large;
            return {
              ...show,
              imageUrl: imageUrlToUse || 'assets/placeholder.jpg',
            } as Show;
          });

        // Certifique-se de que cada card Hover State usa o 'index' agora
        this.trendingShows.forEach((show, index) => {
          // Use 'index' aqui
          this.cardHoverState[index] = false; // Use o index como chave
        });

        this.loadingShows = false;

        // ✅ CHAME setupCarouselScroll() AQUI, APÓS OS DADOS SEREM CARREGADOS
        // Use setTimeout para garantir que o DOM seja atualizado após o *ngFor
        setTimeout(() => {
          if (this.carouselContainer) {
            this.setupCarouselScroll();
            console.log(
              'Scroll do carrossel configurado após o carregamento dos dados.'
            );
            // Opcional: Log as larguras para depuração
            console.log(
              'Carousel clientWidth:',
              this.carouselContainer.nativeElement.clientWidth
            );
            console.log(
              'Carousel scrollWidth:',
              this.carouselContainer.nativeElement.scrollWidth
            );
          } else {
            console.warn('Elemento carouselContainer não encontrado.');
          }
        }, 0); // setTimeout(0) permite que o Angular termine o ciclo de detecção de mudanças e renderize o DOM
      },
      error: (err) => {
        console.error('Erro ao carregar shows:', err);
=======
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
>>>>>>> 7b50bd95ecdd6c1c0c5f8566e91b2083a9a21fde
        this.errorLoadingShows =
          'Não foi possível carregar o conteúdo em destaque. Tente novamente mais tarde.';
        this.loadingShows = false;
      },
    });
  }

<<<<<<< HEAD
  // ... (restante do seu código, onMouseMove, onMouseLeave, retryLoadShows) ...

  // Confirme que onMouseMove e onMouseLeave estão usando 'index' (se você mudou para index)
  onMouseMove(event: MouseEvent, index: number): void {}
  onMouseLeave(index: number): void {}

  setupCarouselScroll(): void {
    const carousel = this.carouselContainer.nativeElement;
    if (carousel) {
      console.log(
        'Tentando anexar o listener de wheel ao carrossel:',
        carousel
      );
      fromEvent<WheelEvent>(carousel, 'wheel')
        .pipe(takeUntil(this.destroy$))
        .subscribe((event) => {
          event.preventDefault();
          carousel.scrollLeft += event.deltaY;
          // Adicione este log para ver o valor exato após a atualização
          console.log(
            'Evento de wheel detectado! DeltaY:',
            event.deltaY,
            'ScrollLeft ATUALIZADO para:',
            carousel.scrollLeft
          );

          // Opcional: Adicione um log para ver o máximo de scroll
          console.log(
            'Max ScrollLeft possível:',
            carousel.scrollWidth - carousel.clientWidth
          );
        });
    } else {
      console.error(
        'Erro: carouselContainer.nativeElement é nulo ao tentar configurar o scroll.'
      );
    }
=======
  retryLoadShows(): void {
    this.loadTrendingShows();
>>>>>>> 7b50bd95ecdd6c1c0c5f8566e91b2083a9a21fde
  }
}
