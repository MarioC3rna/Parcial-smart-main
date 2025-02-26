 

 // Clase Admin que hereda de la clase User y tiene métodos para agregar, eliminar y ver maestros en la lista
 // Solo se puede acceder a estos métodos si el usuario es un administrador y tiene el user y la contraseña correctos
export default class Admin {
    constructor(name) {
      this.name = name;
      this.role = "admin";
    }
  
    // Este metodo le permite al administrador agregar un maestro a la lista 
    addTeacher(linkedList, teacherData) {
      linkedList.insert(teacherData);
      console.log(`El administrador ${this.name} agregó un maestro.`);
    }
  
    // Método para eliminar un maestro de la lista por DPI
    removeTeacher(linkedList, dpi) {
      linkedList.delete(dpi);
      console.log(`El administrador ${this.name} eliminó un maestro con DPI ${dpi}.`);
    }

    // Método para ver la lista de maestros
  viewTeachers(linkedList) {
    linkedList.display();
  }

  }
  