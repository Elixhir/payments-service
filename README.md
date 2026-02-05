# Sistema de Pagos – Prueba Técnica Backend

## Requisitos
- Node.js ≥ 18
- npm ≥ 9
- Python ≥ 3.10
- PostgreSQL ≥ 14

---

## Backend Node.js (API)

1. Instalar dependencias:

cd pay-system-api
npm install

2. Variables de entorno (.env):

DATABASE_URL="postgresql://user:password@host:port/db_name"
PAYMENT_SERVICE_URL="http://localhost:5000/process"
PORT=3000

3. Migraciones y Prisma:

npx prisma migrate dev --name init
npx prisma generate

4. Levantar servidor en modo desarrollo:

npm run dev
> http://localhost:3000

---

## Microservicio de pagos (Python / Flask)

1. Crear y activar entorno virtual:

cd payment-service
python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate # Mac/Linux

2. Instalar dependencias:

pip install -r requirements.txt

3. Levantar servicio:

python app.py
> http://localhost:5000

---

## Endpoints principales

### Usuarios
- Crear usuario: POST /users
```json
{
  "name": "example",
  "email": "example@example.com",
  "password": "supersecreto"
}
```
### Tarjetas
- Asociar tarjeta a un usuario: POST /cards
```json
{
  "userId": 1,
  "cardNumber": "1234567891234567",
  "holderName": "Jorge Castillo",
  "expirationDate": "12/28", //MM/YY
  "cvv": "123"
}
```

### Pagos
- Realizar un pago: POST /payments
```json
{
  "userId": 1,
  "cardId": 1,
  "amount": 200.50
}
```

### Historial
- Ver historial de pago de un usuario: GET /payments/user/id
```json
[
    {
        "id": 1,
        "userId": 1,
        "cardId": 1,
        "amount": {
            "amount": 150.75
        },
        "status": "approved",
        "createdAt": "2026-02-05T05:53:54.821Z"
    },
    {
        "id": 2,
        "userId": 1,
        "cardId": 1,
        "amount": {
            "amount": 150.75
        },
        "status": "approved",
        "createdAt": "2026-02-05T05:55:09.289Z"
    }
]
```