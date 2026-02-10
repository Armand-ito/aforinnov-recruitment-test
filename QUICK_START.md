# 🚀 DÉMARRAGE RAPIDE - AFORINNOV

## ⚡ EN BREF

### Lancer l'application
```bash
docker-compose up --build
```

Puis ouvrir http://localhost:3000 dans votre navigateur.

---

## 📋 COMMANDES PRINCIPALES

### Démarrage complet (première fois)
```bash
docker-compose up --build
```

### Démarrage normal (fois suivantes)
```bash
docker-compose up
```

### Arrêter l'application
```bash
Ctrl + C
```
ou
```bash
docker-compose down
```

### Redémarrer après modifications du code
```bash
docker-compose restart
```

### Voir les logs
```bash
docker-compose logs -f
```

### Nettoyer complètement (supprimer données)
```bash
docker-compose down -v
```

---

## 🔧 COMMANDES UTILES

### Backend - Accéder au conteneur
```bash
docker exec -it aforinnov_backend sh
```

### Prisma - Créer une migration
```bash
docker exec -it aforinnov_backend npx prisma migrate dev --name nom_migration
```

### Prisma - Accéder à Prisma Studio
```bash
docker exec -it aforinnov_backend npx prisma studio
```

### PostgreSQL - Accéder à la base de données
```bash
docker exec -it aforinnov_postgres psql -U aforinnov_user -d aforinnov_db
```

### Voir les conteneurs en cours
```bash
docker ps
```

### Voir tous les conteneurs (même arrêtés)
```bash
docker ps -a
```

### Voir les images Docker
```bash
docker images
```

---

## 📁 STRUCTURE DU PROJET

```
aforinnov-recruitment-test/
├── frontend/                 # Application React
│   ├── public/
│   ├── src/
│   │   ├── components/      # Navbar
│   │   ├── pages/           # Login, Register, Articles, CreateArticle
│   │   ├── services/        # API calls
│   │   ├── App.js
│   │   └── index.js
│   ├── Dockerfile
│   └── package.json
│
├── backend/                  # API Express
│   ├── controllers/         # auth, articles
│   ├── routes/              # Routes API
│   ├── prisma/              # Schema et migrations
│   ├── server.js
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml       # Orchestration
├── .env                     # Variables d'environnement
├── .gitignore
└── README.md
```

---

## 🌐 URLS DE L'APPLICATION

| Service    | URL                        | Description                |
|------------|----------------------------|----------------------------|
| Frontend   | http://localhost:3000      | Interface utilisateur      |
| Backend    | http://localhost:5000      | API REST                   |
| PostgreSQL | localhost:5432             | Base de données            |

---

## 🔑 IDENTIFIANTS PAR DÉFAUT

**Base de données PostgreSQL :**
- User: `aforinnov_user`
- Password: `aforinnov_password`
- Database: `aforinnov_db`

**JWT Secret :**
- `your_super_secret_jwt_key_change_this_in_production`

⚠️ **À changer en production !**

---

## 📊 ENDPOINTS API PRINCIPAUX

### Authentification
- `POST /auth/register` - Inscription
- `POST /auth/login` - Connexion
- `GET /auth/me` - Profil utilisateur (🔒 authentifié)

### Articles
- `GET /articles` - Liste des articles
- `GET /articles/:id` - Un article
- `POST /articles` - Créer un article (🔒 authentifié)
- `PUT /articles/:id` - Modifier un article (🔒 authentifié + propriétaire)
- `DELETE /articles/:id` - Supprimer un article (🔒 authentifié + propriétaire)

---

## 🐛 DÉBOGAGE

### Voir les logs d'un service spécifique
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Reconstruire un seul service
```bash
docker-compose up --build backend
```

### Supprimer les images et reconstruire
```bash
docker-compose down --rmi all
docker-compose up --build
```

### Vérifier l'état de santé de PostgreSQL
```bash
docker exec aforinnov_postgres pg_isready -U aforinnov_user
```

---

## 📝 AVANT DE SOUMETTRE

- [ ] Le code est sur GitHub (repository public)
- [ ] `docker-compose up --build` fonctionne
- [ ] README.md est complet
- [ ] L'application fonctionne (inscription, connexion, CRUD articles)
- [ ] Pas d'erreurs dans les logs
- [ ] `.env` et `node_modules/` sont dans `.gitignore`

---

## 💡 ASTUCES

### Développement local sans Docker

**Backend :**
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

**Frontend :**
```bash
cd frontend
npm install
npm start
```

### Tester l'API avec curl

**Inscription :**
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"password123"}'
```

**Connexion :**
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
```

---

## 🆘 AIDE

**Problème avec les ports ?**
- Vérifier qu'aucune application n'utilise les ports 3000, 5000, ou 5432
- Modifier les ports dans `docker-compose.yml` si nécessaire

**Docker ne démarre pas ?**
- Vérifier que Docker Desktop est lancé
- Redémarrer Docker Desktop
- Vérifier que la virtualisation est activée dans le BIOS

**Base de données ne se connecte pas ?**
- Attendre 30-60 secondes après `docker-compose up`
- Vérifier les logs : `docker-compose logs postgres`

---

**Bonne chance ! 🎉**
