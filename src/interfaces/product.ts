export interface Product {
  _id: string;
  reference: string;
  description: string;
  size: string[];
  color: string;
  price: string; 
  category1: string;
  category2: string;
  type: string;
  features: {
    espalda_semicubierta: boolean;
    senos_libres: boolean;
    cargaderas_removibles: boolean;
    refuerzo_abdominal: boolean;
    banda_levanta_gluteos: boolean;
    cierre_inferior: boolean;
  };
}