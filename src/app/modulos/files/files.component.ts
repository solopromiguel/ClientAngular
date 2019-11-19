import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TestService } from '../../_service/test.service';
import { DatingService } from '../../_service/dating.service';


import { TransitionController, Transition, TransitionDirection } from 'ng2-semantic-ui';
import { TransitionService } from '../../_service/transition.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface EtapaIdentificacion {
  area: string;
  descripcion: string;
  nombre: string;
  riesgos?: Riesgo[];
}
export interface Riesgo {
  calificacion?: string;
  descripcion: string;
  impacto?: string;
  probabilidad?: string;
  riesgoinherente?: string;
  riesgoresidual?: string;
  caracteristicaid?: number;
  controles?: ControlRiesgo[];

  highlighted?: boolean;
  hovered?: boolean;
}
export interface ControlRiesgo {
  calificacion: string;
  cargo: string;
  formalizacion: string;
  grado: string;
  oportunidad: string;
  periodicidad: string;
  descripcion: string;

  controlid: number;

  highlighted?: boolean;
  hovered?: boolean;
}

// Modelos

export interface Identificacion {
  calificacion: string;
  descripcion: string;
  impacto: string;
  probabilidad: string;
  caracteristicaId: number;
  id: number;

  highlighted?: boolean;
  hovered?: boolean;

}

export interface Control {
  id: number;
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
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  constructor(public http: HttpClient, private alertify: TestService, private transition: TransitionService
             // tslint:disable-next-line: variable-name
             ,private _formBuilder: FormBuilder, private _datingService: DatingService) {

  }

  // COLUMS TABLE
  displayedColumns = ['checked', 'id', 'descripcionCarateristica',
    'descripcionIdentificacion', 'impacto', 'probabilidad', 'calificacion'];
  displayedColumns1 = ['descripcion', 'riesgoinherente', 'riesgoresidual', 'button'];
  // MODELS
  dataClientes: Identificacion[] = [];
  riesgos: any[] = [];
  // DATA SOURCE



  dataSource = this.dataClientes;
  dataSourceProductos = this.dataClientes;
  dataSourceZona = this.dataClientes;


  dataSource1?: MatTableDataSource <Riesgo[]>;

  // dataSource1 = this.riesgos;

  // LIST CHECK
  checkListClientes: Identificacion[] = [];
  checkListProductos: Identificacion[] = [];
  checkListZona: Identificacion[] = [];

  // VARIABLES
  selected = 'option2';
  color = 'primary';
  mode = 'determinate';
  value = 80;
  pantallaControl = true;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  foods: any[] = [
    { value: 'CANALES ELECTRONICOS', viewValue: 'CANALES ELECTRONICOS' },
    { value: 'OPERACIONES', viewValue: 'OPERACIONES' },
    { value: 'CREDITOS', viewValue: 'CREDITOS' },
    { value: 'OTROS', viewValue: 'OTROS' }
  ];

  baseUrl = environment.apiUrl;
  public transitionController = new TransitionController();
  

  highlight(element: Identificacion) {
    element.highlighted = !element.highlighted;
  }

  ngOnInit() {


    this.getCaracteristicasPorFactor(1); // IdFactor
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
  evaluar() {
    this.pantallaControl = false;
  }

  getCaracteristicasPorFactor(IdFactor: number) {
    this._datingService.getCaracteristicasPorFactor(IdFactor).subscribe(data => {
      // this.alertify.success('Bienvenido');
      // this.data2 = data;
      if (IdFactor == 1) {
        this.dataClientes = data;
        this.dataSource = this.dataClientes;
        console.log(this.dataClientes);
      }
      if (IdFactor == 6) {
        this.dataSourceProductos = data;
        console.log(this.dataSourceProductos);
      }

      if (IdFactor == 7) {
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
    if (row.highlighted) {
      this.checkListClientes.push(row.id);
      console.log("entro 1");
      this.addRiesgo(row);
    } else {
      for (var i = 0; i < this.checkListClientes.length; i++) {
        if (this.checkListClientes[i] == row.id) {
          this.checkListClientes.splice(i, 1);
        }
      }
    }
    //  console.log(this.checkListClientes);
  }
  selectProductos(row: any) {
    row.highlighted = !row.highlighted;
    if (row.highlighted) {
      this.checkListProductos.push(row.id);
       this.addRiesgo(row);
    } else {
      for (var i = 0; i < this.checkListProductos.length; i++) {
        if (this.checkListProductos[i] == row.id) {
          this.checkListProductos.splice(i, 1);
        }
      }
    }
    console.log(this.checkListProductos);
  }
  selectZona(row: any) {
    row.highlighted = !row.highlighted;
    if (row.highlighted) {
      this.checkListZona.push(row.id);
    } else {
      for (var i = 0; i < this.checkListZona.length; i++) {
        if (this.checkListZona[i] == row.id) {
          this.checkListZona.splice(i, 1);
        }
      }
    }
    console.log(this.checkListProductos);
  }

  addRiesgo(model: any) {
    const test: Riesgo[] = [{ descripcion: model.descripcionIdentificacion, riesgoinherente: '', riesgoresidual: '' }];


    const data = this.dataSource1.data;
    data.push(test);
   // this.dataSource1.data = data;

     this.riesgos.push(test);
    // this.dataSource1.data.push(test);
    //this.dataSource1.data = model;
    console.log(this.dataSource1);
  }

  deletedEvaluacion() {
  }


}

