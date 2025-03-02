import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';


@Injectable({
  providedIn: 'root'
})
  export class DocumentService {
    documentSelectedEvent = new EventEmitter<Document>();
    private documents: Document[] = [];
  
    constructor() {
      this.documents = MOCKDOCUMENTS; // Assign mock data
    }
  
    getDocuments(): Document[] {
      return this.documents.slice(); // Return a copy of documents
    }
  
    getDocument(id: string): Document | null {
      return this.documents.find(document => document.id === id) || null;
    }

    deleteDocument(document: Document) {
      if (!document) return;
      const index = this.documents.indexOf(document);
      if (index < 0) return;
      this.documents.splice(index, 1);
    }
}
