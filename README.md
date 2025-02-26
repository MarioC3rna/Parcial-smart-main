# Sistema de Gestión de Maestros - Módulo de Jubilación 🎓

![Jubilación Banner](https://img.shields.io/badge/Sistema-Gestión_de_Maestros-blue)
![Versión](https://img.shields.io/badge/Versión-1.0.0-green)
![Estado](https://img.shields.io/badge/Estado-Producción-success)

## 📋 Descripción General

Este sistema permite administrar información de maestros, con un enfoque especial en el **cálculo y gestión de jubilaciones**. La plataforma facilita el seguimiento de elegibilidad para jubilación, así como la visualización de beneficios asociados para el personal docente.

---

## ✨ Características Principales

### 👥 Gestión de Usuarios
| Tipo de Usuario | Acceso | Credenciales |
|---|---|---|
| **Administrador** | Acceso completo | usuario: `admin`, contraseña: `123` |
| **Visualizador** | Acceso limitado a consultas | usuario: `maestro`, contraseña: `123` |

### 🛠️ Funcionalidades del Administrador

- ➕ **Agregar maestros** con información completa:
  * DPI (Documento Personal de Identificación)
  * Nombre completo
  * Tiempo ejercido como docente
  * Puesto de trabajo
  * Código de trabajo
  * Nivel de escalafón
  * Sueldo
  * Estado de plaza (presupuestada o no)
  * Lugares de trabajo (múltiples)

- ➖ **Eliminar maestros** por número de DPI
- 🔍 **Buscar maestros** específicos
- 📊 **Listar maestros elegibles para jubilación**

### 👁️ Funcionalidades del Visualizador
- 🔍 **Consultar información** de maestros por DPI
- 📝 **Ver elegibilidad para jubilación**

---

## 🏆 Sistema de Jubilación

### Criterios de Elegibilidad
```
✓ 20 años o más de tiempo ejercido como docente
```

### Beneficios
```
💰 Monto fijo de jubilación: Q2,000.00 mensuales para maestros elegibles
```

---

## 🧩 Estructura de Datos

El sistema implementa una estructura de datos de **Lista Enlazada** para almacenar y gestionar los registros de manera eficiente, permitiendo:

- 🚀 Búsqueda rápida por DPI
- ⚡ Adición y eliminación de registros sin reorganizar la estructura
- 🔍 Filtrado por criterios específicos (como elegibilidad para jubilación)

```
[ Nodo 1 ] → [ Nodo 2 ] → [ Nodo 3 ] → ... → [ Nodo N ] → null
```

---

## 💻 Tecnologías Utilizadas

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

- Programación orientada a objetos para la estructura del sistema
- Arquitectura MVC (Modelo-Vista-Controlador)
- Estructura de datos de lista enlazada para el manejo de registros

---

## 📝 Instrucciones de Uso

### Acceso al Sistema
1. Ingresar credenciales en la pantalla de inicio
2. El sistema redirige al panel correspondiente según el tipo de usuario

### Para Administradores
- Usar el menú lateral para acceder a las diferentes funcionalidades
- Para agregar un maestro, completar todos los campos requeridos y guardar
- Para añadir lugares de trabajo, usar el campo dedicado y el botón "Agregar"
- Para buscar o eliminar, utilizar el DPI como identificador único

### Para Visualizadores
- Consultar información ingresando el DPI del maestro
- Revisar la elegibilidad para jubilación y el monto correspondiente

---

## ⚙️ Captura y Validación de Datos

El sistema valida la información ingresada para garantizar la integridad de los datos:
- ❗ Campos requeridos no pueden estar vacíos
- 🔢 Valores numéricos (como tiempo ejercido y sueldo) deben ser números válidos

---

## 📊 Ejemplo de Visualización de Datos

| DPI | Nombre | Tiempo Ejercido | Elegible | Monto Jubilación |
|-----|--------|----------------|----------|------------------|
| 1234567890123 | Juan Pérez | 22 años | ✅ Sí | Q2,000.00 |
| 9876543210987 | María López | 18 años | ❌ No | No aplica |
| 4567891230456 | Carlos Gómez | 25 años | ✅ Sí | Q2,000.00 |

---

<div align="center">
  <p>© 2025 Sistema de Gestión de Maestros</p>
  <p>Desarrollado para la gestión eficiente de información docente</p>
</div>

Código similar encontrado con 3 tipos de licencias