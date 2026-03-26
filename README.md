# Capturr Website

A starter full-stack project with:
- React frontend (Vite)
- Flask backend
- Waitlist form
- Simple landing page

## Project structure

```text
capturr-full-project/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       └── styles.css
└── README.md
```

## Run backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

Backend runs at:
```bash
http://localhost:5000
```

## Run frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
```bash
http://localhost:5173
```

## API endpoints

### Health check
```bash
GET /api/health
```

### Join waitlist
```bash
POST /api/waitlist
```

Example payload:
```json
{
  "full_name": "Praveen Kumar",
  "email": "praveen@example.com",
  "user_type": "customer"
}
```

## Next upgrades
- PostgreSQL for waitlist storage
- Admin dashboard
- Creator onboarding page
- Customer booking flow
- AWS deployment
- Production API config
