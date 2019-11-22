import { ControlRiesgo } from './ControlRiesgo';

export interface Riesgo {
   id :number;
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