# 🪟 GUIDE D'INSTALLATION COMPLET - WINDOWS 10/11

Ce guide vous accompagne pas à pas pour installer et lancer le projet AFORINNOV sur Windows.

## ⏱️ TEMPS TOTAL ESTIMÉ : 45-60 minutes

---

## 📝 ÉTAPE 1 : INSTALLATION DES PRÉREQUIS (30 min)

### 1.1 Installer Node.js (10 min)

1. **Télécharger Node.js**
   - Aller sur https://nodejs.org/
   - Télécharger la version **LTS** (Long Term Support) - version 18 ou supérieure
   - Choisir le fichier `.msi` pour Windows (64-bit)

2. **Installer Node.js**
   - Double-cliquer sur le fichier téléchargé
   - Cliquer sur "Next" plusieurs fois
   - ✅ Cocher "Automatically install the necessary tools" si proposé
   - Cliquer sur "Install"
   - Attendre la fin de l'installation
   - Cliquer sur "Finish"

3. **Vérifier l'installation**
   - Appuyer sur `Windows + R`
   - Taper `cmd` et appuyer sur Entrée
   - Dans la fenêtre noire (Command Prompt), taper :
   ```bash
   node --version
   npm --version
   ```
   - Vous devriez voir les numéros de version (ex: v18.19.0 et 10.2.3)

---

### 1.2 Installer Docker Desktop (15 min)

1. **Télécharger Docker Desktop**
   - Aller sur https://www.docker.com/products/docker-desktop
   - Cliquer sur "Download for Windows"

2. **Installer Docker Desktop**
   - Double-cliquer sur `Docker Desktop Installer.exe`
   - Suivre les instructions d'installation
   - ⚠️ **IMPORTANT** : Si demandé, accepter l'installation de WSL 2 (Windows Subsystem for Linux)
   - Cliquer sur "Ok" puis "Close and restart"

3. **Après le redémarrage**
   - Docker Desktop se lance automatiquement
   - Accepter les termes et conditions
   - Vous pouvez sauter la connexion Docker Hub (pas nécessaire)
   - Attendre que Docker affiche "Engine running" en bas à gauche

4. **Vérifier l'installation**
   - Ouvrir Command Prompt (cmd)
   - Taper :
   ```bash
   docker --version
   docker-compose --version
   ```
   - Vous devriez voir les versions (ex: Docker version 24.0.7)

---

### 1.3 Installer Git (5 min)

1. **Télécharger Git**
   - Aller sur https://git-scm.com/download/win
   - Le téléchargement devrait démarrer automatiquement

2. **Installer Git**
   - Double-cliquer sur le fichier téléchargé
   - Cliquer sur "Next" pour toutes les options (les paramètres par défaut sont bons)
   - Cliquer sur "Install"
   - Cliquer sur "Finish"

3. **Vérifier l'installation**
   - Ouvrir Command Prompt (cmd)
   - Taper :
   ```bash
   git --version
   ```
   - Vous devriez voir la version (ex: git version 2.43.0)

---

## 📂 ÉTAPE 2 : CRÉER LE PROJET GITHUB (10 min)

### 2.1 Créer un compte GitHub (si vous n'en avez pas)

1. Aller sur https://github.com/
2. Cliquer sur "Sign up"
3. Suivre les instructions pour créer votre compte
4. Vérifier votre email

### 2.2 Créer le repository

1. **Une fois connecté sur GitHub**
   - Cliquer sur le "+" en haut à droite
   - Sélectionner "New repository"

2. **Configurer le repository**
   - Repository name : `aforinnov-recruitment-test`
   - Description : `Test de recrutement AFORINNOV - Application de gestion d'articles`
   - ✅ Cocher "Public"
   - ❌ NE PAS cocher "Add a README file" (on va en créer un)
   - Cliquer sur "Create repository"

3. **Noter l'URL de votre repository**
   - Vous verrez une URL comme : `https://github.com/VOTRE_USERNAME/aforinnov-recruitment-test.git`
   - Gardez cette page ouverte, on en aura besoin

---

