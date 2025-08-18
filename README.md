# 🛒 ShopJS v2 - Backend API

Une API REST complète pour une application e-commerce développée avec Node.js, Express et MongoDB.

## 📋 Description

Cette API backend fournit toutes les fonctionnalités nécessaires pour une boutique en ligne moderne :

- Gestion des utilisateurs avec authentification sécurisée
- Catalogue de produits avec système de recherche
- Gestion des commandes et du panier
- Interface d'administration pour le suivi des commandes

## 🚀 Technologies utilisées

- **Backend** : Node.js, Express.js
- **Base de données** : MongoDB avec Mongoose
- **Authentification** : JWT avec chiffrement sécurisé (crypto-js, uid2)
- **Autres** : CORS pour l'intégration frontend

## 📁 Structure du projet

```
├── index.js                # Point d'entrée du serveur
├── models/                 # Modèles de données MongoDB
│   ├── User.js             # Modèle utilisateur
│   ├── Product.js          # Modèle produit
│   └── Order.js            # Modèle commande
├── routes/                 # Routes de l'API
│   ├── user.js             # Authentification utilisateur
│   ├── product.js          # Gestion des produits
│   └── order.js            # Gestion des commandes
├── middlewares/            # Middlewares de sécurité
│   ├── isAuthenticated.js  # Vérification de l'authentification
│   └── isAdmin.js          # Vérification des droits admin
└── assets/
    └── products.json       # Données de produits pour l'initialisation
```

## 🔧 Installation et configuration

### Prérequis

- Node.js (v14 ou supérieur)
- MongoDB en cours d'exécution sur `mongodb://localhost:27017`
- Yarn ou npm

### Installation

1. Clonez le dépôt

```bash
git clone <votre-repo>
cd Shopjsv2-Backend
```

2. Installez les dépendances

```bash
yarn install
# ou
npm install
```

3. Assurez-vous que MongoDB est en cours d'exécution

4. Démarrez le serveur

```bash
node index.js
```

Le serveur démarre sur le port **4000** par défaut.

## 🛠️ Initialisation de la base de données

Pour peupler la base de données avec des produits de démonstration :

```bash
POST http://localhost:4000/create-db
```

Cette route supprime tous les produits existants et les remplace par les données du fichier `assets/products.json`.

## 📚 Documentation de l'API

### 👤 Authentification

#### Inscription

```
POST /user/signup
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Connexion

```
POST /user/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

### 🛍️ Produits

#### Récupérer tous les produits

```
GET /products?search=terme_recherche
```

#### Récupérer un produit par ID

```
GET /products/:id
```

#### Initialiser la base de données

```
POST /create-db
```

### 📦 Commandes

> **Note** : Toutes les routes de commandes nécessitent une authentification (Bearer Token)

#### Créer une commande

```
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "products": [
    {
      "product": "product_id",
      "quantity": number
    }
  ],
  "address": "string",
  "price": number
}
```

#### Récupérer toutes les commandes (Admin uniquement)

```
GET /orders
Authorization: Bearer <admin_token>
```

#### Marquer une commande comme livrée (Admin uniquement)

```
PUT /orders/mark-delivered/:id
Authorization: Bearer <admin_token>
```

## 🔐 Authentification et sécurité

- **Chiffrement des mots de passe** : SHA256 avec salt unique
- **Tokens JWT** : Génération automatique pour l'authentification
- **Middlewares de sécurité** : Vérification d'authentification et de droits admin
- **CORS** : Configuré pour permettre les requêtes cross-origin

## 👥 Modèles de données

### User

- `username` : Nom d'utilisateur
- `email` : Adresse email (unique)
- `token` : Token d'authentification
- `admin` : Droits administrateur (booléen)
- `hash` / `salt` : Données de chiffrement du mot de passe

### Product

- Informations complètes du produit (titre, description, prix, etc.)
- Images et miniatures
- Système de reviews et ratings
- Informations logistiques (stock, expédition, garantie)

### Order

- `owner` : Référence vers l'utilisateur
- `products` : Liste des produits avec quantités
- `address` : Adresse de livraison
- `price` : Prix total
- `delivered` : Statut de livraison

## 🌐 CORS

L'API est configurée avec CORS pour permettre les requêtes depuis n'importe quel domaine. En production, il est recommandé de restreindre les origines autorisées.

## 📝 Développement

### Scripts disponibles

- `npm test` : Lance les tests (non configurés actuellement)

### Structure des erreurs

L'API retourne des erreurs au format JSON :

```json
{
  "message": "Description de l'erreur"
}
```

## 🚀 Déploiement

Pour le déploiement en production :

1. Configurez les variables d'environnement pour MongoDB
2. Ajustez les paramètres CORS
3. Configurez le port via la variable d'environnement `PORT`
4. Assurez-vous que MongoDB est accessible
