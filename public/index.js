/**
 * @fileoverview Sistema de Gestión de Maestros y Jubilaciones
 * @version 1.0.0
 * @author Equipo de Desarrollo
 * @description Sistema que permite la gestión de información de docentes,
 * con funcionalidades específicas para el cálculo y seguimiento de jubilaciones.
 */

import LinkedList from '../controllers/LinkedList.js';
import Node from '../models/Node.js';
import Admin from '../users/Admin.js';
import Viewer from '../users/Viewer.js';

/**
 * Configuración de credenciales del sistema
 * @const {Object} ENV - Almacena las credenciales de acceso
 */
const ENV = {
  ADMIN_USERNAME: 'admin',
  ADMIN_PASSWORD: '123',
  VIEWER_USERNAME: 'maestro',
  VIEWER_PASSWORD: '123'
};

/**
 * Lista enlazada que almacena todos los registros de maestros
 * @type {LinkedList}
 */
const teachersList = new LinkedList();

/**
 * Variable que almacena el usuario actual en sesión
 * @type {Admin|Viewer|null}
 */
let currentUser = null;

/**
 * Arreglo para almacenar temporalmente los lugares de trabajo durante el registro
 * @type {Array<string>}
 */
let workplaces = [];

/**
 * Autentica al usuario basado en sus credenciales
 * @param {string} username - Nombre de usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Admin|Viewer|null} Instancia del usuario autenticado o null si las credenciales son inválidas
 */
function authenticateUser(username, password) {
  if (username === ENV.ADMIN_USERNAME && password === ENV.ADMIN_PASSWORD) {
    return new Admin(username);
  }
  
  if (username === ENV.VIEWER_USERNAME && password === ENV.VIEWER_PASSWORD) {
    return new Viewer(username);
  }
  
  return null;
}

/**
 * Oculta todos los paneles y formularios del sistema
 */
function hideAllPanels() {
  document.querySelectorAll('.login-form, .admin-panel, .viewer-panel, #add-teacher-form, #remove-teacher-form, #search-teacher-form, #eligible-teachers-result, #viewer-search-form, #result-area, #viewer-result-area').forEach(el => {
    el.classList.add('hidden');
  });
}

/**
 * Muestra el panel de administrador
 */
function showAdminPanel() {
  hideAllPanels();
  document.getElementById('admin-panel').classList.remove('hidden');
  document.getElementById('admin-menu').classList.remove('hidden');
}

/**
 * Muestra el panel de visualizador
 */
function showViewerPanel() {
  hideAllPanels();
  document.getElementById('viewer-panel').classList.remove('hidden');
  document.getElementById('viewer-menu').classList.remove('hidden');
}

/**
 * Genera una tabla HTML con los datos del maestro
 * @param {Object} teacher - Objeto con información del maestro
 * @returns {string} HTML con los datos formateados del maestro
 */
