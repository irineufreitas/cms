import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = [];
  documentListChanged = new Subject<Document[]>();

  constructor(private http: HttpClient) {}

  getDocuments() {
    this.http
      .get<{ message: string; documents: Document[] }>('http://localhost:3000/documents')
      .subscribe((response) => {
        this.documents = response.documents;
        this.sortAndSend();
      });
  }

  getDocument(id: string): Document | null {
    return this.documents.find(document => document.id === id) || null;
  }

  addDocument(document: Document) {
    if (!document) return;

    document.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; document: Document }>(
        'http://localhost:3000/documents',
        document,
        { headers }
      )
      .subscribe((responseData) => {
        this.documents.push(responseData.document);
        this.sortAndSend();
      });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) return;

    const pos = this.documents.findIndex((d) => d.id === originalDocument.id);
    if (pos < 0) return;

    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put('http://localhost:3000/documents/' + originalDocument.id, newDocument, {
        headers
      })
      .subscribe(() => {
        this.documents[pos] = newDocument;
        this.sortAndSend();
      });
  }

  deleteDocument(document: Document) {
    if (!document) return;

    const pos = this.documents.findIndex((d) => d.id === document.id);
    if (pos < 0) return;

    this.http.delete('http://localhost:3000/documents/' + document.id).subscribe(() => {
      this.documents.splice(pos, 1);
      this.sortAndSend();
    });
  }

  private sortAndSend() {
    this.documents.sort((a, b) => a.name.localeCompare(b.name));
    this.documentListChanged.next(this.documents.slice());
  }
}