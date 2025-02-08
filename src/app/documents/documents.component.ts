import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { Document } from './document.model';

@Component({
  selector: 'cms-documents',
  standalone: true,
  imports: [CommonModule, DocumentListComponent, DocumentDetailComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {
  selectedDocument!: Document;

  onSelectDocument(document: Document) {
    this.selectedDocument = document;
  }
}
