import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentItemComponent } from '../document-item/document-item.component';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  imports: [CommonModule, DocumentItemComponent],
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>(); 

  documents: Document[] = [
    new Document('1', 'Lesson Plan', 'Detailed lesson plan for week 1', 'https://example.com/lesson1'),
    new Document('2', 'Project Overview', 'Summary of the new project', 'https://example.com/project'),
    new Document('3', 'Meeting Notes', 'Notes from the last team meeting', 'https://example.com/meeting'),
    new Document('4', 'Budget Report', 'Financial breakdown of Q1', 'https://example.com/budget'),
    new Document('5', 'Research Paper', 'Findings on AI advancements', 'https://example.com/research')
  ];

  onSelectedDocument(document: Document) {
    console.log('📄 Selected Document:', document); 
    this.selectedDocumentEvent.emit(document);
  }
}