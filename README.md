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

##Funcionalidades QuickMeal
1. Login
Permite iniciar sesión con una cuenta registrada.
Usuarios: Todos (clientes y POS)

2. Registro (Signup)
Permite crear una nueva cuenta proporcionando los datos requeridos.
Usuarios: Nuevos usuarios

3. Vista de Restaurantes / Puntos de Servicio
Muestra una lista de restaurantes y puntos de servicio disponibles en la universidad, con horarios y fotos.
Usuarios: Clientes y POS

4. Consulta de Menú
Al seleccionar un restaurante, se muestra el menú con productos, precios y stock disponible.
Usuarios: Clientes

5. Carrito de Compras
Permite agregar productos, modificar cantidades, eliminar productos y ver el total.
Usuarios: Clientes

6. Realizar Pedido
Permite confirmar el pedido, seleccionar lugar y hora de entrega, y método de pago (efectivo o tarjeta).
Usuarios: Clientes

7. Seguimiento de Pedido
Muestra el estado del pedido: pendiente, listo o entregado. También permite cancelar antes de ser preparado.
Usuarios: Clientes

8. Calificación de Pedido
Permite calificar la experiencia una vez entregado el pedido.
Usuarios: Clientes

9. Gestión de Productos (POS)
Permite agregar, editar y eliminar productos del menú.
Usuarios: POS

10. Gestión de Pedidos (POS)
Permite ver pedidos pendientes y listos, y marcar como "listo" o "entregado".
Usuarios: POS

11. Historial de Pedidos
Permite consultar pedidos anteriores.
Usuarios: Clientes

12. Perfil de Usuario
Permite ver y editar la información personal.
Usuarios: Clientes y POS
