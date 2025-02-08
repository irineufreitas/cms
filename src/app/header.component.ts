import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cms-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() selectedFeatureEvent = new EventEmitter<string>();

  onSelected(feature: string) {
    this.selectedFeatureEvent.emit(feature);
  }
}
