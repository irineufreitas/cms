import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new Subject<Message[]>();

  constructor(private http: HttpClient) {}

  getMessages(): void {
    this.http.get<{ message: string, messages: Message[] }>('http://localhost:3000/messages')
      .subscribe((responseData) => {
        this.messages = responseData.messages;
        this.messageChangedEvent.next([...this.messages]);
      }, (error) => {
        console.error('Failed to fetch messages:', error);
      });
  }

  getMessage(id: string): Message | null {
    return this.messages.find(m => m.id === id) || null;
  }

  addMessage(message: Message) {
    const postData = {
      subject: message.subject,
      msgText: message.msgText,
      sender: message.sender
    };
  
    this.http.post<{ message: string }>('http://localhost:3000/messages', postData)
      .subscribe({
        next: (responseData) => {
          console.log('✅ Message saved:', responseData);
          this.getMessages(); 
        },
        error: (error) => {
          console.error('❌ Error saving message:', error);
        }
      });
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) return;

    const pos = this.messages.findIndex(m => m.id === originalMessage.id);
    if (pos < 0) return;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    newMessage.id = originalMessage.id;
    newMessage._id = originalMessage._id;

    this.http.put(`http://localhost:3000/messages/${originalMessage.id}`, newMessage, { headers })
      .subscribe(() => {
        this.messages[pos] = newMessage;
        this.messageChangedEvent.next([...this.messages]);
      });
  }

  deleteMessage(message: Message) {
    if (!message) return;

    const pos = this.messages.findIndex(m => m.id === message.id);
    if (pos < 0) return;

    this.http.delete(`http://localhost:3000/messages/${message.id}`)
      .subscribe(() => {
        this.messages.splice(pos, 1);
        this.messageChangedEvent.next([...this.messages]);
      });
  }
}