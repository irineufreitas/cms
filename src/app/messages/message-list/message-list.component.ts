import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageItemComponent } from '../message-item/message-item.component';  
import { MessageEditComponent } from '../message-edit/message-edit.component'; 
import { Message } from '../message.model'; 
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  standalone: true,
  imports: [CommonModule, MessageItemComponent, MessageEditComponent],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];  

  constructor(private messageService: MessageService) {} // Inject MessageService

  ngOnInit() {
    this.messages = this.messageService.getMessages(); // Get messages from service
    
    // Listen for message changes
    this.messageService.messageChangedEvent.subscribe((updatedMessages: Message[]) => {
      this.messages = updatedMessages; // Update messages when changed
    });
  }
}