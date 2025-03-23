// import { Component, Input, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Message } from '../message.model';
// import { ContactService } from '../../contacts/contact.service';
// import { Contact } from '../../contacts/contact.model';
// @Component({
//   selector: 'cms-message-item',
//   imports: [CommonModule],
//   templateUrl: './message-item.component.html',
//   styleUrl: './message-item.component.css'
// })
// export class MessageItemComponent implements OnInit {
//   @Input() message!: Message ;
//   messageSender: string = 'Unknown Sender';

//   constructor(private contactService: ContactService) {} // Inject ContactService

//   ngOnInit() {
//     if (this.message) {  
//       const contact: Contact | null = this.contactService.getContact(this.message.sender) ?? null;
//       this.messageSender = contact ? contact.name : 'Unknown Sender'; // Assign correct value
//     }
//   }
// }

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent {
  @Input() message!: Message & { senderName: string };
  @Input() senderName: string = 'Unknown';

  
}