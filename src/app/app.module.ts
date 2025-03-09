import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop'; // ✅ Import Angular CDK Drag & Drop
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Import Components
import { AppComponent } from './app.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule, 
    FormsModule,
    CommonModule
  ],
  providers: [],
   
})
export class AppModule { }