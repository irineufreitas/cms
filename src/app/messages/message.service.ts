import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new Subject<Message[]>();
  maxMessageId: number = 0;

  constructor(private http: HttpClient) {
    this.getMessages(); // Load from Firebase on service init
  }

  // 🔁 Get messages from Firebase
  getMessages() {
    this.http
      .get<Message[]>('https://cms-byui-48da0-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          console.log('✅ Messages retrieved:', messages);
          this.messages = messages || [];
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error) => {
          console.error('Error fetching messages:', error);
        }
      );
  }

  // 🔁 Save messages to Firebase
  storeMessages() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(
        'https://cms-byui-48da0-default-rtdb.firebaseio.com/messages.json',
        JSON.stringify(this.messages),
        { headers: headers }
      )
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

  // 🔢 Get max ID
  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      const currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  // ➕ Add new message
  addMessage(newMessage: Message) {
    if (!newMessage) return;

    this.maxMessageId++;
    newMessage.id = this.maxMessageId.toString();
    this.messages.push(newMessage);
    this.storeMessages(); // Save updated list
  }

  // 🔍 Get a single message
  getMessage(id: string): Message | null {
    return this.messages.find(message => message.id === id) || null;
  }

  // 🗑️ Optional: Delete message
  deleteMessage(id: string) {
    this.messages = this.messages.filter(m => m.id !== id);
    this.storeMessages();
  }

  // ✏️ Optional: Update message
  updateMessage(original: Message, updated: Message) {
    const index = this.messages.findIndex(m => m.id === original.id);
    if (index < 0) return;

    updated.id = original.id;
    this.messages[index] = updated;
    this.storeMessages();
  }
}