# Node-NOC (Network Operations Center)

## Descripción

Node-NOC es una aplicación de monitoreo de servicios web construida con TypeScript y Node.js. Su objetivo principal es verificar la disponibilidad y el estado de servicios web críticos mediante peticiones periódicas y registrar los resultados en un sistema de logs.

## Características

- Monitoreo periódico de servicios web
- Sistema de logs con diferentes niveles de severidad
- Configuración flexible mediante variables de entorno
- Arquitectura modular y escalable
- Soporte para múltiples fuentes de datos:
  - FileSystem
  - MongoDB
  - PostgreSQL
- Notificaciones por correo electrónico con los logs del sistema

## Estructura del Proyecto

```
src/
├── config/           # Configuración
│   └── plugin/       # Plugins de configuración
├── data/             # Conexión a base de datos
│   └── mongo/        # Configuración y modelos de MongoDB
├── domain/           # Dominio del negocio
│   ├── datasources/  # Interfaces de fuentes de datos
│   ├── entities/     # Entidades del dominio
│   └── repository/   # Interfaces de repositorios
├── infrastructure/   # Implementaciones concretas
│   └── datasources/  # Implementaciones de fuentes de datos
├── presentation/     # Capa de presentación
│   ├── email/        # Servicio de email
│   └── server.ts     # Servidor principal
└── prisma/           # Esquema de Prisma para PostgreSQL
```

## Requisitos

- Node.js 20.x
- npm
- TypeScript
- Docker (opcional, para levantar bases de datos)

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Para levantar las bases de datos (MongoDB y PostgreSQL) con Docker, ejecutar:
   ```bash
   docker-compose up -d
   ```
4. Crear archivo `.env` basado en `.env.example`
5. Configurar las variables de entorno en el archivo `.env` para la fuente de datos deseada (FileSystem, MongoDB o PostgreSQL).
6. Si se utiliza PostgreSQL con Prisma, ejecutar:
   ```bash
   npx prisma generate
   ```

## Uso

1. Configurar las variables de entorno en el archivo `.env`
2. Iniciar el servidor:
   ```bash
   npm run dev
   ```

El servidor iniciará un job cron que verificará periódicamente los servicios configurados y registrará los resultados en la fuente de datos seleccionada.

## Variables de Entorno

- `PORT`: Puerto del servidor (default: 3000)
- `MAILER_EMAIL`: Email para notificaciones
- `MAILER_SECRET_KEY`: Clave secreta para el mailer
- `MAILER_SERVICE`: Servicio de correo a utilizar (ej. gmail)
- `PROD`: Modo producción (true/false)

### MongoDB
- `MONGO_URL`: URL de conexión a MongoDB
- `MONGO_DB_NAME`: Nombre de la base de datos en MongoDB
- `MONGO_USER`: Usuario de MongoDB
- `MONGO_PASS`: Contraseña de MongoDB

### PostgreSQL (con Prisma)
- `DATABASE_URL`: URL de conexión a PostgreSQL. Ejemplo: `postgresql://user:password@host:port/database`

## Licencia

ISC

## Autor
Facundo Chayle