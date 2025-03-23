import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];
  contactListChanged = new Subject<Contact[]>();
  private maxContactId: number = 0;

  constructor(private http: HttpClient) {
    //this.getContacts();
  }

  getContacts() {
    this.http.get<{ message: string, contacts: Contact[] }>('http://localhost:3000/contacts')
      .subscribe(
        (responseData) => {
          this.contacts = responseData.contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => a.name.localeCompare(b.name));
          this.contactListChanged.next(this.contacts.slice());
        },
        (error) => {
          console.error('Error fetching contacts:', error);
        }
      );
  }

  getContact(id: string): Contact | null {
    return this.contacts.find(contact => contact.id === id) || null;
  }

  private getMaxId(): number {
    return this.contacts.reduce((max, contact) => {
      const id = parseInt(contact.id, 10);
      return id > max ? id : max;
    }, 0);
  }

  addContact(contact: Contact) {
    if (!contact) return;

    contact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string, contact: Contact }>(
      'http://localhost:3000/contacts',
      contact,
      { headers: headers }
    ).subscribe((responseData) => {
      this.contacts.push(responseData.contact);
      this.contactListChanged.next(this.contacts.slice());
    });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;

    const pos = this.contacts.findIndex(c => c.id === originalContact.id);
    if (pos < 0) return;

    newContact.id = originalContact.id;
    newContact._id = originalContact._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('http://localhost:3000/contacts/' + originalContact.id, newContact, { headers: headers })
      .subscribe(() => {
        this.contacts[pos] = newContact;
        this.contactListChanged.next(this.contacts.slice());
      });
  }

  deleteContact(contact: Contact) {
    if (!contact) return;

    const pos = this.contacts.findIndex(c => c.id === contact.id);
    if (pos < 0) return;

    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(() => {
        this.contacts.splice(pos, 1);
        this.contactListChanged.next(this.contacts.slice());
      });
  }

  getAllContacts(): Contact[] {
    return this.contacts.slice();
  }
}