## 💻 ÉTAPE 3 : TÉLÉCHARGER ET INSTALLER LE PROJET (15 min)

### 3.1 Créer un dossier pour le projet

1. **Créer un dossier**
   - Ouvrir l'Explorateur Windows
   - Aller dans `C:\Users\VotreNom\Documents\`
   - Créer un nouveau dossier nommé `aforinnov-recruitment-test`

### 3.2 Télécharger les fichiers du projet

**OPTION A : Vous avez reçu les fichiers de Claude**

1. Télécharger tous les fichiers que Claude vous a fournis
2. Les placer dans le dossier `aforinnov-recruitment-test`
3. La structure devrait ressembler à :
   ```
   aforinnov-recruitment-test/
   ├── frontend/
   ├── backend/
   ├── docker-compose.yml
   ├── .env
   ├── .gitignore
   └── README.md
   ```

**OPTION B : Créer manuellement la structure**

1. Ouvrir Command Prompt
2. Naviguer vers le dossier :
   ```bash
   cd C:\Users\VotreNom\Documents\aforinnov-recruitment-test
   ```

3. Créer la structure de base :
   ```bash
   mkdir frontend backend
   mkdir backend\controllers backend\routes backend\prisma
   mkdir frontend\src frontend\public
   mkdir frontend\src\components frontend\src\pages frontend\src\services
   ```

4. Copier tous les fichiers fournis par Claude dans les bons dossiers

---

## 🚀 ÉTAPE 4 : INITIALISER LE PROJET (5 min)

### 4.1 Ouvrir le projet dans l'éditeur

1. **Si vous avez VS Code**
   - Clic droit sur le dossier `aforinnov-recruitment-test`
   - Sélectionner "Ouvrir avec Code"

2. **Sinon**
   - Ouvrir votre éditeur de texte préféré
   - Ouvrir le dossier du projet

### 4.2 Initialiser Git

1. **Ouvrir Command Prompt dans le dossier du projet**
   - Dans l'explorateur, aller dans le dossier `aforinnov-recruitment-test`
   - Taper `cmd` dans la barre d'adresse et appuyer sur Entrée

2. **Initialiser Git et pousser vers GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - AFORINNOV recruitment test"
   git branch -M main
   git remote add origin https://github.com/VOTRE_USERNAME/aforinnov-recruitment-test.git
   git push -u origin main
   ```

   ⚠️ **Remplacer `VOTRE_USERNAME`** par votre nom d'utilisateur GitHub

3. **Si demandé, entrer vos identifiants GitHub**

---

## 🐳 ÉTAPE 5 : LANCER L'APPLICATION AVEC DOCKER (10 min)

### 5.1 Vérifier que Docker est en cours d'exécution

1. Vérifier que Docker Desktop est ouvert
2. En bas à gauche, vous devez voir "Engine running" en vert

### 5.2 Lancer l'application

1. **Dans Command Prompt (dans le dossier du projet)**
   ```bash
   docker-compose up --build
   ```

2. **Que va-t-il se passer ?**
   - Docker va télécharger les images nécessaires (Node.js, PostgreSQL) - **Première fois : 5-10 min**
   - Construire les conteneurs pour le frontend et backend
   - Démarrer PostgreSQL
   - Exécuter les migrations de la base de données
   - Démarrer le backend sur le port 5000
   - Démarrer le frontend sur le port 3000

3. **Attendre les messages suivants :**
   ```
   aforinnov_backend   | 🚀 Serveur démarré sur http://localhost:5000
   aforinnov_frontend  | webpack compiled successfully
   ```

4. **L'application est prête !**

---

## ✅ ÉTAPE 6 : TESTER L'APPLICATION (10 min)

### 6.1 Accéder à l'application

1. **Ouvrir votre navigateur** (Chrome, Firefox, Edge...)

2. **Aller sur http://localhost:3000**
   - Vous devriez voir la page de connexion

### 6.2 Créer un compte

1. Cliquer sur "Inscrivez-vous"
2. Remplir le formulaire :
   - Nom : Votre nom
   - Email : votre.email@example.com
   - Mot de passe : minimum 6 caractères
   - Confirmer le mot de passe
