# Node-NOC (Network Operations Center)

## Descripción

Node-NOC es una aplicación de monitoreo de servicios web construida con TypeScript y Node.js. Su objetivo principal es verificar la disponibilidad y el estado de servicios web críticos mediante peticiones periódicas y registrar los resultados en un sistema de logs.

## Características

- Monitoreo periódico de servicios web
- Sistema de logs con diferentes niveles de severidad
- Configuración flexible mediante variables de entorno
- Arquitectura modular y escalable
- Soporte para múltiples fuentes de datos (FileSystem, InMemory, Database)
- Notificaciones por correo electrónico con los logs del sistema

## Estructura del Proyecto

```
src/
├── domain/           # Dominio del negocio
│   ├── datasources/  # Interfaces de fuentes de datos
│   ├── entities/     # Entidades del dominio
│   └── repository/   # Interfaces de repositorios
├── infrastructure/   # Implementaciones concretas
│   └── datasources/  # Implementaciones de fuentes de datos
├── presentation/     # Capa de presentación
│   ├── email/        # Servicio de email
│   └── server.ts     # Servidor principal
└── config/          # Configuración
    └── plugin/      # Plugins de configuración
```

## Requisitos

- Node.js 20.x
- npm
- TypeScript

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Crear archivo `.env` basado en `.env.example`

## Uso

1. Configurar las variables de entorno en el archivo `.env`
2. Iniciar el servidor:
   ```bash
   npm run dev
   ```

El servidor iniciará un job cron que verificará periódicamente los servicios configurados y registrará los resultados en el sistema de logs.

## Variables de Entorno

- `PORT`: Puerto del servidor (default: 3000)
- `MAILER_EMAIL`: Email para notificaciones
- `MAILER_SECRET_KEY`: Clave secreta para el mailer
- `MAILER_SERVICE`: Servicio de correo a utilizar (ej. gmail)
- `PROD`: Modo producción (true/false)

## Licencia

ISC

## Autor
Facundo Chayle