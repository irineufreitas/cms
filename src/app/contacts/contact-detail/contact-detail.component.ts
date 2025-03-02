import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cms-contact-detail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact!: Contact;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.contact = this.contactService.getContact(id)!;
    });
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']); // ✅ Redirect to contact list after deletion
  }
}