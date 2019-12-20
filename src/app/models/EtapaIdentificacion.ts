import { Riesgo } from './Riesgo';

export interface EtapaIdentificacion {
    area: string;
    descripcion: string;
    Nombre: string;
    riesgos?: Riesgo[];
  }