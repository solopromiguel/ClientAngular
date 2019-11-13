import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TestService } from '../../_service/test.service';
import { DatingService } from '../../_service/dating.service';


import { TransitionController, Transition, TransitionDirection } from 'ng2-semantic-ui';
import { TransitionService } from '../../_service/transition.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Identificacion {
  calificacion: string;
  caracteristicaId: number;
  descripcion: string;
  id: number;
  impacto: string;
  probabilidad: string;
  highlighted?: boolean;
  hovered?: boolean;

}
export interface Evaluacion {
  calificacion: string;
  caracteristicaId: number;
  descripcion: string;
  id: number;
  impacto: string;
  probabilidad: string;

  controles?: Control[];
  highlighted?: boolean;
  hovered?: boolean;
}

export interface Control {
  calificacion: string;
  cargo: string;
  formalizacion: string;
  grado: string;
  oportunidad: string;
  peridiocidad: string;
  descripcion: string;
  
  highlighted?: boolean;
  hovered?: boolean;
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}




const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  constructor(public http: HttpClient, private alertify: TestService, private transition: TransitionService
            , private _formBuilder: FormBuilder, private _datingService : DatingService) {

  }

  displayedColumns1: string[] = ['position', 'name', 'weight', 'symbol' ,'button'];
  dataSource1 = ELEMENT_DATA;
  selected = 'option2';

  color = 'primary';
  mode = 'determinate';
  value = 80;

  dataClientes: Identificacion[] = [];
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  checkListClientes: Identificacion[] = [];
  checkListProductos: Identificacion[] = [];
  checkListZona: Identificacion[] = [];
  data2: any [];
  pantallaControl = true;
  
  foods: any[] = [
    { value: 'CANALES ELECTRONICOS', viewValue: 'CANALES ELECTRONICOS' },
    { value: 'OPERACIONES', viewValue: 'OPERACIONES' },
    { value: 'CREDITOS', viewValue: 'CREDITOS' },
    { value: 'OTROS', viewValue: 'OTROS' }
  ];

  displayedColumns = ['checked' , 'id', 'descripcionCarateristica' , 'descripcionIdentificacion' , 'impacto', 'probabilidad' ,'calificacion'];
  dataSource = this.dataClientes;
  dataSourceProductos = this.dataClientes;
  dataSourceZona = this.dataClientes;
  public transitionController = new TransitionController();
  baseUrl = environment.apiUrl;
  
  highlight(element: Identificacion) {
    element.highlighted = !element.highlighted;
  }

  ngOnInit() {
     this.getCaracteristicasPorFactor(1);//IdFactor
     this.getCaracteristicasPorFactor(6);
     this.getCaracteristicasPorFactor(7);

     this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
     this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

     this.animate();
  }
  evaluar(){
    this.pantallaControl=false;
  }

  getCaracteristicasPorFactor(IdFactor: number) {
    this._datingService.getCaracteristicasPorFactor(IdFactor).subscribe( data => {
    // this.alertify.success('Bienvenido');
    // this.data2 = data;
     if(IdFactor == 1){
      this.dataClientes = data;
      this.dataSource = this.dataClientes;
      console.log(this.dataClientes);
     }
     if(IdFactor==6){

      this.dataSourceProductos = data;
      console.log(this.dataSourceProductos);
     }

     if(IdFactor==7){

      this.dataSourceZona = data;
      console.log(this.dataSourceZona);
     }
     

     }, error => {
      this.alertify.error(error);
     }, () => {
     // this.router.navigate(['/home']);
     });
   }



  public animate(transitionName: string = 'fade right') {
    console.log("entro");
    this.transitionController.animate(
      new Transition(transitionName, 500, TransitionDirection.In, () => console.log('Completed transition.')));
  }

  selectClientes(row: any) {
  row.highlighted = !row.highlighted;
  if(row.highlighted) {
      this.checkListClientes.push(row.id);
    } else {
    for(var i=0 ; i < this.checkListClientes.length; i++) {
      if(this.checkListClientes[i] == row.id) {
        this.checkListClientes.splice(i, 1);
     }
   }
 }
  console.log(this.checkListClientes);
}
selectProductos(row: any) {
  row.highlighted = !row.highlighted;
  if(row.highlighted) {
      this.checkListProductos.push(row.id);
    } else {
    for(var i=0 ; i < this.checkListProductos.length; i++) {
      if(this.checkListProductos[i] == row.id) {
        this.checkListProductos.splice(i, 1);
     }
   }
 }
  console.log(this.checkListProductos);
}
selectZona(row: any) {
  row.highlighted = !row.highlighted;
  if(row.highlighted) {
      this.checkListZona.push(row.id);
    } else {
    for(var i=0 ; i < this.checkListZona.length; i++) {
      if(this.checkListZona[i] == row.id) {
        this.checkListZona.splice(i, 1);
     }
   }
 }
  console.log(this.checkListProductos);
}

deletedEvaluacion(){

  

}


}

