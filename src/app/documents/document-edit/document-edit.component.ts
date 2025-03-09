import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-document-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument?: Document;
  document: Document = { id: '', name: '', description: '', url: '' }; //Ensure default values
  editMode: boolean = false;
  id!: string;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      if (!this.id) {
        this.editMode = false;
        return;
      }

      const doc = this.documentService.getDocument(this.id);
      if (!doc) return;

      this.originalDocument = doc;
      this.editMode = true;
      this.document = { ...this.originalDocument }; //Clone the document safely
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return; //Prevent invalid form submission

    const value = form.value;
    const newDocument = new Document(
      this.editMode ? this.id : '',
      value.name,
      value.description,
      value.url
    );

    if (this.editMode && this.originalDocument) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }
}