


// Clase Viewer al momento de ingresar al sistemas como viewer solo podrá buscarse ellos mediante su DPI y ver su información
// y si no se encuentra el DPI se mostrará un mensaje de que no se encontró ningún maestro con ese DPI
export default class Viewer {
    constructor(name) {
      this.name = name;
      this.role = "viewer";
    }
    
    // Este metodo se encarga de buscar un maestro por su DPI en la lista
    search(linkedList, dpi) {

      //Validar los argumentos de entrada para evitar errores comunes
      if (!linkedList || typeof linkedList.search !== 'function') {
        throw new Error('Se requiere una lista enlazada válida');
      }
      
      if (!dpi) {
        throw new Error('Se requiere un DPI válido');
      }
      
      // Buscar el maestro en la lista enlazada mediante el DPI 

      const teacher = linkedList.search(dpi);
      
      // Retornar el resultado (sin console.log)
      return teacher;
    }
    
    // El displaySearchResult se encarga de mostrar el resultado de la busqueda, si el maestro fue encontrado o no
    displaySearchResult(teacher, dpi) {
      if (teacher) {
        console.log(`Maestro encontrado:`, teacher);
      } else {
        console.log(`No se encontró ningún maestro con DPI ${dpi}`);
      }
      return teacher;
    }
  }