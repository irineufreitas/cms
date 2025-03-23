import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { CommonModule, NgFor } from '@angular/common';
import { ContactService } from '../contact.service';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContactsFilterPipe } from "../contacts-filter.pipe";


@Component({
  selector: 'cms-contact-list',
  standalone: true,
  imports: [
    NgFor,
    RouterModule,
    CommonModule,
    ContactItemComponent,
    DragDropModule,
    ContactsFilterPipe,
      
  ],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  private subscription!: Subscription;
  term: string = '';

  constructor(private contactService: ContactService) {
    
  }

  search(value: string) {
    this.term = value;
  }

  ngOnInit() {
    
    this.subscription = this.contactService.contactListChanged.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
    this.contactService.getContacts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}