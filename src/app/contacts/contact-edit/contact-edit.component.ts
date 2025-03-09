import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContactItemComponent } from '../contact-item/contact-item.component';

@Component({
  selector: 'cms-contact-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule, ContactItemComponent],
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact?: Contact;
  contact: Contact = { id: '', name: '', email: '', phone: '', imageUrl: '', group: [] }; // Default values
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id!: string;

  constructor(
    private contactService: ContactService,
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

      const existingContact = this.contactService.getContact(this.id);
      if (!existingContact) return;

      this.originalContact = existingContact;
      this.editMode = true;
      this.contact = { ...this.originalContact }; // Clone the contact safely
      this.groupContacts = this.contact.group ?? [];
      // if (this.contact.group) {
      //   this.groupContacts = [...this.contact.group]; // Clone the contact's group
      // }
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return; // Prevent invalid form submission

    const value = form.value;
    const newContact = new Contact(
      this.editMode ? this.id : '',
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts // Preserve groupContacts in new contact
    );

    if (this.editMode && this.originalContact) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  // ** Drag-and-Drop Methods**
  isInvalidContact(newContact: Contact): boolean {
    if (!newContact) return true;
    if (this.contact && newContact.id === this.contact.id) return true;
    return this.groupContacts.some(groupContact => groupContact.id === newContact.id);
  }

  // ** Drop Function**
  drop(event: CdkDragDrop<Contact[]>) {
    if (event.previousContainer === event.container) {
      // Just reorder items within the same list
      moveItemInArray(this.groupContacts, event.previousIndex, event.currentIndex);
    } else {
      const selectedContact: Contact = event.previousContainer.data[event.previousIndex];
  
      // Ensure the contact isn't already in the group
      if (!this.isInvalidContact(selectedContact) && !this.groupContacts.some(c => c.id === selectedContact.id)) {
        // Add a **cloned object** to avoid reference issues (prevents double drops)
        this.groupContacts.push({ ...selectedContact });
  
        // Remove the contact from the original list 
        event.previousContainer.data.splice(event.previousIndex, 1);
      }
    }
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) return;
    this.groupContacts.splice(index, 1);
  }
}