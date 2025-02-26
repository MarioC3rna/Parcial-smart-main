
// Clase que representa un nodo de la lista enlazada de maestros
//donde se almacena la información de cada maestro
//Declaramos las propiedades de la clase y dejamos "" como valor por defecto para DPI y nombre y puedan agregarse sin problemas

class Node{
     
  constructor(data = {}){
     this.dpi = data.dpi || "";
     this.nombre = data.nombre || "";
     this.puestodetrabajo = data.puesto || "";
     this.codigodetrabajo = data.codigodetrabajo || "";
     this.NivelDeEscalafon = data.NivelDeEscalafon || "";
     this.sueldo = data.sueldo || 0;
     this.tiempoEjercido = data.tiempoEjercido || 0;
     this.lugaresDeTrabajo = data.lugaresDeTrabajo || [];
     this.presupuestada = data.presupuestada || false;
     this.next = null;
  }
}

export default Node;