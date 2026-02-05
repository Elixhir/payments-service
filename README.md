# Sistema de Pagos – Backend

## Requisitos
- Node.js ≥ 18
- npm ≥ 9
- Python ≥ 3.10
- PostgreSQL ≥ 14

---

## Backend Node.js (API)

1. Instalar dependencias:

```
cd pay-system-api
npm install
```

2. Variables de entorno (.env):

DATABASE_URL="postgresql://user:password@host:port/db_name",
PAYMENT_SERVICE_URL="http://localhost:5000/process",
PORT=3000

3. Ejecutar migraciones y generar cliente ORM:

```
npx prisma migrate dev --name migration_name
npx prisma generate
```

4. Levantar servidor en modo desarrollo:

```
npm run dev
```

## Microservicio de pagos (Python / Flask)

1. Crear y activar entorno virtual:

```
cd payment-service
python -m venv venv

venv\Scripts\activate      //Windows
source venv/bin/activate   //Mac/Linux
```

2. Instalar dependencias:

```
pip install -r requirements.txt
```

3. Levantar servicio:

```
python app.py
```

## Colección de Postman

Dentro del repositorio se incluye una colección lista para probar todos los endpoints:

postman/payment_system.postman_collection.json

### Cómo usarla:

1. Abrir Postman  
2. Click en **Import**  
3. Seleccionar el archivo: postman/payment-system-collection.json  
4. Asegurarse de que la API y el servicio Python estén corriendo
5. Crear entorno base_url y asignarle el valor http://localhost:3000
6. Ejecutar los requests en el siguiente orden recomendado:

    - Create User  
    - Assign Card  
    - Create Payment
    - Get Payment History 
