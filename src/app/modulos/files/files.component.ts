import { Component, OnInit , ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { map , catchError } from 'rxjs/operators';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { formatDate } from '@angular/common';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { TestService } from '../../_service/test.service';
import {TransitionController, Transition, TransitionDirection} from 'ng2-semantic-ui';
import {TransitionService} from '../../_service/transition.service';


export class Data {
  QuestionText: string = "";
  FileUpload: File;
}
export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];


@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  public transitionController = new TransitionController();

  uploader: FileUploader;
  hasBaseDropZoneOver = false;

  baseUrl = environment.apiUrl;

  public uploadProgress: number;
  displayedColumns: string[] = ['Nombre', 'Codcli', 'DOI', 'Perfil', 'Info'];
  dataSource: MatTableDataSource<UserData>;
  pantalla: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(public http: HttpClient, private alertify: TestService , private transition: TransitionService) { 
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    this.pantalla = 1;
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
    this.initializeUploader();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.animate();
  }
  public animate(transitionName: string = 'fade right') {
    this.transitionController.animate(
        new Transition(transitionName, 500, TransitionDirection.In, () => console.log('Completed transition.')));
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getPersona() {
   this.pantalla = 2;

  }
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  upload(file: File){
    // debugger;
/*    const baseUrl = 'https://localhost:44317/api/Files/File';
    const formData: FormData = new FormData();
    formData.append('File', file);
    formData.append('jsonString', file.name);
  return  this.http.post(baseUrl, formData).subscribe(response=>{
  }, error=>{
     console.log(error);
  })

     */

  }
  
  initializeUploader() {
    this.uploader = new FileUploader({
      // This is pointing to the API \DatingApp.API\Controllers\PhotosController.cs
      // where the route specified is 'api/users/{userId}/photos'
      url: this.baseUrl + 'Files/File',
      // We also need to authenticate so we need to pass the auth token
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      // allowedFileType: ['image'],
      // After the photo has been successfully uploaded, we want to remove it from
      // the upload queue
      removeAfterUpload: true,
      // We want our users to click the button before we will upload
      autoUpload: false,
      // Setting the max file size to 10MB
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      
       this.alertify.success('Exito');
     
    };
  }


  
}


/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}
