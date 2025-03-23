import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageItemComponent } from '../message-item/message-item.component';  
import { MessageEditComponent } from '../message-edit/message-edit.component'; 
import { Message } from '../message.model'; 
import { MessageService } from '../message.service';
import { ContactService } from '../../contacts/contact.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'cms-message-list',
  standalone: true,
  imports: [
    CommonModule,
    MessageItemComponent,
    MessageEditComponent,
    HttpClientModule
  ],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService, private contactService: ContactService) {}

  ngOnInit() {
    // First load contacts
    this.contactService.getContacts();
  
    // Then subscribe to messages
    this.messageService.messageChangedEvent.subscribe((updatedMessages: Message[]) => {
      const contacts = this.contactService.getAllContacts(); 
  
      this.messages = updatedMessages.map(message => {
        const contact = contacts.find(c => c.id === message.sender);
        return {
          ...message,
          sender: contact ? contact.name : 'Unknown Sender'
        };
      });
    });
  
    this.messageService.getMessages();
  }
}