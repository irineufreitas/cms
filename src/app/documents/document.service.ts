import { Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
  export class DocumentService {
    //documentSelectedEvent = new EventEmitter<Document>();
    private documents: Document[] = [];
    documentListChanged = new Subject<Document[]>();
    private maxDocumentId: number;
  
    constructor() {
      this.documents = MOCKDOCUMENTS; // Assign mock data
      this.maxDocumentId = this.getMaxId();
    }
  
    getDocuments(): Document[] {
      return this.documents.slice(); // Return a copy of documents
    }
  
    getDocument(id: string): Document | null {
      return this.documents.find(document => document.id === id) || null;
    }
    // Get Max ID for new documents
    private getMaxId(): number {
      let maxId = 0;
      this.documents.forEach(doc => {
        const currentId = parseInt(doc.id);
        if (currentId > maxId) {
          maxId = currentId;
        }
      });
      return maxId;
    }

    // **ADD DOCUMENT**
    addDocument(newDocument: Document) {
      if (!newDocument) return;
      this.maxDocumentId++;
      newDocument.id = this.maxDocumentId.toString();
      this.documents.push(newDocument);
      this.documentListChanged.next(this.documents.slice()); // Emit updated list
    }

    // **UPDATE DOCUMENT**
    updateDocument(originalDocument: Document, newDocument: Document) {
      if (!originalDocument || !newDocument) return;
      const pos = this.documents.findIndex(d => d.id === originalDocument.id);
      if (pos < 0) return;
      newDocument.id = originalDocument.id;
      this.documents[pos] = newDocument;
      this.documentListChanged.next(this.documents.slice()); // Emit updated list
    }

    // **DELETE DOCUMENT**
    deleteDocument(document: Document) {
      if (!document) return;
      const index = this.documents.indexOf(document);
      if (index < 0) return;
      this.documents.splice(index, 1);
    }
}
