import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { MessagesComponent } from './messages/messages.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';

export const routes: Routes = [
  { path: 'documents', component: DocumentsComponent, children: [
    { path: 'new', component: DocumentEditComponent },
    { path: ':id', component: DocumentDetailComponent },
    { path: ':id/edit', component: DocumentEditComponent }
  ] },

  { path: 'messages',
    component: MessagesComponent,
    children: [
      
      { path: 'new', loadComponent: () => import('./messages/message-edit/message-edit.component').then(m => m.MessageEditComponent) },
      { path: ':id/edit', loadComponent: () => import('./messages/message-edit/message-edit.component').then(m => m.MessageEditComponent) }
    ] },
  {
    path: 'contacts',
    component: ContactsComponent,
    children: [
      //{ path: '', loadComponent: () => import('./contacts/contact-list/contact-list.component').then(m => m.ContactListComponent) },
      { path: 'new', loadComponent: () => import('./contacts/contact-edit/contact-edit.component').then(m => m.ContactEditComponent) },
      { path: ':id', loadComponent: () => import('./contacts/contact-detail/contact-detail.component').then(m => m.ContactDetailComponent) },
      { path: ':id/edit', loadComponent: () => import('./contacts/contact-edit/contact-edit.component').then(m => m.ContactEditComponent) }
    ]
  },

  { path: '', redirectTo: '/documents', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/documents' } // Wildcard route (fallback for unknown URLs)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}