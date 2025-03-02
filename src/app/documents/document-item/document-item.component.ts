// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { Document } from '../document.model';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'cms-document-item',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './document-item.component.html',
//   styleUrls: ['./document-item.component.css']
// })
// export class DocumentItemComponent {
//   @Input() document: Document |  null = null;
//   @Output() documentSelected = new EventEmitter<Document>();

//   // onClick() {
//   //   this.documentSelected.emit(this.document);
//   // }
// }


import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cms-document-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent {
  @Input() document!: Document;
  @Output() documentSelected = new EventEmitter<Document>();

  ngOnInit() {
    console.log("📄 DocumentItemComponent initialized with:", this.document);
  }

  onClick() {
    this.documentSelected.emit(this.document);
  }
}