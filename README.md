# Voice-Enabled Chatbot cu Auto-Learning

Un chatbot multilingual avansat cu inteligență contextuală, conceput pentru interacțiuni adaptive și personalizate.

## Caracteristici

- Conversații contextuale în limba română
- Suport pentru input vocal și text
- Auto-learning din conversații
- Acces la informații live de pe internet
- Istoric al conversațiilor
- Voci multiple și setări de voce

## Tehnologii Folosite

- Frontend: React, TailwindCSS
- Backend: Express.js, PostgreSQL
- AI: OpenAI API
- Voice: Web Speech API

## Instalare

1. Clonează repository-ul:
```bash
git clone [url-repository]
cd [nume-folder]
```

2. Instalează dependențele:
```bash
npm install
```

3. Configurează variabilele de mediu:
Creează un fișier `.env` în directorul rădăcină și adaugă:
```
DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[database]
OPENAI_API_KEY=[your-openai-api-key]
```

4. Rulează migrările de bază de date:
```bash
npm run db:push
```

5. Pornește aplicația:
```bash
npm run dev
```

Aplicația va rula pe `http://localhost:5000`

## Structura Proiectului

- `/client` - Frontend React
- `/server` - Backend Express
- `/shared` - Tipuri și scheme comune
