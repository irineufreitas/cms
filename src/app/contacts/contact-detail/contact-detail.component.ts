import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-contact-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
  @Input() contact!: Contact;
}
