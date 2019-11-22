import { Riesgo } from './Riesgo';

export interface EtapaIdentificacion {
    area: string;
    descripcion: string;
    nombre: string;
    riesgos?: Riesgo[];
  }