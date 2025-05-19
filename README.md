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

# 📱 Funcionalidades – QuickMeal

---

### 1. **Login**
Permite iniciar sesión con una cuenta registrada.  
**Usuarios:** Todos (clientes y POS)

---

### 2. **Registro (Signup)**
Permite crear una nueva cuenta proporcionando los datos requeridos.  
**Usuarios:** Nuevos usuarios

---

### 3. **Vista de Restaurantes / Puntos de Servicio**
Muestra una lista de restaurantes y puntos de servicio disponibles en la universidad, con horarios y fotos.  
**Usuarios:** Clientes y POS

---

### 4. **Consulta de Menú**
Al seleccionar un restaurante, se muestra el menú con productos, precios y stock disponible.  
**Usuarios:** Clientes

---

### 5. **Carrito de Compras**
Permite agregar productos, modificar cantidades, eliminar productos y ver el total.  
**Usuarios:** Clientes

---

### 6. **Realizar Pedido**
Permite confirmar el pedido, seleccionar lugar y hora de entrega, y método de pago (efectivo o tarjeta).  
**Usuarios:** Clientes

---

### 7. **Seguimiento de Pedido**
Muestra el estado del pedido: pendiente, listo o entregado. También permite cancelar antes de ser preparado.  
**Usuarios:** Clientes

---

### 8. **Calificación de Pedido**
Permite calificar la experiencia una vez entregado el pedido.  
**Usuarios:** Clientes

---

### 9. **Gestión de Productos (POS)**
Permite agregar, editar y eliminar productos del menú.  
**Usuarios:** POS

---

### 10. **Gestión de Pedidos (POS)**
Permite ver pedidos pendientes y listos, y marcar como "listo" o "entregado".  
**Usuarios:** POS

---

### 11. **Historial de Pedidos**
Permite consultar pedidos anteriores.  
**Usuarios:** Clientes

---

### 12. **Perfil de Usuario**
Permite ver y editar la información personal.  
**Usuarios:** Clientes y POS

## ☁️ ¿Por qué usamos Firebase en QuickMeal?

Firebase es una plataforma backend-as-a-service (BaaS) que nos permite desarrollar aplicaciones modernas de forma rápida, segura y escalable. En **QuickMeal**, Firebase nos ofrece varias ventajas clave:

### 🔐 Autenticación Segura y Rápida
Usamos **Firebase Authentication** para gestionar el acceso de usuarios (clientes y POS) de forma sencilla y segura, permitiendo iniciar sesión con correo electrónico y contraseña.

### 📦 Firestore: Base de Datos en Tiempo Real
Utilizamos **Cloud Firestore** para almacenar datos como productos, menús, pedidos y usuarios. Su arquitectura basada en documentos y colecciones permite:
- Acceso rápido y estructurado a los datos.
- Sincronización en tiempo real entre clientes y puntos de servicio.
- Escalabilidad automática según el volumen de datos o usuarios.

### 🧩 Estructura Flexible con Arreglos de Objetos
Los productos en pedidos se almacenan como **arreglos compuestos modificables**, es decir, como arrays de objetos.  
Esto nos permite:
- Guardar varios productos en un solo pedido de forma compacta.
- Leer, modificar o eliminar productos fácilmente.
- Consultar el historial o el detalle de pedidos sin necesidad de múltiples referencias.

### 📄 Ejemplo de documento de pedido en Firestore

```json
{
  "id": "cJMHqQWCHV18KNvGbu2I",
  "nombre": "Huevos pochados con queso",
  "categoria": "Desayuno",
  "img": "https://via.placeholder.com/120",
  "cantidad": 4,
  "price": 9100,
  "quantity": 1,
  "total": 9100,
  "proveedor": "Restaurante Escuela",
  "userId": "8X55GlwouCOFyyzPXsU7W0crDqp1",
  "createdAt": "18 de mayo de 2025, 10:57:41 p.m.",
  "deliveryLocation": "AdPortas",
  "deliveryTime": "11:11",
  "paymentMethod": "cash",
  "rating": 0,
  "status": "entregado"
}

