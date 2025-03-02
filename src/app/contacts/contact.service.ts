import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  //contactSelectedEvent = new EventEmitter<Contact>();
  private contacts: Contact[] = [];
  contactListChanged = new Subject<Contact[]>();
  private maxContactId: number;


  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
   }

  // Get all contacts
  getContacts(): Contact[] {
    return this.contacts;
  }

  // Get a single contact by ID
  getContact(id: string): Contact | null {
    return this.contacts.find(contact => contact.id === id) || null ;
  }

  // Get Max ID for new contacts
  private getMaxId(): number {
    let maxId = 0;
    this.contacts.forEach(contact => {
      const currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  // **ADD CONTACT**
  addContact(newContact: Contact) {
    if (!newContact) return;
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactListChanged.next(this.contacts.slice()); // Emit updated list
  }

  // **UPDATE CONTACT**
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;
    const pos = this.contacts.findIndex(c => c.id === originalContact.id);
    if (pos < 0) return;
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contactListChanged.next(this.contacts.slice()); // Emit updated list
  }

  // **DELETE CONTACT**
  deleteContact(contact: Contact) {
    if (!contact) return;
    const index = this.contacts.indexOf(contact);
    if (index < 0) return;
    this.contacts.splice(index, 1);
  }
}
