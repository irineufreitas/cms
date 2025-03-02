import { Routes } from '@angular/router';
import { provideRouter, withComponentInputBinding } from '@angular/router'; //  Use withComponentInputBinding
import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component'; 
import { ContactsComponent } from './contacts/contacts.component';

export const routes: Routes = [
  { path: 'documents', component: DocumentsComponent },
  { path: 'messages', component: MessageListComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: '', redirectTo: 'documents', pathMatch: 'full' }, //  Removed the leading "/" in redirectTo
  { path: '**', redirectTo: 'documents' } // Wildcard route
];

// Provide routing configuration for a standalone application
export const appRouterProviders = provideRouter(routes, withComponentInputBinding());