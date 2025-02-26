import Node from "../models/Node.js";

class LinkedList {
  constructor() {
    this.head = null;
  }

  // Método para agregar un nuevo nodo a la lista
  add(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  // Método que verifica si un nodo es elegible para jubilación (20 años o más)
  isEligible(node) {
    return node.tiempoEjercido >= 20;
  }

  // Método para obtener todos los maestros elegibles para la jubilación
  getEligibleForRetirement() {
    let current = this.head;
    const eligibleTeachers = [];
    while (current) {
      if (this.isEligible(current)) {
        eligibleTeachers.push(current);
      }
      current = current.next;
    }
    return eligibleTeachers;
  }

  // Método para eliminar un maestro por su DPI
  remove(dpi) {
    if (!this.head) return false; // Lista vacía

    // Si el nodo a eliminar es la cabeza de la lista
    if (this.head.dpi === dpi) {
      this.head = this.head.next;
      return true;
    }

    // Buscar el nodo anterior al que se desea eliminar
    let current = this.head;
    while (current.next !== null) {
      if (current.next.dpi === dpi) {
        // Se elimina el nodo, enlazando el actual con el siguiente del siguiente
        current.next = current.next.next;
        return true;
      }
      current = current.next;
    }
    return false; // No se encontró un nodo con ese DPI
  }

  printList() {
    let current = this.head;
    while (current) {
      console.log(`DPI: ${current.dpi} - Tiempo ejercido: ${current.tiempoEjercido} años`);
      current = current.next;
    }
  }


 //buscar por dpi
  search(dpi) {
    let current = this.head;
    while (current) {
      if (current.dpi === dpi) {
        return current;
      }
      current = current.next;
    }
    return null;
  }


  
}

export default LinkedList;