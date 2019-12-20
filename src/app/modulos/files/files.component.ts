import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TestService } from '../../_service/test.service';
import { DatingService } from '../../_service/dating.service';
import { DocxtemplaterService } from '../../_service/docxtemplater.service';
import { saveAs } from 'file-saver';

import { TransitionController, Transition, TransitionDirection } from 'ng2-semantic-ui';
import { TransitionService } from '../../_service/transition.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import {ControlRiesgo, EtapaIdentificacion, Riesgo} from '../../models/index';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

// Modelos

export class Identificacion {
  calificacion: string;
  descripcion: string;
  impacto: string;
  probabilidad: string;
  caracteristicaId: number;
  id: number;

  highlighted?: boolean;
  hovered?: boolean;

}
export class IdentificacionDto{
  Calificacion: string;
  descripcionCarateristica: string;
  descripcionIdentificacion?: string;
  Impacto: string;

}

export class Control {
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
export class Datos {
  constructor(
    public nombre: string,
   
){}
 
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
             , private _formBuilder: FormBuilder, private _datingService: DatingService, private _doct: DocxtemplaterService) {

  }

  matriz = [
    [3 , 3, 2, 2, 1],
    [3 , 3, 2, 1, 0],
    [3 , 2, 1, 1, 0],
    [3 , 2, 1, 0, 0],
    [2 , 1, 1, 0, 0]
    ];
  nameModel= '';
  controlesAll :ControlRiesgo[];
  ActualRiesgoSeleccionado?:Riesgo;
  selected1 ? = IdentificacionDto;
  identificaciones: IdentificacionDto[] = [];
  selectedTrainer: EtapaIdentificacion;
  modelAdd = IdentificacionDto;
  // COLUMS TABLE
  displayedColumns = ['checked', 'id', 'descripcionCarateristica',
    'descripcionIdentificacion', 'impacto', 'probabilidad', 'calificacion'];
  displayedColumns1 = ['descripcion', 'probabilidad', 'impacto', 'button'];
  displayedColumnsControls = [ 'checked','id', 'descripcion',  'cargo' ,'calificacion',];

  // MODELS
  dataClientes: Identificacion[] = [];
  dataControles: ControlRiesgo[] = [];
  riesgos: Riesgo[] = [];
  // DATA SOURCE
  dataSource =  this.dataClientes;
  dataSourceProductos = this.dataClientes;
  dataSourceZona = this.dataClientes;
  dataSourceControls : MatTableDataSource<ControlRiesgo[]> =  new  MatTableDataSource ();


  dataSource1: MatTableDataSource<Riesgo[]> =  new  MatTableDataSource ();
  // dataSource1 = this.riesgos;

  // LIST CHECK
  checkListClientes: Identificacion[] = [];
  checkListProductos: Identificacion[] = [];
  checkListZona: Identificacion[] = [];

  // VARIABLES
  selected = 'option2';

  Probabilidad = '';
  Impacto = '';
  RiesgoInherente = '';
  RiesgoResidual = '' ;

  color = 'primary';
  mode = 'determinate';
  value = 80;
  pantallaControl = true;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  modelEtapa : any = {};
  selectedArea:'';
  
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
    
    this.getControls();


