import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { CommonModule, NgFor } from '@angular/common';
import { ContactService } from '../contact.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cms-contact-list',
  standalone: true,
  imports: [NgFor, RouterModule, CommonModule, ContactItemComponent],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {} // Inject ContactService

  ngOnInit() {
    this.contacts = this.contactService.getContacts(); // Fetch contacts from service
  }


  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }
}
