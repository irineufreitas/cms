import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageListComponent } from './message-list/message-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cms-messages',
  standalone: true,
  imports: [CommonModule, RouterModule, MessageListComponent],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {}
