import { Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  imports: [NgFor, CommonModule, RouterModule],
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = []; // empty array
  private subscription!: Subscription;

  constructor(private documentService: DocumentService) {} // Inject DocumentService

  ngOnInit() {
    this.documents = this.documentService.getDocuments(); // Fetch documents
    this.subscription = this.documentService.documentListChanged.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Prevent memory leaks
  
    }
  // onSelected(document: Document) {
  //   this.documentService.documentSelectedEvent.emit(document); // Emit selected document
  // }
}