    this.animate();
  }
  generar() {
   console.log(this.cambioProbabilidadOrImpacto());
   const Riesgos: Riesgo[] = this.riesgos;
   const Nombre = this.modelEtapa.nombre;
   
   const model = {
    area: this.selectedArea,
    descripcion: this.modelEtapa.descripcion,
    Nombre,
    Riesgos
    }
   this._datingService.GuardarEvaluacion(model).subscribe(data => {
      
      this.download();
       }, error => {
        this.download();
        console.log(error);
       }, () => {
      console.log();
       });



  // this._doct.loadFileGeneration('','');
   //this._doctOf.generate();
  }

  download(){
    this._datingService.ExportDoc().subscribe(data => {

          console.log(data);
          var binaryString = window.atob(data.result);
          var binaryLen = binaryString.length;
          var bytes = new Uint8Array(binaryLen);
          for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
          }
          var blob = new Blob([bytes], {type: "application/docx;base64"});
          var fileName = "documento.docx";
          saveAs(blob, fileName);


    }, error => {
      console.log(error);
    }, () => {
    //  console.log();
    });


  }
  calcularIdentidad(model: string) {

    switch(model) {
      case 'MUY ALTA': { 
          return 0;
          break; 
      } 
      case 'ALTA': { 
        return 1;
        break; 
      }
      case 'MEDIA': { 
        return 2;
        break; 
      }
      case 'BAJA': { 
        return 3;
        break; 
      }
      case 'MUY BAJA': { 
        return 4;
        break; 
      }
      default: { 
        return 0;
        break; 
      } 
   } 
  }
  calcularIdentidad2(val: number) {
    
    switch(val) {
      case 0:
               return "BAJO";
       break;
      case 1:
                return "MODERADO";
       break;
       case 2:
                return "ALTO";
       break;
      case 3:
                return "EXTREMO";
       break;
      
      default:
               
          break;

    }
  }
  calcularIdentidad3(model: string)
  {
    
 switch(model) {
   case "BAJO":
            return "BAJO";
    break;
   case "MODERADO":
             return "BAJO";
    break;
    case "ALTO":
            return "MODERADO";
    break;
   case "EXTREMO":
           return "ALTO";
    break;
   
   default:
            
       break;

 }
 
 
} 

