import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { map , catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  userToken: any ;
  headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
  options = { headers: this.headers};

constructor(public http: HttpClient) { }

 login(model: any) {
  const headers = new HttpHeaders({'Content-type': 'application/json'});
  const options = { headers};

  return this.http.post(this.baseUrl + 'auth/login', model)
  .pipe(

    map((response: any) => {
      const responseUser = response;

      if (responseUser) {
        localStorage.setItem('token', responseUser.tokenString);
        this.getValues1(responseUser.tokenString);
       // console.log(responseUser.tokenString);
      }
  })
  );

}

 getValues1(token: any) {

  console.log('entroaqui');
  return this.http.get(this.baseUrl + 'values' ).subscribe(response =>{

    console.log(response);
  })
 }

 loggedIn() {
  const token = localStorage.getItem('token');

  // We will use a third party library called angular-jwt to manage the
  // token we stored in the localStorage
  // What we CANNOT DO is to validate the token since the key to validate the
  // token is on the server \DatingApp.API\appsettings.json and we don't have
  // access to that in the client application and we don't really need to do that
  // in our client application since the client application is compiled into
  // javascript and since javascript is run on the client-side, we don't want
  // end-users to have access to the validation key

  // Confusing names: angular 1 is renamed as angularjs
  // and angular 2 is renamed as angular

  // @auth0/angular-jwt: https://github.com/auth0/angular2-jwt and go for
  // version 2.0.0

  // If there is a value in this token, and is not expired,
  // then it will return true else it will return false
  // return !this.jwtHelper.isTokenExpired(token);
  return !!token;
}


}

