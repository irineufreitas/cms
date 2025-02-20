import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  private contacts: Contact[] = [];


  constructor() {
    this.contacts = MOCKCONTACTS;
   }

  // Get all contacts
  getContacts(): Contact[] {
    return this.contacts;
  }

  // Get a single contact by ID
  getContact(id: string): Contact | null {
    return this.contacts.find(contact => contact.id === id) || null ;
  }

}
