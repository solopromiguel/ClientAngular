import { Component, OnInit } from '@angular/core';
import { DatingService } from '../../_service/dating.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CRUDComponent implements OnInit {

  constructor(private _datingService: DatingService) { }
  selectedCargo: '';
  selectedPeriodicidad: '';
  selectedOportunidad: '';
  selectedGrado: '';
  selectedFormalizacion: '';
  modelControl: any = {};
  cargos: any[] = [
    { value: 'SISTEMA SOFIA', viewValue: 'SISTEMA SOFIA' },
    { value: 'ASISTENTE DE CUMPLIMIENTO', viewValue: 'ASISTENTE DE CUMPLIMIENTO' },
    { value: 'OTRA AREA', viewValue: 'OTRA AREA' },
   
  ];

  periodicidads: any[] = [
    { value: 'DIARIAMENTE', viewValue: 'DIARIAMENTE' },
    { value: 'MENSUAL', viewValue: 'MENSUAL' },
    { value: 'SEMANAL', viewValue: 'SEMANAL' },
    { value: 'ANUAL', viewValue: 'ANUAL' },
    { value: 'EVENTUAL', viewValue: 'EVENTUAL' }
  ];

  oportunidades: any[] = [
    { value: 'DETECTIVO', viewValue: 'DETECTIVO' },
    { value: 'PREVENTIVO', viewValue: 'PREVENTIVO' },
    
  ];

  grados: any[] = [
    { value: 'MANUAL', viewValue: 'MANUAL' },
    { value: 'SEMI-AUTOMATICO', viewValue: 'SEMI-AUTOMATICO' },
    { value: 'AUTOMATICO', viewValue: 'AUTOMATICO' },

  ];

  formalizaciones: any[] = [
    { value: 'DOCUMENTADO', viewValue: 'DOCUMENTADO' },
    { value: 'NO DOCUMENTADO', viewValue: 'NO DOCUMENTADO' },
    
  ];

  factores: any[] = [
    { value: 'CLIENTES', viewValue: 'CLIENTES' },
    { value: 'PRODUCTOS Y/O SERVICIOS', viewValue: 'PRODUCTOS Y/O SERVICIOS' },
    { value: 'ZONA GEOGRAFICA', viewValue: 'ZONA GEOGRAFICA' },
   
  ];


  ngOnInit() {
  }

  guardarControl(){

   const control={
    Cargo: this.selectedCargo,
    Formalizacion: this.selectedFormalizacion,
    Grado: this.selectedCargo,
    Oportunidad: this.selectedOportunidad,
    Periodicidad: this.selectedPeriodicidad
   }

   this._datingService.AddControl(control).subscribe(
    data => {
      console.log('Exito');
    },
    error => {
     
      console.log(error);
    },
    () => {
      console.log();
    }
  );

  }

}
