import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ShowService } from 'src/app/services/show.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
})
export class TrendingComponent implements OnInit {
  @ViewChild('carousel') carousel!: ElementRef;
  shows: any[] = [];

  constructor(private showService: ShowService) {}

  ngOnInit(): void {
    this.showService.getShows().subscribe((data) => {
      this.shows = data.filter((x: any )=> x.isTrending);
    });
  }
  scrollLeft(): void {
    if (this.carousel.nativeElement.scrollLeft <= 0) {
      this.carousel.nativeElement.scrollLeft = 0;
    } else {
      this.carousel.nativeElement.scrollBy({
        left: -100000,
        behavior: 'smooth',
      });
    }
  }

  scrollRight(): void {
    this.carousel.nativeElement.scrollBy({ left: 500, behavior: 'smooth' });
  }

  getImage(urlImage: any): string {
    return require(urlImage);
  }
}
