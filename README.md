# Final Drilling Project

Evaluacion Final del Modulo 8 para el bootcamp "Fullstack Javascript Trainee" impartido por Edutecno.

Se ha utilizado Node.js para levantarlo, haciendo uso de modulos como Sequelize y PG para utilizar PostgreSQL como base de datos. También se usaron JWJ, Bycrypt y Express.

## Requisitos

- Node.js (versión 16 o superior)
- PostgreSQL (PgAdmin 4)
- Sequelize ORM
- Pg
- .env
- Jason Web Token
- Bycrypt
- Express

## Instalación

1. Clona el repositorio:
   
   ```bash
   git clone https://github.com/Nicol-Guzman/modulo7_finaldrilling_nicolguzman.git
   cd modulo7_finaldrilling_nicolguzman```

2. Instala las dependencias del proyecto
    
    ```bash
    npm install```

3. OPCIONAL: Si encuentra vulnerabilidades  te pide hacer un audit, sigue las instrucciones que te entrega npm por la consola.
    ```bash
    npm audit```

    ```bash
    npm audit fix```

4. Crea el archivo .env y reemplaza la informacion con los datos de tu proyecto
    ```.env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_NAME=nombre_base_de_datos```

5. Crea la base de datos en PgAdmin con el nombre "db_bootcamp". Se recomienda que tu usuario sea al Admin, en caso de PgAdmin 4 sería "postgres"
     
6. Asegurate de que los datos ingresados en .env concuerden con los definidos cuando creaste la base de datos.

7. Inicializa el servidor para iteractuar con el con POSTMAN.

    ```node
    node server.js```

## Pasos para usar servidor con POSTMAN

1. CREAR UN USUARIO:
    
    - **RUTA:** http://localhost:3000/api/user/signup
    - **METODO:** POST
    - **HEADERS:**
        - Key: Content-Type / Value: application/json
    - **BODY:**
    
    
    ```{
            "firstName": "Mateo",
            "lastName": "Díaz",
            "email": "mateo.diaz@correo.com",
            "password": "mateo123456"
        },
        {
            "firstName": "Santiago",
            "lastName": "Mejías",
            "email": "santiago.mejias@correo.com",
            "password": "santiago123456"
        },
        {
            "firstName": "Lucas",
            "lastName": "Rojas",
            "email": "lucas.rojas@correo.com",
            "password": "lucas123456"
        },
        {
            "firstName": "Facundo",
            "lastName": "Fernández",
            "email": "facundo.fernandez@correo.com",
            "password": "facundo123456"
        }```

2. INICIAR SESION

    - **RUTA:** http://localhost:3000/api/user/signin
    - **METODO:** POST
    
    Al realizar el login, mantener abierta la pestaña, ya que el Token se usara para los pasos sub-siguientes.

    La consola de POSTMAN debería mostrar algo como:

    ```{
        "id": 1,
        "email": "mateo.diaz@correo.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM3NDE3OTM4LCJleHAiOjE3Mzc1MDQzMzh9.hevWgRFrtuBQ71LkeM1Vh4-m_V1hLELL9FoPycQZltM"
    }```

3. OBTENE UN USUARIO POR ID

    Puedes cambiar el numero al final de la ruta para acceder a los datos de otros usuarios o para testear el lanzamiento de errores al colocar un id que no existe.
    
    - **RUTA:** http://localhost:3000/api/user/1
    - **METODO:** GET
    - **HEADERS:**
        - Key: x-access-token / Value: Aqui va el token que entrego el paso 2
    
4. OBTENER TODOS LOS USUARIOS

    - **RUTA:** http://localhost:3000/api/user
    - **METODO:** GET
    - **HEADERS:**
        - Key: x-access-token / Value: Aqui va el token que entrego el paso 2

5. CREAR UN BOOTCAMP

    - **RUTA:** http://localhost:3000/api/bootcamp
    - **METODO:** POST
    - **HEADERS:**
        - Key: Content-Type / Value: application/json
        - Key: x-access-token / Value: Aqui va el token que entrego el paso 2
    - **BODY:**

    ```{
        "title": "Introduciendo El Bootcamp de React",
        "cue": 10,
        "description": "React es la librería más usada en JavaScript para el desarrollo de interfaces"
    },
    {
        "title": "Bootcamp Desarrollo Web Full Stack",
        "cue": 12,
        "description": "Crearás aplicaciones web con JavaScript, Node.js, Angular, MongoDB, Express.js."
    },
    {
        "title": "Bootcamp Big Data, Inteligencia Artificial & Machine Learning",
        "cue": 18,
        "description": "Domina Data Science todo el ecosistema de lenguajes y herramientas de Big Data e integrarlos con modelos avanzados de Artificial Intelligence y Machine Learning"
    }```

6. AGREGAR USUARIOS AL BOOTCAMP

    - **RUTA:** http://localhost:3000/api/bootcamp/adduser
    - **METODO:** POST
    - **HEADERS:**
        - Key: Content-Type / Value: application/json
        - Key: x-access-token / Value: Aqui va el token que entrego el paso 2
    - **BODY:**

    ```{
        "bootcamp_id": 1,
        "user_id": 1
    },
    {
        "bootcamp_id": 2,
        "user_id": 1
    },
    {
        "bootcamp_id": 2,
        "user_id": 1
    },
    {
        "bootcamp_id": 3,
        "user_id": 1
    },
    {
        "bootcamp_id": 3,
        "user_id": 2
    },
    {
        "bootcamp_id": 3,
        "user_id": 3
    }```

7. OBTENER UN BOOTCAMP POR ID CON LOS USUARIOS ASOCIADOS A EL

    Puedes cambiar el numero al final de la ruta para acceder a los datos de otros bootcamps o para testear el lanzamiento de errores al colocar un id que no existe.

    - **RUTA:** http://localhost:3000/api/bootcamp/1
    - **METODO:** GET
    - **HEADERS:**
        - Key: x-access-token / Value: Aqui va el token que entrego el paso 2
    
8. OBTENER TODOS LOS BOOTCAMPS Y SUS USUARIOS ASOCIADOS

    - **RUTA:** http://localhost:3000/api/bootcamp
    - **METODO:** GET
    - **HEADERS:**
        - Key: x-access-token / Value: Aqui va el token que entrego el paso 2

9. ACTUALIZAR UN USUARIO POR ID

    Puedes cambiar el numero al final de la ruta para modificar otro usuario existente.

    - **RUTA:** http://localhost:3000/api/user/1
    - **METODO:** PUT
    - **HEADERS:**
        - Key: x-access-token / Value: Aqui va el token que entrego el paso 2
    - **BODY:**
    
    {
        "firstName": "Pedro",
        "lastName": "Sánchez"
    }

10. ELIMINAR UN USUARIO POR ID

    Puedes cambiar el numero al final de la ruta para eliminar otro usuario existente.

    - **RUTA:** http://localhost:3000/api/user/1
    - **METODO:** DELETE
    - **HEADERS:**
        - Key: x-access-token / Value: Aqui va el token que entrego el paso 2
    - **BODY:**
    
    ```{
        "firstName": "Pedro",
        "lastName": "Sánchez"
    }```
