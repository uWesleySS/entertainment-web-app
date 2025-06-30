import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Input() placeholderText: string = 'Search for movies or TV series';
  @Output() search = new EventEmitter<string>();
  searchQuery: string = '';

  onSearchChange(): void {
    this.search.emit(this.searchQuery);
  }
}
