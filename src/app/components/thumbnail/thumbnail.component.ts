import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Media } from 'src/app/models/media.model';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
})
export class ThumbnailComponent {
  @Input() media!: Media;
  @Output() bookmarkToggled = new EventEmitter<string>();

  onToggleBookmark(): void {
    this.bookmarkToggled.emit(this.media.title);
  }
}
