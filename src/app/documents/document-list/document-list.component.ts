import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentItemComponent } from '../document-item/document-item.component';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  imports: [CommonModule, NgFor, DocumentItemComponent],
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'Project Plan', 'Detailed project plan for CMS', 'assets/documents/project-plan.pdf', null),
    new Document('2', 'User Guide', 'User guide for the CMS application', 'assets/documents/user-guide.pdf', null)
  ];

  onSelected(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
