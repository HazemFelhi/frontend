import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-entreprise-new',
  templateUrl: './entreprise-new.component.html',
  styleUrls: ['./entreprise-new.component.css']
})
export class EntrepriseNewComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
   
  }
  /*createEntreprise() {
    this.router.navigate(['/create-entreprise'])
  }
  joinEntreprise() {
    this.router.navigate(['/create-entreprise'])

  } */
}

