import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { map , catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  numberAlerta = new BehaviorSubject<number>(1);
  currentNumberAlerta = this.numberAlerta.asObservable();



  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  jwtHelper = new JwtHelperService();
  decodedToken: any;
  baseUrl = environment.apiUrl;
  userToken: any ;
  headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
  options = { headers: this.headers};

constructor(public http: HttpClient) { }

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  cambiarNumberAlertas(alertas: number) {
    this.numberAlerta.next(alertas);
  }
 login(model: any) {
  const headers = new HttpHeaders({'Content-type': 'application/json'});
  const options = { headers};
  console.log('Alertas'+ this.numberAlerta.subscribe());

  return this.http.post(this.baseUrl + 'auth/login', model)
  .pipe(

    map((response: any) => {
      const responseUser = response;

      if (responseUser) {
        localStorage.setItem('token', responseUser.token);
        this.decodedToken = this.jwtHelper.decodeToken(responseUser.token);

        this.changeMemberPhoto(response.user.url);
        console.log(response.user.url);

        this.getValues1(responseUser.token);
      }
  })
  );

}

cambiarPassword(modePassword: any){
  return this.http.post(this.baseUrl + 'auth/changePassword/', modePassword)
  .pipe(
    map((response: any) => {
      console.log(response);
  })
  );

}

 getValues1(token: any) {

  return this.http.get(this.baseUrl + 'values').subscribe(response =>{

    console.log(response);
  })
 }
   loggedIn2() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
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

