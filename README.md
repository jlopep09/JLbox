# JLBox
## Introducción
JLBox es un servicio software que permite al usuario la gestión de almacenes, cajas numeradas y objetos de forma sencilla. Permite localizar de forma rápida cualquier elemento del sistema siempre que se sigan las siguientes pautas de uso.

1. El usuario debe registrar cualquier cambio en el contenido de las cajas para mantener la integridad de los datos. 
2. De forma opcional, se recomienda realizar comprobaciones periódicas de los contenidos de las cajas y almacenes para detectar posibles modificaciones que no hayan sido registrados en el sistema. (El sistema ofrece la posibidad de registrar las revisiones realizadas y de buscar las cajas con mayor tiempo sin revisión.)

## Aspectos técnicos
JLBox es un sistema de uso, modificacion y distribución libre. No es obligatorio pero se agradece agregar a sistemas derivados atribución a este proyecto. 

El sistema se ha desarrollado a partir de microservicios virtualizados. Puede iniciar el sistema ejecutando el siguiente comando desde el directorio raiz. Es necesario tener instalado Docker Compose para su ejecución.

```
docker compose up --build
```

Es necesaria la creación de un archivo .env con las siguientes variables de entorno

```
MYSQL_ROOT_PASSWORD = ""
MYSQL_DATABASE = ""
MYSQL_USER = ""
MYSQL_PASSWORD = ""

PYTHON_DB_HOST = 
PYTHON_DB_ACC_PORT = 
```

Como tecnologías principales empleadas encontramos las siguientes:
- Backend: Python, FastAPI, Pytest, Pydantic
- Persistencia: MariaDB
- Frontend: JavaScript, React, Tailwindcss, DaisyUI

