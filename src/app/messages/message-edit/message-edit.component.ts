import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  @Output() addMessageEvent = new EventEmitter<Message>();  

  @ViewChild('subject') subjectInput!: ElementRef;
  @ViewChild('msgText') msgTextInput!: ElementRef;

  currentSender: string = "YourName";  

  onSendMessage() {
    const newMessage = new Message(
      Math.floor(Math.random() * 1000).toString(),  // ✅ Convert number to string to match `id` type
      this.subjectInput.nativeElement.value,
      this.msgTextInput.nativeElement.value,
      this.currentSender
    );
    console.log("📨 Emitting message:", newMessage);
    this.addMessageEvent.emit(newMessage);  
  }

  onClear() {
    this.subjectInput.nativeElement.value = "";
    this.msgTextInput.nativeElement.value = "";
  }

}
