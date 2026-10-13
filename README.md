# Mon Vieux Grimoire — API de notation de livres

Back-end de Mon Vieux Grimoire, le site d'une librairie fictive où les lecteurs référencent et notent des livres : une API REST avec authentification, gestion des images et calcul des notes.

Projet de la formation Développeuse web d'OpenClassrooms. L'interface React était fournie ; j'ai développé toute la partie serveur, dans le dossier `backend/`.

![Aperçu du site Mon Vieux Grimoire](https://oudin-deborah.github.io/Portfolio/mon_vieux_grimoire.webp)

## Fonctionnalités

- **Comptes** : inscription et connexion, avec mot de passe haché et jeton d'authentification valable 24 heures.
- **Livres** : création, lecture, modification et suppression.
- **Autorisation** : seul l'utilisateur qui a créé un livre peut le modifier ou le supprimer.
- **Images** : la couverture envoyée est redimensionnée et convertie en WebP avant d'être enregistrée.
- **Notation** : un utilisateur note un livre une seule fois, et la moyenne est recalculée à chaque note.
- **Classement** : une route renvoie les trois livres les mieux notés.

## Technologies

| Rôle | Outil |
|---|---|
| Serveur | Node.js, Express 5 |
| Base de données | MongoDB, avec Mongoose |
| Authentification | JSON Web Token (`jsonwebtoken`) |
| Mots de passe | `bcrypt` |
| Envoi de fichiers | Multer |
| Traitement d'images | Sharp |
| Configuration | Variables d'environnement (`dotenv`) |
| Interface fournie | React (Create React App) |

## Routes de l'API

| Méthode | Route | Connexion requise | Rôle |
|---|---|---|---|
| POST | `/api/auth/signup` | Non | Créer un compte |
| POST | `/api/auth/login` | Non | Se connecter et recevoir un jeton |
| GET | `/api/books` | Non | Lister tous les livres |
| GET | `/api/books/bestrating` | Non | Les trois livres les mieux notés |
| GET | `/api/books/:id` | Non | Détail d'un livre |
| POST | `/api/books` | Oui | Ajouter un livre avec sa couverture |
| PUT | `/api/books/:id` | Oui | Modifier un livre (son créateur uniquement) |
| DELETE | `/api/books/:id` | Oui | Supprimer un livre (son créateur uniquement) |
| POST | `/api/books/:id/rating` | Oui | Noter un livre |

## Installation

Prérequis : Node.js et une base MongoDB (par exemple un cluster gratuit MongoDB Atlas).

```bash
git clone https://github.com/Oudin-Deborah/P6_Mon-Vieux-Grimoire.git
cd P6_Mon-Vieux-Grimoire
npm install
```

**1. Configurer et lancer l'API**

Créer un fichier `backend/.env` contenant l'adresse de connexion à la base :

```
MONGO_URI=mongodb+srv://<utilisateur>:<mot_de_passe>@<cluster>/<base>
```

Ce fichier n'est pas versionné : il est listé dans `.gitignore`.

```bash
cd backend
npm install
node server
```

L'API écoute sur <http://localhost:4000>. Laisser ce terminal ouvert.

**2. Lancer l'interface**

Dans un second terminal, à la racine du projet :

```bash
npm start
```

Le site est alors disponible sur <http://localhost:3000>.

## Structure du projet

```
├── backend/
│   ├── controllers/     Logique des livres et des utilisateurs
│   ├── middleware/      Authentification, envoi et traitement des images
│   ├── models/          Schémas Mongoose : livre et utilisateur
│   ├── roads/           Routes de l'API
│   ├── images/          Couvertures enregistrées
│   ├── app.js           Application Express, connexion à MongoDB, en-têtes CORS
│   └── server.js        Démarrage du serveur
├── public/              Fichiers statiques de l'interface fournie
└── src/                 Interface React fournie
```

## Choix techniques

- **Séparation routes, contrôleurs, modèles et middlewares** : chaque fichier a un seul rôle, ce qui rend le code plus simple à lire et à faire évoluer.
- **Middlewares enchaînés** : une route d'ajout passe par l'authentification, puis Multer, puis Sharp, avant d'atteindre le contrôleur.
- **Mots de passe jamais stockés en clair** : ils sont hachés avec `bcrypt` à l'inscription, et comparés au hachage à la connexion.
- **Identité tirée du jeton** : l'identifiant de l'utilisateur vient du jeton vérifié par le serveur, jamais des données envoyées par le navigateur.
- **Images allégées à l'envoi** : chaque couverture est redimensionnée et convertie en WebP, puis le fichier d'origine est supprimé.
- **Identifiants de la base hors du code** : l'adresse MongoDB est lue dans une variable d'environnement.

## Pistes d'amélioration

- Placer aussi le secret du jeton dans le fichier d'environnement, comme l'adresse de la base de données.
- Renforcer la validation des données : champs obligatoires du modèle, format de l'adresse e-mail, note comprise entre 0 et 5.
- Renvoyer des codes d'erreur plus précis, par exemple 403 quand l'utilisateur n'a pas le droit de supprimer un livre.
- Supprimer l'ancienne image quand un livre est modifié.
- Déclarer `mongoose` et `dotenv` dans les dépendances du back-end et lui ajouter un script `npm start`, pour qu'il s'installe et se lance indépendamment de l'interface.
- Ajouter des tests automatisés sur les routes.

## Crédits

- Interface React, maquettes et spécifications de l'API : OpenClassrooms.
- Développement back-end : Déborah Oudin — [Portfolio](https://oudin-deborah.github.io/Portfolio/) · [LinkedIn](https://www.linkedin.com/in/oudin-deborah/) · [GitHub](https://github.com/Oudin-Deborah)
