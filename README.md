#  Sistema de gestión para barberías ✂️ — Full Stack Web App 
Desarrollé una aplicación web full stack orientada a la gestión interna de barberías con múltiples sucursales, cubriendo el ciclo completo desde el backend hasta el frontend.
## 🔹 Backend — Node.js + Express + Prisma(ORM) + MySQL
Diseñé e implementé una REST API siguiendo una arquitectura en capas (Controller → Service → Repository), separando claramente las responsabilidades de cada capa. Utilicé Prisma ORM para el acceso a datos y la gestión de migraciones sobre una base de datos MySQL.
Implementé autenticación stateless con JWT y encriptación de contraseñas con bcrypt, protegiendo los endpoints mediante middlewares de verificación de token y control de acceso por roles (DUENIO / BARBERO).
La lógica de negocio incluye generación automática de reportes de recaudación por barbero y por sucursal en rangos de fechas, con cálculos de totales y resúmenes agrupados.
## 🔹 Frontend — HTML + CSS + React + Axios + Vite
Construí el frontend con React utilizando hooks (useState, useEffect), manejo de estado global con Context API y navegación con React Router DOM. Implementé rutas protegidas por rol que redirigen automáticamente según el tipo de usuario autenticado.
La app cuenta con dos flujos diferenciados: el dueño accede a un panel de administración completo (sucursales, barberos, servicios y reportes) y el barbero accede a una pantalla simplificada para cargar sus registros de trabajo diario y consultar su recaudación mensual. Además tiene una opción para cambio de contraseña.

✅ El Software aplica diferentes patrones de diseño y buenas practicas para garantizar que sea escalable y mantenible.

## Deploy 🚀

La aplicación está dividida en tres partes, cada una deployada en un servidor diferente:

- Frontend en Netlify: https://daniel-estilista-app.netlify.app

- Backend en Render.

- DB en Clever Cloud, servidor en Paris, Francia.