function createTeacherTable(teacher) {
  if (!teacher) return '<p>No se encontró ningún maestro con ese DPI.</p>';
  
  // Formatear lugares de trabajo como una lista
  let workplacesHtml = '';
  if (teacher.lugaresDeTrabajo && teacher.lugaresDeTrabajo.length > 0) {
    workplacesHtml = '<ul class="workplaces-list">';
    teacher.lugaresDeTrabajo.forEach(place => {
      workplacesHtml += `<li>${place}</li>`;
    });
    workplacesHtml += '</ul>';
  } else {
    workplacesHtml = '<p>No hay lugares de trabajo registrados</p>';
  }
  
  return `
    <div class="teacher-details">
      <h3>${teacher.nombre}</h3>
      <table class="teacher-info-table">
        <tr>
          <th>DPI</th>
          <td>${teacher.dpi}</td>
        </tr>
        <tr>
          <th>Nombre</th>
          <td>${teacher.nombre}</td>
        </tr>
        <tr>
          <th>Tiempo Ejercido</th>
          <td>${teacher.tiempoEjercido} años</td>
        </tr>
        <tr>
          <th>Elegible para Jubilación</th>
          <td>${teacher.tiempoEjercido >= 20 ? 
            '<span class="eligible">Sí</span>' : 
            '<span class="not-eligible">No</span>'}</td>
        </tr>
        <th>Monto de Jubilación</th>
          <td>${teacher.tiempoEjercido >= 20 ? 
            '<span class="eligible">Q2,000.00</span>' : 
            '<span class="not-eligible">No aplica</span>'}</td>

        <tr>
          <th>Puesto de Trabajo</th>
          <td>${teacher.puestodetrabajo || 'No especificado'}</td>
        </tr>
        <tr>
          <th>Código de Trabajo</th>
          <td>${teacher.codigodetrabajo || 'No especificado'}</td>
        </tr>
        <tr>
          <th>Nivel de Escalafón</th>
          <td>${teacher.NivelDeEscalafon || 'No especificado'}</td>
        </tr>
        <tr>
          <th>Sueldo</th>
          <td>Q${teacher.sueldo ? teacher.sueldo.toFixed(2) : '0.00'}</td>
        </tr>
        <tr>
          <th>Plaza Presupuestada</th>
          <td>${teacher.presupuestada ? 'Sí' : 'No'}</td>
        </tr>
        <tr>
          <th>Lugares de Trabajo</th>
          <td>${workplacesHtml}</td>
        </tr>
      </table>
    </div>
  `;
}

// ============== GESTIÓN DE EVENTOS ==============

/**
 * Evento de inicio de sesión
 * Valida las credenciales y muestra el panel correspondiente
 */
document.getElementById('login-button').addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  currentUser = authenticateUser(username, password);
  
  if (currentUser) {
    if (currentUser.role === 'admin') {
      showAdminPanel();
    } else if (currentUser.role === 'viewer') {
      showViewerPanel();
    }
  } else {
    document.getElementById('login-error').classList.remove('hidden');
  }
});

// ============== PANEL DE ADMINISTRADOR ==============

/**
 * Eventos para las opciones del menú de administrador
 * Cada opción muestra el formulario o panel correspondiente
 */
document.getElementById('add-teacher-option').addEventListener('click', () => {
  hideAllPanels();
  document.getElementById('admin-panel').classList.remove('hidden');
  document.getElementById('add-teacher-form').classList.remove('hidden');
});

document.getElementById('remove-teacher-option').addEventListener('click', () => {
  hideAllPanels();
  document.getElementById('admin-panel').classList.remove('hidden');
  document.getElementById('remove-teacher-form').classList.remove('hidden');
});

document.getElementById('search-teacher-option').addEventListener('click', () => {
  hideAllPanels();
  document.getElementById('admin-panel').classList.remove('hidden');
  document.getElementById('search-teacher-form').classList.remove('hidden');
});

/**
 * Muestra la lista de maestros elegibles para jubilación
 */
