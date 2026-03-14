# VibeTube

A YouTube-like video uploading and watching platform.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Template Engine:** Handlebars
- **Database:** PostgreSQL
- **File Upload:** Multer

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/firdavsdev07/VibeTube.git
cd youtube-clone

# 2. Install dependencies
pnpm install

# 3. Create .env file
cp .env.example .env
# Fill in your DB credentials in .env

# 4. Create the database
psql -U postgres -f schemas/vibetube.sql

# 5. Start the server
pnpm dev
```

Server runs at `http://localhost:5000`.

## Routes

| Route | Description |
|-------|-------------|
| `/` | All videos |
| `/upload` | Upload a video |
| `/login` | Login |
| `/register` | Register |
