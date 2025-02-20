import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  @ViewChild('subject') subjectInput!: ElementRef;
  @ViewChild('msgText') msgTextInput!: ElementRef;

  currentSender: string = "1"; // Change this to a valid sender ID

  constructor(private messageService: MessageService) {} // ✅ Inject MessageService

  onSendMessage() {
    const subject = this.subjectInput.nativeElement.value.trim();
    const msgText = this.msgTextInput.nativeElement.value.trim();

    if (!subject || !msgText) return; // Prevent sending empty messages

    const newMessage = new Message(
      Math.floor(Math.random() * 1000).toString(),  // Generate a unique ID
      this.currentSender,  //  Use the current sender ID
      subject,  // Subject comes before message text
      msgText
    );

    this.messageService.addMessage(newMessage); // Save to MessageService
    this.onClear(); //  Clear input fields after sending
  }

  onClear() {
    this.subjectInput.nativeElement.value = "";
    this.msgTextInput.nativeElement.value = "";
  }
}