import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Parser } from '@angular/compiler/src/ml_parser/parser';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { escapeIdentifier } from '@angular/compiler/src/output/abstract_emitter';
import { AuthService } from '../_service/auth.service';

import { TestService } from '../_service/test.service';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css'],

})

export class ValueComponent implements OnInit {
 angForm: FormGroup;
 values: any;
 model: any = {};
 


  constructor(private http: HttpClient, private fb: FormBuilder , public authService: AuthService,
              private test: TestService) {
   // this.createForm();
  
  }
 
  createForm() {
    this.angForm = this.fb.group({
      nombre: ['', Validators.required ],
    });
  }

  ngOnInit() {
    // this.dataSource = ELEMENT_DATA;
   // this.getValues();
 
  }
  login() {
   console.log('entro');
   this.authService.login(this.model).subscribe(data => {
   this.test.success('Logeado!');
    }, error => {
      this.test.error(error);
    });

  }
    getValues() {
        this.values = null;
        this.http.get('http://MOVUNC05/api/Personas')
        .subscribe(response => {
        console.log();
        // let  value2 = [];
        // value2.push(response)
        this.values = response;
       // this.dataSource = JSON.parse(JSON.stringify(response));
      });
    }

    addProduct(nombre) {
      const obj = {
        nombre,
      };
      console.log(obj);
      this.http.post('http://MOVUNC05/api/Personas/PostPersona', obj).subscribe(response => {
        console.log(response);
        this.getValues();
      });

    }

    edit(id , nombre) {
      const obj = {
        id,
        nombre,
      };
      console.log(obj);

    }

    logout(){

      this.authService.userToken = null;
      localStorage.removeItem('token');
      this.test.success('logoud out ');
    }

    loggedIn(){
      const token = localStorage.getItem('token');
      return !!token;
    }

}



