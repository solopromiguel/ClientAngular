import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Parser } from '@angular/compiler/src/ml_parser/parser';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { escapeIdentifier } from '@angular/compiler/src/output/abstract_emitter';
import { AuthService } from '../_service/auth.service';

import { TestService } from '../_service/test.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  angForm: FormGroup;
  photoUrl: string;
  values: any;
  model: any = {};
  isExpanded = false;

  constructor(private http: HttpClient, private fb: FormBuilder , public authService: AuthService,
              private test: TestService, private router: Router) {}

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);

  console.log('AQUI FOTO');
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  login() {
    console.log('entro');
    this.authService.login(this.model).subscribe(data => {
    this.test.success('Bienvenido');
     }, error => {
       this.test.error(error);
     }, () => {
     this.router.navigate(['/home']);
     });
   }

   logout() {
    // this.authService.getValues1(localStorage.getItem('token'));
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.test.success('logoud out ');
    this.router.navigate(['/register']);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

}
