# Deployment

## Local development

```bash
cp backend/.env.example backend/.env
docker compose up -d postgres redis
cd backend
pip install -r requirements/development.txt
python manage.py makemigrations   # see docs/DATABASE.md for app labels
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_content
python manage.py runserver
# separately:
celery -A config worker -l info
```

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

## Docker (all services)

```bash
docker compose up --build
```

Brings up: `postgres`, `redis`, `backend` (migrates + gunicorn),
`celery`, `celery-beat`, `frontend` (Next.js), `nginx` (reverse proxy on
port 80: `/api/*` and `/admin/*` -> backend, `/media/*` -> shared volume,
everything else -> frontend).

## Environment variables

See `backend/.env.example` for the full list (secret key, database,
Redis, CORS/CSRF origins, AI provider keys, email provider, S3/object
storage credentials). Never commit a populated `.env`.

## Static & media files

- `collectstatic` runs as part of the backend container's startup command.
- Public media (product images, insight covers, logos) via
  `apps.file_storage.storages.public_storage`.
- Private media (resumes) via `private_storage`, never served through the
  public media URL.
- Set `USE_S3_STORAGE=True` plus the `STORAGE_*` variables to move both to
  S3-compatible object storage in production; no application code changes
  needed.

## Rollback

Django migrations are reversible by default; keep the previous container
image tagged so `docker compose up` can redeploy it while
`python manage.py migrate <app> <previous_migration>` rolls back schema
if a release must be reverted.
