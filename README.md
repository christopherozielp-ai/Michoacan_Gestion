# 🍨 Michoacana Gestión

> **Sistema Integral de Administración y Punto de Venta (POS)** diseñado especialmente para paleterías y neverías artesanales mexicanas. Optimiza el control operativo, inventarios, cobros y auditoría con una experiencia visual moderna, fluida y adaptada a cada nivel de usuario.

---

## 📋 Tabla de Contenidos
- [Características Principales](#-características-principales)
- [Funcionalidades Actuales](#-funcionalidades-actuales)
  - [Módulo de Autenticación Multirrol](#1-módulo-de-autenticación-multirrol)
- [Credenciales de Demostración](#-credenciales-de-demostración-demo)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Puesta en Marcha](#-instalación-y-puesta-en-marcha)
- [Próximos Módulos (Roadmap)](#-próximos-módulos-roadmap)

---

## ✨ Características Principales

- 🎯 **Control de Acceso Basado en Roles (RBAC):** Flujos y vistas adaptadas a las responsabilidades de cada miembro del equipo.
- ⚡ **Reactividad con Angular Signals:** Manejo de estado moderno, eficiente y sin sobrecarga de suscripciones manuales.
- 📝 **Formularios Dinámicos y Validados:** Cambio automático de campos y reglas de validación en tiempo real según el rol seleccionado.
- 🎨 **Diseño e Identidad Artesanal:** Interfaz atractiva y responsiva inspirada en la tradición nevera mexicana (tonos fresa, pistache, cremas) con animaciones y microinteracciones de alta calidad.
- 💾 **Persistencia Inteligente de Sesión:** Selección flexible entre `sessionStorage` (cierre al salir) o `localStorage` mediante la casilla *"Recordarme"*.

---

## 🚀 Funcionalidades Actuales

### 1. Módulo de Autenticación Multirrol (`/login`)
El sistema cuenta con una pantalla de inicio de sesión inteligente que se transforma según el tipo de usuario:

#### 👑 Rol: Dueño (Administrador General)
- **Acceso:** Correo electrónico institucional y contraseña segura.
- **Enfoque:** Visión global del negocio, reportes financieros, auditorías y configuración de sucursales.
- **Validaciones:** Formato de email corporativo obligatorio y longitud mínima de contraseña de 6 caracteres.

#### 👔 Rol: Gerente de Sucursal
- **Acceso:** ID de Empleado (clave alfanumérica) y contraseña de gestión.
- **Enfoque:** Supervisión de inventarios de paletas/nieves, insumos, asignación de turnos y aprobación de cortes de caja.
- **Validaciones:** Código de empleado con formato específico (`GER-XXX`) y contraseña segura.

#### 🍦 Rol: Cajero / Despachador
- **Acceso Rápido:** ID de Empleado y **PIN numérico de 4 dígitos**.
- **Enfoque:** Agilidad máxima en mostrador, apertura y cierre rápido de caja sin necesidad de teclados complejos.
- **Validaciones:** Expresión regular para exactamente 4 dígitos numéricos (`^[0-9]{4}$`).

---

## 🔑 Credenciales de Demostración (Demo)

Para pruebas locales y evaluación, puedes utilizar las siguientes cuentas precargadas:

| Rol | Campo Identificador | Clave / PIN | Tiempo de Sesión |
| :--- | :--- | :--- | :--- |
| **Dueño** | `admin@michoacana.com` | `123456` | 24 Horas |
| **Gerente** | `GER-101` | `gerente123` | 8 Horas |
| **Cajero** | `CAJ-201` | `1234` | 12 Horas (Turno) |

---

## 🛠️ Stack Tecnológico

- **Frontend Core:** [Angular 22+](https://angular.dev/) (Standalone Components, Signals API, Control Flow Syntax)
- **Lenguaje:** [TypeScript 5+](https://www.typescriptlang.org/)
- **Formularios:** Angular Reactive Forms con validaciones dinámicas
- **Rutas:** Angular Router (SPA)
- **Estilos:** CSS3 nativo moderno con variables personalizadas, animaciones suaves y diseño responsive
- **Testing:** [Vitest](https://vitest.dev/)
- **Bundler & Build Tool:** Angular Build CLI con esbuild

---

## 📂 Estructura del Proyecto

```text
Michoacana_Gestion/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── login/                 # Componente de acceso multirrol
│   │   │       ├── login.component.ts   # Lógica reactiva (Signals, validadores)
│   │   │       ├── login.component.html # Maquetación accesible con tabs
│   │   │       └── login.component.css  # Paleta de colores e identidad visual
│   │   ├── app.config.ts              # Configuración de proveedores y rutas
│   │   ├── app.routes.ts              # Mapeo de rutas de la aplicación
│   │   ├── app.html                   # Contenedor raíz (<router-outlet>)
│   │   └── app.ts                     # Componente principal
│   ├── index.html                     # Entrada HTML base
│   ├── styles.css                     # Tokens de diseño globales y reset
│   └── main.ts                        # Bootstrap de la app
├── package.json                       # Dependencias y scripts del proyecto
├── angular.json                       # Configuración de compilación Angular
└── README.md                          # Documentación del proyecto
```

---

## 💻 Instalación y Puesta en Marcha

### Prerrequisitos
- **Node.js** versión 20.x o superior
- **npm** versión 10.x o superior

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/christopherozielp-ai/Michoacan_Gestion.git
   cd Michoacan_Gestion
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm start
   # o bien: ng serve
   ```

4. **Abrir en el navegador:**
   Visita [http://localhost:4200/](http://localhost:4200/) para ver la aplicación en funcionamiento.

---

## 🗺️ Próximos Módulos (Roadmap)

- [ ] **Punto de Venta (POS):** Catálogo interactivo de sabores de agua, paletas (agua/leche), nieves y preparados (esquites, nachos) con cálculo instantáneo de cambio.
- [ ] **Control de Inventario y Mermas:** Registro de botes de nieve abiertos, paletas descongeladas y pedidos a fábrica.
- [ ] **Arqueo y Corte de Caja:** Control de entradas/salidas de efectivo, fondo de caja y reporte para corte X y Z.
- [ ] **Módulo de Sucursales:** Vista consolidada multi-tienda exclusiva para el rol de Dueño.
- [ ] **Tickets e Impresión:** Generación de recibos digitales y conexión con impresoras térmicas ESC/POS.

---

Desarrollado con ❤️ para impulsar la administración moderna de negocios artesanales.