3. Cliquer sur "S'inscrire"
4. Vous serez automatiquement connecté et redirigé vers la page des articles

### 6.3 Créer un article

1. Cliquer sur "➕ Nouvel Article" ou "Créer un Article"
2. Remplir le formulaire :
   - Titre : "Mon premier article"
   - Description : "Ceci est un test"
   - Contenu : "Contenu de mon premier article de test..."
   - Cocher "Publier immédiatement" si vous voulez
3. Cliquer sur "✓ Créer l'article"
4. Vous serez redirigé vers la liste des articles
5. Votre article devrait apparaître !

### 6.4 Tester les autres fonctionnalités

- ✅ Se déconnecter
- ✅ Se reconnecter
- ✅ Créer plusieurs articles
- ✅ Supprimer un article (uniquement vos articles)
- ✅ Voir les articles des autres utilisateurs (si vous créez un 2ème compte)

---

## 🛑 ÉTAPE 7 : ARRÊTER L'APPLICATION

### Pour arrêter temporairement

1. **Dans la fenêtre Command Prompt** où docker-compose tourne
2. Appuyer sur `Ctrl + C`
3. Attendre que tous les services s'arrêtent

### Pour arrêter et supprimer les conteneurs

```bash
docker-compose down
```

### Pour redémarrer l'application plus tard

```bash
docker-compose up
```

(Pas besoin de `--build` si vous n'avez rien modifié)

---

## ❓ PROBLÈMES COURANTS ET SOLUTIONS

### ❌ "Docker is not running"

**Solution :**
- Ouvrir Docker Desktop
- Attendre que "Engine running" apparaisse en vert
- Réessayer la commande

### ❌ "Port 3000 is already in use"

**Solution :**
- Une autre application utilise le port 3000
- Fermer l'application qui utilise ce port (peut-être une ancienne instance React)
- Ou modifier le port dans `docker-compose.yml` :
  ```yaml
  frontend:
    ports:
      - "3001:3000"  # Changer 3000 en 3001
  ```

### ❌ "Cannot connect to database"

**Solution :**
- Attendre 30 secondes de plus (PostgreSQL prend du temps à démarrer)
- Vérifier que Docker Desktop est bien lancé
- Redémarrer : `docker-compose down` puis `docker-compose up`

### ❌ "npm ERR!" ou "Error building"

**Solution :**
- Supprimer les conteneurs : `docker-compose down -v`
- Supprimer les dossiers `node_modules` :
  ```bash
  rmdir /s frontend\node_modules
  rmdir /s backend\node_modules
  ```
- Reconstruire : `docker-compose up --build`

### ❌ Git demande un mot de passe à chaque push

**Solution :**
- Configurer Git :
  ```bash
  git config --global credential.helper wincred
  ```

---

## 📝 CHECKLIST FINALE

Avant de soumettre le projet, vérifier que :

- [ ] Le repository GitHub est public
- [ ] Tous les fichiers sont bien poussés sur GitHub
- [ ] Le README.md est complet et à jour
- [ ] L'application se lance avec `docker-compose up --build`
- [ ] On peut s'inscrire, se connecter et créer des articles
- [ ] Aucune erreur n'apparaît dans la console
- [ ] Les fichiers `.env` et `node_modules/` sont dans `.gitignore`

---

## 🎉 FÉLICITATIONS !

Vous avez réussi à :
- ✅ Installer tous les outils nécessaires
- ✅ Créer un projet fullstack avec Docker
- ✅ Déployer l'application localement
- ✅ Tester toutes les fonctionnalités
- ✅ Pousser le code sur GitHub

**Votre projet est prêt à être soumis !**

---

## 📧 BESOIN D'AIDE ?

Si vous rencontrez des problèmes :
1. Vérifier la section "Problèmes courants"
2. Lire attentivement les messages d'erreur
3. Vérifier que Docker Desktop est bien lancé
4. Vérifier que tous les prérequis sont installés

**N'oubliez pas de partager le lien de votre repository GitHub !**

---

**Bon courage ! 🚀**
