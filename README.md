<div align="center">

<img src="storage/app/public/avatars/logo.png" alt="Algoritmizátor logo" width="120" />

# Algoritmizátor

**A gamified web platform for learning algorithms and data structures.**

[![Test Pipeline](https://github.com/Jxn01/algoritmizator/actions/workflows/test.yml/badge.svg)](https://github.com/Jxn01/algoritmizator/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![PHP](https://img.shields.io/badge/PHP-8.2-777BB4?logo=php&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css&logoColor=white)

</div>

---

Algoritmizátor is a web application that teaches algorithms and data structures in a
playful, interactive way. Learners work through lessons, take quizzes, solve coding
tasks, and earn experience points to level up — turning a traditionally dry subject
into a game.

> This project was developed as my **BSc thesis** at ELTE (Eötvös Loránd University,
> Faculty of Informatics). The full thesis (in Hungarian) is available here:
> [Dokumentáció.pdf](Dokument%C3%A1ci%C3%B3.pdf).

## Features

- **Gamified learning** — earn XP for completed tasks and climb through levels; an
  experience-based progression system unlocks harder material as you advance.
- **Structured lessons** — content is organised into lessons and sub-lessons, written
  in Markdown and rendered in-app.
- **Interactive quizzes** — multiple-choice and short-answer questions with automatic
  evaluation and attempt history.
- **In-browser code editor** — coding tasks are solved in an embedded
  [CodeMirror](https://codemirror.net/) editor with syntax highlighting for C/C++,
  Java, Python and JavaScript.
- **Social system** — search for other users, send and accept friend requests, and
  track friends' progress, with live online/offline status.
- **User accounts** — registration, login, email verification, password reset and
  avatar uploads, all built on Laravel's authentication.
- **Profiles & progress tracking** — every user has a profile showing their level,
  XP, successful attempts and friends.

## Topics covered

The learning material spans a full introductory algorithms curriculum:

| Category | Topics |
| --- | --- |
| **Sorting algorithms** | bubble · insertion · selection · merge · quick · heap · counting · radix · bucket sort |
| **Data structures** | arrays · lists · stacks · queues · trees · graphs · hash tables |
| **Graph algorithms** | graph representations · breadth-first search · depth-first search · shortest paths |
| **C fundamentals** | pointers · memory management |

## Tech stack

| Layer | Technology |
| --- | --- |
| Backend | [Laravel 11](https://laravel.com/) (PHP 8.2) |
| Frontend | [React 18](https://react.dev/) |
| Backend ⇄ Frontend | [Inertia.js](https://inertiajs.com/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Code editor | [CodeMirror 6](https://codemirror.net/) |
| Database | MySQL via [Eloquent ORM](https://laravel.com/docs/eloquent) |
| Build tooling | [Vite](https://vitejs.dev/) |
| Testing | [PHPUnit](https://phpunit.de/) |
| Monitoring | [Laravel Telescope](https://laravel.com/docs/telescope) |

## Getting started

### Prerequisites

- PHP 8.2+
- Composer
- Node.js 18+ and npm
- MySQL

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Jxn01/algoritmizator.git
cd algoritmizator

# 2. Install dependencies
composer install
npm install

# 3. Create your environment file
cp .env.example .env

# 4. Generate an application key
php artisan key:generate
```

Configure the database and mail settings in `.env`:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=algoritmizator
DB_USERNAME=
DB_PASSWORD=

MAIL_MAILER=smtp
MAIL_HOST=
MAIL_PORT=
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=
MAIL_FROM_ADDRESS=
MAIL_FROM_NAME="${APP_NAME}"
```

Run the migrations and create the storage symlink (used for avatars and the logo):

```bash
php artisan migrate
php artisan storage:link
```

### Running the app

In two separate terminals:

```bash
php artisan serve   # backend  → http://localhost:8000
npm run dev         # frontend dev server (Vite)
```

Then open <http://localhost:8000>.

> **Note:** the frontend assumes the app is served under the `/algoritmizator`
> path (e.g. `http://localhost:8000/algoritmizator`). This mirrors the production
> deployment, where the app lives in an `/algoritmizator` sub-directory — easily
> reproduced locally with a symlink.

### Scheduled tasks

Some features (expiring password resets, marking inactive users offline) rely on
Laravel's scheduler. In production, add a single cron entry:

```cron
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

## Testing

The backend is covered by PHPUnit feature and unit tests (see [`tests/`](tests)).

```bash
php artisan test
```

Tests expect a dedicated MySQL database. Configure it in
[`phpunit.xml`](phpunit.xml) (e.g. `algoritmizator_test`). The same suite runs
automatically on every push and pull request via
[GitHub Actions](.github/workflows/test.yml).

## Deployment

```bash
# Cache configuration and routes
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Build the frontend assets
npm run build
```

Serve `public/` behind a web server such as
[Apache](https://httpd.apache.org/), [Nginx](https://www.nginx.com/) or
[Caddy](https://caddyserver.com/). Make sure `APP_ENV=production` and
`APP_DEBUG=false` in the production `.env`, and that the database, mail and web
servers are configured before going live.

## Documentation

- **Thesis (Hungarian):** [Dokumentáció.pdf](Dokument%C3%A1ci%C3%B3.pdf)
- **API docs:** generated with [Doxygen](https://www.doxygen.nl/) from the source
  using the included [`Doxyfile`](Doxyfile) (`doxygen Doxyfile`).

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

**Norbert Oláh**

- Email: [jxn.personal@gmail.com](mailto:jxn.personal@gmail.com)
- GitHub: [@Jxn01](https://github.com/Jxn01)
- LinkedIn: [Jxn01](https://www.linkedin.com/in/jxn01)