calcularIdentidad4(model: string)
{
  
switch(model) {
 case "BAJO":
          return "MODERADO";
  break;
 case "MODERADO":
           return "ALTO";
  break;
  case "ALTO":
          return "EXTREMO";
  break;
 case "EXTREMO":
         return "EXTREMO";
  break;
 
 default:
          
     break;

}


}

  evaluar(row: any) {
    
    this.pantallaControl = false;
    this.ActualRiesgoSeleccionado = row;
    this.setProbabilidadAndImpacto();
    this.cambioProbabilidadOrImpacto();
   // this.getControls();
    for (let j = 0; j < this.dataSourceControls.data.length; j++) {
      this.dataSourceControls.data[j]['checked']=false;
    }

    for (var i = 0; i < this.riesgos.length; i++) {
      if (this.riesgos[i].identificacionid == this.ActualRiesgoSeleccionado.identificacionid) {
        if(this.riesgos[i].controles.length==0){
           console.log("vacio")
          return ;
        }else {
          for (var j = 0; j < this.dataSourceControls.data.length; j++) {
           
            for (var z = 0; z < this.riesgos[i].controles.length; z++) {
              
                  if(this.riesgos[i].controles[z].id==this.dataSourceControls.data[j]['id']){
                    this.dataSourceControls.data[j]['checked']=true;
                    console.log("encontro");
  
                  } else {
                    console.log("no");
                   // this.dataSourceControls.data[j]['checked']=false;
                    
                  }
                }
          }

        }

      }
     }
     console.log('Aqui abajo esta');
      console.log(this.dataSourceControls.data);
  }
  getControls() {
    this._datingService.getListControls().subscribe(data => {
    console.log(data);
    this.controlesAll=data;
    this.dataSourceControls.data=data;
    // return data;
    }, error => {
      this.alertify.error(error);
    }, () => {
    });

  }

  getCaracteristicasPorFactor(IdFactor: number) {
    this._datingService.getCaracteristicasPorFactor(IdFactor).subscribe(data => {
      if (IdFactor == 1) {
        this.dataClientes = data;
        this.dataSource = this.dataClientes;
        this.identificaciones = data;
      }
      if (IdFactor == 6) {
        this.dataSourceProductos = data;
      }
      /*
      if (IdFactor == 7) {
        this.dataSourceZona = data;

      }
    */
    }, error => {
      this.alertify.error(error);
    }, () => {
      // this.router.navigate(['/home']);
    });
  }

  addModel() {
    // console.log(this.modelAdd);
   // const riesgo: Riesgo = {descripcion: ''};

    // this.selectedTrainer.riesgos.push(riesgo);
    // this.selectedTrainer.riesgos.push(this.pokemonToAdd)
    // this.dsPokemons.data = this.selectedTrainer.pokemons;
  }
  public animate(transitionName: string = 'fade right') {
    this.transitionController.animate(
      new Transition(transitionName, 500, TransitionDirection.In, () => console.log('Completed transition.')));
  }

  selectClientes(row: any) {
    if(row.checked){
     console.log("check");
    }else{
      console.log(row);
      console.log("no check");
    }
    row.highlighted = !row.highlighted;
    if (row.highlighted) {
      this.checkListClientes.push(row.id);
      this.addRiesgo(row);
      } else {
      this.deleteRiesgo(row.id)
      for (var i = 0; i < this.checkListClientes.length; i++) {
        if (this.checkListClientes[i] == row.id) {
          this.checkListClientes.splice(i, 1);
        }
      }
    }
    console.log(this.checkListClientes);
  }
  selectProductos(row: any) {
    row.highlighted = !row.highlighted;
    if (row.highlighted) {
      this.checkListProductos.push(row.id);
      this.addRiesgo(row);
    } else {
      this.deleteRiesgo(row.id)
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
     const test: Riesgo = { id:model.caracteristicaId, descripcion: model.descripcionIdentificacion, riesgoinherente: '', riesgoresidual: '',probabilidad:model.probabilidad,impacto:model.impacto,identificacionid:model.id, controles:[] };
     this.riesgos.push(test);
     this.dataSource1.data=this.riesgos;
  }
  deleteRiesgo(id : any) {
    
    for (var i = 0; i <this.riesgos.length; i++) {
    
      if (this.riesgos[i].id == id) {
        this.riesgos.splice(i, 1);
        console.log("encontro");
      }
    }
    this.dataSource1.data=this.riesgos;
  }

  SelectControl(row: any) {
    console.log(row);

   // row.checked = !row.checked;
   if (!row.checked) { 
   
    console.log('agregar');
    this.calcularResidual(true)
     for (var i = 0; i < this.riesgos.length; i++) {
      if (this.riesgos[i].identificacionid == this.ActualRiesgoSeleccionado.identificacionid) {
         this.riesgos[i].controles.push(row);
      }
    }
    
  } else {
    console.log('deleted');
    this.calcularResidual(false)
    for (var i = 0; i < this.riesgos.length; i++) {
      if (this.riesgos[i].identificacionid == this.ActualRiesgoSeleccionado.identificacionid) {         
         for (var j = 0; j < this.riesgos[i].controles.length; j++) {
            if(this.riesgos[i].controles[j].id == row.id){
              this.riesgos[i].controles.splice(j, 1);
            }
         }
       
      }
  }

  }
  console.log(this.riesgos);

  }

  deletedEvaluacion() {
  }

  setProbabilidadAndImpacto() {
    console.log(this.ActualRiesgoSeleccionado);
    this.Probabilidad=this.ActualRiesgoSeleccionado.probabilidad;
    this.Impacto=this.ActualRiesgoSeleccionado.impacto;
  }

  calcularResidual(IsAdd:boolean) {
   if (this.RiesgoResidual === '') {this.RiesgoResidual = this.RiesgoInherente}

   if(IsAdd){
    this.RiesgoResidual = this.calcularIdentidad3(this.RiesgoResidual);
   }
   else this.RiesgoResidual = this.calcularIdentidad4(this.RiesgoResidual);
   
     

  }

  cambioProbabilidadOrImpacto() {
   
   for (var i = 0; i < this.riesgos.length; i++) {
    if (this.riesgos[i].identificacionid == this.ActualRiesgoSeleccionado.identificacionid) {   
      this.riesgos[i].probabilidad=this.Probabilidad;
      this.riesgos[i].impacto=this.Impacto;
     }
   }
   const valorMatriz = this.matriz[this.calcularIdentidad(this.Probabilidad)][this.calcularIdentidad(this.Impacto)];
   this.RiesgoInherente = this.calcularIdentidad2(valorMatriz);




  }

  


}

