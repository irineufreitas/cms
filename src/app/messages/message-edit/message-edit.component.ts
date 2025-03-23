import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Contact } from '../../contacts/contact.model';
import { ContactService } from '../../contacts/contact.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'cms-message-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent implements OnInit, OnDestroy {
  @ViewChild('subject') subjectInput!: ElementRef;
  @ViewChild('msgText') msgTextInput!: ElementRef;

  contacts: Contact[] = [];
  selectedSenderId: string | undefined;
  private subscription!: Subscription;

  constructor(
    private messageService: MessageService,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.subscription = this.contactService.contactListChanged.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
  
        if (!this.selectedSenderId && contacts.length > 0) {
          this.selectedSenderId = contacts[0]._id;
          console.log('✅ Default sender set to:', this.selectedSenderId);
        }
      }
    );
  
    // ✅ Now fetch contacts — AFTER the subscription is ready
    this.contactService.getContacts();
  }
  onSendMessage() {
    const subject = this.subjectInput.nativeElement.value.trim();
    const msgText = this.msgTextInput.nativeElement.value.trim();
    const sender = this.selectedSenderId;
  
    if (!subject || !msgText || !sender || sender === 'undefined' || sender === '') {
      console.warn('⚠️ Cannot send message: Missing subject, message text, or sender.', {
        subject, msgText, sender
      });
      return;
    }
  
    const newMessage = new Message(subject, msgText, sender);
    this.messageService.addMessage(newMessage);
    this.onClear();
  }

  onClear() {
    this.subjectInput.nativeElement.value = '';
    this.msgTextInput.nativeElement.value = '';
  
    // Revert to default contact instead of clearing
    if (this.contacts.length > 0) {
      this.selectedSenderId = this.contacts[0]._id ?? '';
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}