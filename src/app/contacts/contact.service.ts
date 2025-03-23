import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  //contactSelectedEvent = new EventEmitter<Contact>();
  private contacts: Contact[] = [];
  contactListChanged = new Subject<Contact[]>();
  private maxContactId: number;


  constructor(private http: HttpClient) {
    //this.contacts = MOCKCONTACTS;
    this.getContacts();
    this.maxContactId = this.getMaxId();
   }

   getContacts() {
    this.http.get<Contact[]>('https://cms-byui-48da0-default-rtdb.firebaseio.com/contacts.json')
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
  
          this.contacts.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0);
  
          this.contactListChanged.next(this.contacts.slice());
        },
        (error: any) => {
          console.error('Error fetching contacts:', error);
        }
      );
  }

  storeContacts() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    this.http.put(
      'https://cms-byui-48da0-default-rtdb.firebaseio.com/contacts.json',
      JSON.stringify(this.contacts),
      { headers: headers }
    ).subscribe(() => {
      this.contactListChanged.next(this.contacts.slice());
    });
  }

  // Get a single contact by ID
  getContact(id: string): Contact | null {
    return this.contacts.find(contact => contact.id === id) || null ;
  }

  // Get Max ID for new contacts
  getMaxId(): number {
    let maxId = 0;
  
    for (let contact of this.contacts) {
      let currentId = +contact.id;
  
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
  
    return maxId;
  }

  // **ADD CONTACT**
  addContact(newContact: Contact) {
    if (!newContact) return;
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts(); 
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
    this.storeContacts(); 
  }

  getAllContacts(): Contact[] {
    return this.contacts.slice(); // return a clone to avoid mutations
  }
}
