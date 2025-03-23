import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageItemComponent } from '../message-item/message-item.component';  
import { MessageEditComponent } from '../message-edit/message-edit.component'; 
import { Message } from '../message.model'; 
import { MessageService } from '../message.service';
import { ContactService } from '../../contacts/contact.service';
import { HttpClientModule } from '@angular/common/http';

type DisplayMessage = Message & { senderName: string };

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
  messages: DisplayMessage[] = [];

  constructor(private messageService: MessageService, private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContacts();

    this.messageService.messageChangedEvent.subscribe((updatedMessages: Message[]) => {
      const contacts = this.contactService.getAllContacts();

      this.messages = updatedMessages.map(message => {
        let senderName = 'Unknown Sender';

        if (typeof message.sender === 'object' && message.sender?.name) {
          senderName = message.sender.name;
        } else if (typeof message.sender === 'string') {
          const contact = contacts.find(c => c._id === message.sender || c.id === message.sender);
          senderName = contact ? contact.name : 'Unknown Sender';
        }

        return {
          ...message,
          senderName // Add new string field
        };
      });
    });

    this.messageService.getMessages();
  }


  getSenderName(sender: string | { name: string }): string {
    if (typeof sender === 'object' && sender !== null && 'name' in sender) {
      return sender.name;
    }
  
    const contact = this.contactService.getContact(sender);
    return contact ? contact.name : 'Unknown';
  }
}