// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { HeaderComponent } from './header.component';
// import { ContactListComponent } from "./contacts/contact-list/contact-list.component";
// import { ContactsComponent } from './contacts/contacts.component';
// import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';

// @Component({
//   selector: 'cms-root',
//   standalone: true,
//   imports: [RouterOutlet, HeaderComponent, ContactListComponent, ContactsComponent, ContactDetailComponent],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'cms';
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';

@Component({
  selector: 'cms-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ContactsComponent, DocumentsComponent, MessageListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  selectedFeature: string = 'contacts';

  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }
}