document.getElementById('eligible-teachers-option').addEventListener('click', () => {
  hideAllPanels();
  document.getElementById('admin-panel').classList.remove('hidden');
  document.getElementById('eligible-teachers-result').classList.remove('hidden');
  
  // Obtener maestros elegibles
  const eligibleTeachers = teachersList.getEligibleForRetirement();
  const resultElement = document.getElementById('eligible-teachers-list');
  
  if (eligibleTeachers.length === 0) {
    resultElement.innerHTML = '<p>No hay maestros elegibles para jubilación.</p>';
  } else {
    let tableHTML = `
      <table class="eligible-teachers-table">
        <thead>
          <tr>
            <th>DPI</th>
            <th>Nombre</th>
            <th>Tiempo Ejercido</th>
            <th>Nivel de Escalafón</th>
            <th>Sueldo</th>
            <th>Monto de Jubilación</th>
            <th>Plaza Presupuestada</th>
            <th>Lugares de Trabajo</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    eligibleTeachers.forEach(teacher => {
      // Formatear lugares de trabajo como una lista
      let workplacesHtml = '';
      if (teacher.lugaresDeTrabajo && teacher.lugaresDeTrabajo.length > 0) {
        workplacesHtml = '<ul class="workplaces-list-small">';
        teacher.lugaresDeTrabajo.forEach(place => {
          workplacesHtml += `<li>${place}</li>`;
        });
        workplacesHtml += '</ul>';
      } else {
        workplacesHtml = 'No registrados';
      }
      
      tableHTML += `
        <tr>
          <td>${teacher.dpi}</td>
          <td>${teacher.nombre}</td>
          <td>${teacher.tiempoEjercido} años</td>
          <td>${teacher.NivelDeEscalafon || 'No especificado'}</td>
          <td>Q${teacher.sueldo ? teacher.sueldo.toFixed(2) : '0.00'}</td>
          <td><span class="eligible">Q2,000.00</span></td>
          <td>${teacher.presupuestada ? 'Sí' : 'No'}</td>
          <td>${workplacesHtml}</td>
        </tr>
      `;
    });
    
    tableHTML += '</tbody></table>';
    resultElement.innerHTML = tableHTML;
  }
});

/**
 * Cierra la sesión actual
 */
document.getElementById('logout-option').addEventListener('click', () => {
  currentUser = null;
  hideAllPanels();
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  document.getElementById('login-error').classList.add('hidden');
});

// ============== FUNCIONALIDADES DE ADMINISTRACIÓN ==============

/**
 * Gestiona la adición de un nuevo maestro al sistema
 */
document.getElementById('add-teacher-button').addEventListener('click', () => {
  const dpi = document.getElementById('teacher-dpi').value;
  const nombre = document.getElementById('teacher-name').value;
  const tiempoEjercido = parseInt(document.getElementById('teacher-time').value);
  
  // Nuevos campos a recoger
  const puesto = document.getElementById('teacher-position').value;
  const codigodetrabajo = document.getElementById('teacher-code').value;
  const NivelDeEscalafon = document.getElementById('teacher-level').value;
  const sueldo = parseFloat(document.getElementById('teacher-salary').value) || 0;
  const presupuestada = document.getElementById('teacher-budget').checked;
  
  if (!dpi || !nombre || isNaN(tiempoEjercido)) {
    alert('Por favor complete todos los campos correctamente.');
    return;
  }
  
  const newTeacher = new Node({
    dpi: dpi,
    nombre: nombre,
    tiempoEjercido: tiempoEjercido,
    puesto: puesto,
    codigodetrabajo: codigodetrabajo,
    NivelDeEscalafon: NivelDeEscalafon,
    sueldo: sueldo,
    lugaresDeTrabajo: workplaces, // Usar la variable global workplaces
    presupuestada: presupuestada
  });
    
  teachersList.add(newTeacher);
  
  const resultArea = document.getElementById('result-area');
  resultArea.innerHTML = `<p>Maestro "${nombre}" agregado exitosamente.</p>`;
  resultArea.classList.remove('hidden');
  
  // Limpiar formulario
  document.getElementById('teacher-dpi').value = '';
  document.getElementById('teacher-name').value = '';
  document.getElementById('teacher-time').value = '';
  document.getElementById('teacher-position').value = '';
  document.getElementById('teacher-code').value = '';
  document.getElementById('teacher-level').value = '';
  document.getElementById('teacher-salary').value = '';
  document.getElementById('teacher-budget').checked = false;
  
  // Limpiar los lugares de trabajo
  workplaces = [];
  document.getElementById('workplaces-container').innerHTML = '';
});

/**
 * Gestiona la adición de lugares de trabajo para un maestro
 */
document.getElementById('add-workplace').addEventListener('click', () => {
  const workplace = document.getElementById('teacher-workplace').value.trim();
  if (workplace) {
    workplaces.push(workplace);
    
    // Actualizar la vista de lugares de trabajo
    const container = document.getElementById('workplaces-container');
    const workplaceElement = document.createElement('div');
    workplaceElement.className = 'workplace-item';
    
    const workplaceText = document.createElement('span');
    workplaceText.textContent = workplace;
    
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-button';
    removeButton.innerHTML = '✕';
    removeButton.onclick = () => {
      const index = workplaces.indexOf(workplace);
      if (index !== -1) {
        workplaces.splice(index, 1);
      }
      workplaceElement.remove();
    };
    
    workplaceElement.appendChild(workplaceText);
    workplaceElement.appendChild(removeButton);
    container.appendChild(workplaceElement);
    
    // Limpiar el campo
    document.getElementById('teacher-workplace').value = '';
  }
});

/**
 * Gestiona la eliminación de maestros por DPI
 */
document.getElementById('remove-teacher-button').addEventListener('click', () => {
  const dpi = document.getElementById('remove-dpi').value;
  
  if (!dpi) {
    alert('Por favor ingrese un DPI válido.');
    return;
  }
  
  const success = teachersList.remove(dpi);
  
  const resultArea = document.getElementById('result-area');
  if (success) {
    resultArea.innerHTML = `<p>Maestro con DPI "${dpi}" eliminado exitosamente.</p>`;
  } else {
    resultArea.innerHTML = `<p>No se encontró ningún maestro con DPI "${dpi}".</p>`;
  }
  resultArea.classList.remove('hidden');
  
  // Limpiar formulario
  document.getElementById('remove-dpi').value = '';
});

/**
 * Gestiona la búsqueda de maestros para el administrador
 */
document.getElementById('search-teacher-button').addEventListener('click', () => {
  const dpi = document.getElementById('search-dpi').value;
  
  if (!dpi) {
    alert('Por favor ingrese un DPI válido.');
    return;
  }
  
  const teacher = teachersList.search(dpi);
  
  const resultArea = document.getElementById('result-area');
  resultArea.innerHTML = createTeacherTable(teacher);
  resultArea.classList.remove('hidden');
});

// ============== PANEL DE VISUALIZADOR ==============

/**
 * Gestiona la búsqueda de maestros para el visualizador
 */
document.getElementById('viewer-search-button').addEventListener('click', () => {
  const dpi = document.getElementById('viewer-search-dpi').value;
  
  if (!dpi) {
    alert('Por favor ingrese un DPI válido.');
    return;
  }
  
  const teacher = teachersList.search(dpi);
  
  const resultArea = document.getElementById('viewer-result-area');
  resultArea.innerHTML = createTeacherTable(teacher);
  resultArea.classList.remove('hidden');
});

/**
 * Eventos para las opciones del menú de visualizador
 */
document.getElementById('viewer-search-option').addEventListener('click', () => {
  hideAllPanels();
  document.getElementById('viewer-panel').classList.remove('hidden');
  document.getElementById('viewer-search-form').classList.remove('hidden');
});

document.getElementById('viewer-logout-option').addEventListener('click', () => {
  currentUser = null;
  hideAllPanels();
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  document.getElementById('login-error').classList.add('hidden');
});

/**
 * Muestra información específica de jubilación para el visualizador
 * @note Requiere corrección: userDPI no está definido en el código actual
 */
document.getElementById('viewer-retirement-option').addEventListener('click', () => {
  hideAllPanels();
  document.getElementById('viewer-panel').classList.remove('hidden');
  
  // NOTA: Hay un error aquí, userDPI no está definido
  const teacher = teachersList.search(userDPI);
  
  const resultArea = document.getElementById('viewer-result-area');
  resultArea.innerHTML = createTeacherTable(teacher);
  resultArea.classList.remove('hidden');
});

/**
 * Gestiona los botones de retorno en los formularios
 */
document.querySelectorAll('.back-button').forEach(button => {
  button.addEventListener('click', () => {
    if (currentUser.role === 'admin') {
      showAdminPanel();
    } else {
      showViewerPanel();
    }
  });
});