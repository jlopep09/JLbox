# Module Imports
from pathlib import Path
import mariadb
import sys
import os
import time
from dotenv import load_dotenv


env_loaded = False
#Carga de variables de entorno si faltan
if os.getenv('PYTHON_DB_HOST') is None:
    relative_env_paths = ["./../.env","./.env"]
    for p in relative_env_paths:
        if os.getenv('PYTHON_DB_HOST') is None:
            path_env = p
            print(f"No se han encontrado las variables de entorno en el sistema, intentando buscar archivo .env en esta ruta relativa: {path_env}")
            path_env = Path(path_env)
            load_dotenv(dotenv_path=path_env)
else:
    env_loaded = True  

    

def get_connection():
    # Connect to MariaDB Platform
    try:
        if not env_loaded:
            raise Exception("Error, no se han conseguido cargar las variables de entorno necesarias. Se necesita gestión por parte del usuario.")
        
        print(os.getenv('PYTHON_DB_HOST'))
        conn = mariadb.connect(
            user= os.getenv('MYSQL_USER'),
            password=os.getenv('MYSQL_PASSWORD'),
            host=os.getenv('PYTHON_DB_HOST'),
            port=int(os.getenv('PYTHON_DB_ACC_PORT')),
            database=os.getenv('MYSQL_DATABASE')
        )
        try:
            yield conn
        finally:
            conn.close()
    except mariadb.Error as e:
        print(f"Error connecting to MariaDB Platform: {e}")
        raise Exception("Error connecting to MariaDB Platform")
    except Exception as es:
        print(f"Se ha productido un error insesperado: {es}")
        raise Exception("Se ha productido un error insesperado")
