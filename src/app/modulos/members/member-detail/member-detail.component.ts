import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { TestService } from '../../../_service/test.service';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { AuthService } from '../../../_service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  photoUrl: string;
  photo: any = {};
  modelPassword: any = {};
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  constructor(private route: ActivatedRoute, public http: HttpClient, private alertify: TestService,
              private authService: AuthService) { }

  ngOnInit() {
   console.log( this.route.snapshot.paramMap.get('id'));
   console.log(this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token')));
   this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
   this.initializeUploader();
  }

  cambiarPassword() {
  const Password = this.modelPassword.Password;
  const UserName = this.decodedToken.unique_name;
  this.authService.cambiarPassword(
    {
      UserName,
      Password
    }
  ).subscribe(data => {
    this.alertify.success('Guardado');
     }, error => {
       this.alertify.error(error);
     }, () => {
        // Finallity
     });
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      // This is pointing to the API \DatingApp.API\Controllers\PhotosController.cs
      // where the route specified is 'api/users/{userId}/photos'
      url: this.baseUrl + 'Files/AddPhotoForUser/' + this.decodedToken.nameid,
      // We also need to authenticate so we need to pass the auth token
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      // After the photo has been successfully uploaded, we want to remove it from
      // the upload queue
      removeAfterUpload: true,
      // We want our users to click the button before we will upload
      autoUpload: false,
      // Setting the max file size to 10MB
      maxFileSize: 10 * 1024 * 1024
    });

       this.uploader.onSuccessItem = (item, response : any, status, headers) => {

         const res: any = JSON.parse(response);
         console.log(res.url);
         this.photoUrl=res.url;
         this.alertify.success('Guardado!');
     
    };
  }

}
