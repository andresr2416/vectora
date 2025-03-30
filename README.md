# BancoVectora

Este proyecto está construido para gestionar cuentas bancarias y transacciones, utilizando **Angular** en el frontend con **Angular Material** para la interfaz de usuario, y **JSON Server** para simular el backend.

## Configuración para el Desarrollo

### Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instaladas las siguientes herramientas:

- [Node.js](https://nodejs.org/en/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (gestor de paquetes de Node.js)
- [Angular CLI](https://angular.io/cli) (herramienta para crear y servir proyectos Angular)
- [JSON Server](https://github.com/typicode/json-server) (para simular el backend)

### Instalación

1. Clona el repositorio:
    ```bash
    git clone <url_del_repositorio>
    cd <nombre_del_proyecto>
    ```

2. Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

3. Instala **JSON Server** globalmente:
    ```bash
    npm install -g json-server
    ```

4. Crea un archivo `db.json` en la raíz del proyecto con los siguientes datos de ejemplo (ajusta según sea necesario):
    ```json
    {
      "accounts": [
        {
          "id": 1,
          "userId": 1,
          "accountNumber": "56781234",
          "accountType": "Corriente",
          "balance": 1000
        },
        {
          "id": 2,
          "userId": 1,
          "accountNumber": "65604815",
          "accountType": "Ahorros",
          "balance": 500
        }
      ],
      "transactions": []
    }
    ```

5. Ejecuta **JSON Server** para simular el backend:
    ```bash
    json-server --watch db.json --port 3000
    ```

6. En otra ventana de terminal, ejecuta la aplicación Angular:
    ```bash
    ng serve
    ```
    Esto ejecutará la aplicación en `http://localhost:4200`.

## Módulos y Componentes

### Módulos

1. **Dashboard (Módulo Principal)**
    - Muestra las cuentas bancarias y permite realizar transferencias de dinero entre ellas.
    - Permite ver el historial de transacciones de cada cuenta.
    
    **Componente Clave: `DashboardComponent`**:
    - Muestra un resumen de las cuentas en un **Swiper Slider** para facilitar la navegación.
    - Gestiona las transferencias de dinero y muestra las transacciones.

2. **Historial de Transacciones**
    - Muestra una lista completa de las transacciones.
    - Las transacciones se categorizan como **ingresos (ingreso)** o **gastos (gasto)** y se resaltan con diferentes colores.

    **Componente Clave: `HistorialComponent`**:
    - Muestra todas las transacciones asociadas al usuario.
    - Usa **badges** para diferenciar entre **depósitos** (verde) y **retiros** (rojo).

3. **Formulario de Transferencia**
    - Se utiliza para transferir dinero entre cuentas, generando un registro de "gasto" para la cuenta de origen y un registro de "ingreso" para la cuenta de destino.

    **Componente Clave: `TransferFormComponent`**:
    - Muestra un formulario para manejar las transferencias de dinero.
    - Genera tanto registros de "gasto" como de "ingreso".

4. **Autenticación**
    - Los usuarios deben autenticarse para acceder al Dashboard y otras funcionalidades.

    **Componente Clave: `LoginComponent`**:
    - Gestiona la autenticación de usuarios con un servicio de backend simulado (`AuthService`).

### Componentes

- **`AccountsComponent`**: Muestra la lista de cuentas disponibles para el usuario.
- **`TransferFormComponent`**: Formulario para realizar transferencias de dinero.
- **`HistorialComponent`**: Muestra el historial completo de transacciones.
- **`DashboardComponent`**: Organiza las cuentas y transacciones en la página principal.

### Lógica de las Transacciones
1. **Creación de Transacciones**:
    - Cuando se realiza una transferencia, se crean dos registros: uno para el "gasto" en la cuenta de origen y uno para el "ingreso" en la cuenta de destino.

2. **Visualización de Transacciones**:
    - Cada cuenta muestra sus transacciones, con una distinción visual entre **ingreso** (verde) y **gasto** (rojo) usando badges.

## Rutas

Las rutas están definidas en `app-routing.module.ts`, lo que permite la navegación entre las diferentes partes de la aplicación:

```typescript
export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    {
      path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],  
      children: [
        { path: 'accounts', component: AccountsComponent },  
        { path: 'history', component: HistorialComponent }, 
      ],
    },
];
```
### Guard (Protección de Rutas)
El AuthGuard se utiliza para proteger las rutas y asegurar que solo los usuarios autenticados puedan acceder al Dashboard y al historial de transacciones. Si un usuario no está autenticado, será redirigido a la página de login.

### Servicio de Autenticación: AuthService
Este servicio gestiona la autenticación del usuario y mantiene el estado de la sesión. Se usa en conjunto con el AuthGuard para validar que el usuario tenga permisos para acceder a ciertas rutas.

## AuthGuard:
Protege las rutas del dashboard y otras rutas sensibles, asegurando que solo los usuarios autenticados tengan acceso.

Servicios para el Consumo de las APIs
## AuthService:

Este servicio es responsable de la autenticación de los usuarios.

Maneja el login y la validación de credenciales.

## TransactionService:

Este servicio gestiona la creación y obtención de transacciones.

Tiene métodos como createTransaction() para registrar transacciones y getAccountMovements() para obtener las transacciones asociadas a una cuenta específica.

## AccountService:

Gestiona las cuentas del usuario.

Permite obtener todas las cuentas asociadas a un usuario y realizar actualizaciones sobre ellas.

