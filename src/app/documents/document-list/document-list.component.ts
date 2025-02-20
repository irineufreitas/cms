import { Component, OnInit} from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = []; // empty array

  constructor(private documentService: DocumentService) {} // Inject DocumentService

  ngOnInit() {
    this.documents = this.documentService.getDocuments(); // Fetch documents
  
  }
  onSelected(document: Document) {
    this.documentService.documentSelectedEvent.emit(document); // Emit selected document
  }
}