# cloude

Минималистичное тёмное приложение на SvelteKit со входом по почте и паролю (Better Auth).

## Запуск

1. `npm install` — скачать библиотеки (заодно ставит защиту от коммитов в `main`)
2. Скопировать `.env.example` в `.env` и заполнить `BETTER_AUTH_SECRET` (команда для генерации — внутри файла)
3. `npm run dev` — открыть http://localhost:5173

## Правила работы

- В `main` напрямую не коммитим — только через ветку и Pull Request.
- GitHub Actions проверяет каждый Pull Request (типы + сборка).
