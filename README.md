# QuickMeal - Sistema de Inventario y Pedidos para Puntos de Venta Universitarios

## Descripción

**QuickMeal** es una aplicación web fullstack desarrollada para la Universidad de La Sabana. Permite a estudiantes y personal consultar inventario, precios y realizar pedidos en tiempo real en los puntos de venta de alimentos y bebidas del campus. Los encargados de cada punto pueden gestionar su inventario y pedidos de manera eficiente, optimizando la operación diaria y reduciendo filas.

---

## Características Principales

### Perfil Cliente
- Consulta de productos y precios en tiempo real.
- Búsqueda y filtrado de productos.
- Realización y seguimiento de pedidos online.
- Historial de compras y calificación de productos.

### Perfil POS (Punto de Venta)
- Gestión completa de inventarios y precios.
- Actualización de stock en tiempo real.
- Registro, edición y eliminación de productos.
- Confirmación y procesamiento de pedidos.
- Notificaciones para cambios en inventario y pedidos.

---

## Tecnologías Utilizadas

- **Frontend:** React.js (Vite), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Base de Datos y Notificaciones:** Firebase (Firestore)
- **Autenticación:** Firebase Auth, JWT, bcrypt
- **Despliegue:** Vercel

## Estructura del Proyecto 
AppQM/
├── .gitignore
├── package.json
├── vite.config.js
├── vercel.json
├── public/
│   └── index.html
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── Firebase.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── components/
│   │   ├── HeaderBar.jsx
│   │   ├── OrderHistory.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProductListManagement.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── RoleProtectedRoute.jsx
│   │   ├── POSProtectedRoute.jsx
│   │   ├── ShoppingCart.jsx
│   │   ├── UserProfile.jsx
│   │   ├── UserProfilePOS.jsx
│   │   ├── ServicePoints.jsx
│   │   ├── uploadServicePoints.js
│   │   ├── login/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup2.jsx
│   │   │   ├── Welcome.jsx
│   │   │   ├── WelcomePOS.jsx
│   │   │   └── Assets/
│   │   │       └── ... (imágenes y recursos)
└── README.md
