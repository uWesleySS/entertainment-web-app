import { Component, OnInit } from '@angular/core';
import { ShowService } from 'src/app/services/show.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
})
export class TrendingComponent implements OnInit {
  shows: any[] = [];

  constructor(private showService: ShowService) {}

  ngOnInit(): void {
    this.showService.getShows().subscribe((data) => {
      this.shows = data;
    });
  }

  getImage(
    show: any,
    type: 'trending' | 'regular',
    size: 'small' | 'medium' | 'large'
  ): string {
    if (
      !show ||
      !show.thumbnail ||
      !show.thumbnail[type] ||
      !show.thumbnail[type][size]
    ) {
      console.warn(
        `Imagem não encontrada para ${show?.title}: Tipo - ${type}, Tamanho - ${size}`
      );
      return 'assets/default-image.jpg'; // 🔹 Fallback para imagem padrão
    }

    return show.thumbnail[type][size];
  }
}
