import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-contact-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent {
  @Input() contact!: Contact;
  @Output() contactSelected = new EventEmitter<Contact>();

  onClick() {
    this.contactSelected.emit(this.contact);
  }
}
