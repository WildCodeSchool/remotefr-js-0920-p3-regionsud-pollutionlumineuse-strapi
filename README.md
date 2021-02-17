# Kit Pollution Lumineuse - Application serveur

## Un projet Région Sud / Wild Code School

Le projet *Kit Pollution Lumineuse* a été réalisé entre les mois de décembre 2020 et février 2021 par des étudiants en développement web du campus "remote" de la Wild Code School, en partenariat avec les porteurs de projet de Région Sud.

Pour le cursus *développement web* de la  la Wild Code School, dans sa déclinaisaon *JavaScript / React / Node.js*, les projets de fin de formation comportent typiquement deux applications : une application serveur basée sur Node.js, une application cliente développée en React.

Ce dépôt contient le code source de la partie **serveur** du projet *Kit Pollution Lumineuse*.

Celui-ci a été réalisé en langage JavaScript avec le framework / CMS [Strapi](https://strapi.io), s'exécutant dans l'environnement [Node.js](https://nodejs.org), et stockant ses données dans une base relationnelle [SQLite](https://www.sqlite.org/index.html).

Strapi permet de créer rapidement une "API REST", en configurant les modèles de données via une interface graphique. Les "endpoints" de l'API REST sont automatiquement générés par Strapi lorsqu'on sauvegarde un nouveau modèle. Strapi est très adadpté pour notre usage : permettre de mettre à jour les données du site, sans devoir développer manuellement toute une interface d'administration.

Les sections suivante donnent :

* Les instructions pour [démarrer le projet sur un poste de développement](#lancement-etou-développement-en-local),
* Les instructions pour le [déploiement sur un serveur en production](#déploiement-sur-un-serveur-en-production), pour la partie cliente ([dépôt](https://github.com/WildCodeSchool/remotefr-js-0920-p3-regionsud-pollutionlumineuse-front)) comme pour la partie serveur.

## Lancement et/ou développement en local

### Pré-requis

* Un ordinateur fonctionnant sous Windows, Mac OS ou Linux,
* 4 Go de RAM (8 Go recommandés),
* 1 Go d'espace disque disponible,
* Git,
* L'accès à un terminal : PowerShell ou Git Bash (fourni avec Git) sous Windows, Termminal sous Mac OS, etc.,
* La plate-forme Node.js

Pour installer Node.js : bien qu'il soit possible d'utiliser [l'installeur officiel](https://nodejs.org/en/download/), il est recommandé d'utiliser :

* [NVM](https://github.com/nvm-sh/nvm) pour les systèmes de la famille Unix (dont Mac OS et Linux)
* [NVM-Windows](https://github.com/coreybutler/nvm-windows) pour Windows (qui diffère de NVM malgré son nom)

Ces deux outils permettent d'installer différentes versions de Node.js. Mais pour un développeur, l'intérêt de NVM, ou de sa contrepartie pour Windows, réside avant tout dans la possibilité d'installer des "modules" ou "packages" NPM, de façon globale, sans nécessiter les droits administrateur sur le système.

#### Installation de Node.js sous Mac OS ou Linux

Pour installer NVM, il faut d'abord ouvrir un terminal et de lancer **l'une** de ces deux commandes :

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

ou

    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

Après quoi, il est recommandé de quitter le terminal, puis de le relancer.

On peut ensuite utiliser NVM installer la dernière version LTS (*Long Term Support*) via la commande :

    nvm install --lts

Après quoi il est possible de vérifier l'installation correcte de Node.js et de son gestionnaire de paquets NPM (ces deux commandes affichant leurs versions respectives) :

    node -v
    npm -v

#### Installation de Node.js sous Windows

Pour installer NVM-Windows, il faut se rendre sur la [section "Releases" du dépôt sur GitHub](https://github.com/coreybutler/nvm-windows/releases). De là, il faut télécharger l'une des archives au format ZIP proposées : choisissez le fichier intitulé `nvm-setup.zip`, qui contient un installeur/désinstalleur.

Après avoir extrait les fichiers de l'archive, lancé l'installeur et suivi le processus d'installation jusqu'au bout, il sera possible d'installer Node.js via NVM-Windows, depuis n'importe quel terminal **en mode administrateur** - PowerShell ou [Git Bash](https://git-scm.com/download/win) (terminal fourni avec Git, émulant le terminal des systèmes Linux). Pour plus de détails, voir la section [Usage](https://github.com/coreybutler/nvm-windows#usage) de la documentation.

On peut installer la dernière version stable de Node.js via `nvm install latest`, mais nous recommandons là aussi la version LTS. On peut vérifier celle-ci sur la [page d'accueil de Node.js](https://nodejs.org/en/). Par exemple, pour installer la LTS en vigueur en février 2021 (14.15.5), on utilise `nvm install 14.15.5`.

Après quoi, il est possible, comme pour les systèmes Mac OS et Linux, de vérifier l'installation, en affichant les versions respectives de Node.js et de NPM via ces deux commandes :

    node -v
    npm -v

### Installation du projet

La seule phase spécifique à un système d'exploitation étant passée, les étapes qui suivent sont communes à tous les systèmes.

#### Récupération du code en local

Pour installer le projet en local, il faut récupérer son code :

* Soit en clonant ce dépôt (indispensable si on veut travailler en bénéficiant de la gestion de version par Git),
* Soit en récupérant simplement une archive ZIP du code (si on souhaite juste lancer le projet, sans nécessité de le faire évoluer)

#### Installation des dépendances

Après quoi, il est nécessaire d'ouvrir un terminal pour installer les dépendances du projet (les "modules" tiers JavaScript, provenant de [npmjs.com](https://www.npmjs.com/)).

Après s'être placé *dans le dossier* du dépôt cloné (ou extrait du ZIP), on lance :

    npm install

#### Configuration

Les projets Node.js côté serveur peuvent être paramétrés via un fichier `.env` (qui, contrairement à ce qui se fait côté client avec React, **doit** être ignoré de Git), exploité par la bibliothèque [dotenv](https://github.com/motdotla/dotenv).

Il faut, *si besoin*, créer une copie du fichier "caché" `.env.example`, sous le nom `.env`, et adapter les variables à son environnement local.

* `HOST` permet, si elle est décommentée, de restreindre l'accès à Strapi. Attention, cela restreint a priori **tous** les accès, à l'API comme au panneau d'administration.
* `PORT` contrôle le port d'écoute du serveur. La valeur par défaut est 1337.
* `ADMIN_JWT_SECRET` doit contenir une chaîne de 32 caractères permettant de "signer" des JSON Web Tokens. Cette clé secrète peut être générée via un gestionnaire de mots de passe, un [outil CLI](https://github.com/krcgk/randomkeygen) ou encore le site [RandomKeygen](https://randomkeygen.com/) (par exemple sous "CodeIgniter Encryption Keys").
* `PUBLIC_URL` est l'URL sur laquelle est déployée l'application serveur. En local, si on laisse le port sur 1337, cette URL serait logiquement `http://localhost:1337`.
* `DATABASE_FILENAME` est utilisé par Strapi, configuré ici pour SQLite, pour savoir quel fichier contiendra la base de données.

### Lancement

Une fois configurée, l'application peut être lancée, toujours depuis un terminal :

* en mode développement via `npm run develop`,
* en mode production via `npm start`

L'application devient accessible via l'adresse locale <http://localhost:1337>. Elle se rafraîchit automatiquement, dès lors qu'on édite des fichiers dans les sous-dossiers du dépôt.

On peut tester le "build" (génération de l'application finale destinée à être déployée) en local, via `nom run build`.

## Déploiement sur un serveur en production

Cette procédure détaille toute la configuration d'un serveur "privé", destiné à héberger à la fois les composantes **serveur** et **client** du projet.

Les projets Node.js / React développés à la Wild Code School sont habituellement hébergés sur des "VPS" loués par des hébergeurs tels qu'OVH. La Région Sud possède sa propre infrastructure, mais l'environnement reste très proche d'un VPS habituel sous Linux. La différence majeure est qu'on ne s'occupe pas ici d'attribuer un nom de domaine ou sous-domaine au serveur de production, ni de générer les certificats SSL.

### Point de départ

Une VM a été pré-installée sous Linux Debian/Buster (10.x) et a été mise à notre disposition pour effectuer le déploiement.

Cette VM est partagée entre les deux projets réalisés pour Région Sud : *Kit Pollution Lumineuse* ("KPL") et *Carte d'Identité du Territoire* ("CITer").

Outre le système Debian de base, plusieurs paquets logiciels ont été installés, avant que les accès à la VM ne nous soient transmis :

* Git,
* Le serveur web [Apache](https://httpd.apache.org/),
* [Node.js](https://nodejs.org), dans sa dernière version _stable_ (15.x) mais non-LTS (les versions _Long Term Support_ portant des numéros pairs), depuis les dépôts [NodeSource](https://github.com/nodesource/distributions#installation-instructions),
* [PHP](https://php.net) en version 8, depuis les dépôts mis à disposition par [Ondřej Surý](https://github.com/oerdnj) : [instructions pour Debian](https://github.com/oerdnj/deb.sury.org/wiki/Frequently-Asked-Questions#debian).

### Plan de la procédure

Ce qui suit est la procédure qui a été suivie pour déployer les deux projets, à partir de ce point de départ. Il s'agissait essentiellement de récupérer les projets depuis leurs dépôts GitHub, de les configurer, et de configurer le serveur Apache.

Pour éviter d'indiquer l'adresse IP publique du serveur, on indiquera `w.x.y.z` pour s'y référer dans la suite de cette documentation.

Sauf mention contraire,

* Installation d'etckeeper
* Rétrogradation Node de 15 à 14
* Création d'un utilisateur non-privilégié pour Node.js
* Récupération des dépôts du projet KPL
* Configuration et build des applications client/serveur de KPL
* Modification du virtual host par défaut d'Apache
* Activation des modules proxy d'Apache
* Harden Apache
* Firewall
* Installation pm2
* pm2 as service
* Installation MariaDB (citer) + créa user + BDD

### Installation de etckeeper

[etckeeper](https://etckeeper.branchable.com/) permet de suivre les modifications du répertoire `/etc` via Git, Mercurial, etc. C'est à la fois une sécurité, en cas de manipulation accidentelle sur un fichier de configuration important, et une manière de garder un historique des opérations effectuées (notamment sur la configuration d'Apache).

    sudo apt-get install -y etckeeper

### Rétrogradation de Node.js de 15.x à 14.x

L'application serveur du projet KPL est un projet [Strapi](https://strapi.io). Lors d'une première tentative d'installation de ses dépendances, un message d'erreur indiquait que la version de Node.js installée sur le système ne faisait pas partie des versions compatibles, spécifiées dans son `package.json`, via la clé `engines`.

Nous avons donc commencé par désinstaller Node.js, puis supprimer le PPA pour Node 15.x :

    sudo apt-get remove nodejs
    sudo rm /etc/apt/sources.list.d/nodesource.list

Nous avons ensuite installé le PPA pour Node 14.x :

    curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt-get install -y nodejs

### Création d'un utilisateur non-privilégié pour Node.js

Utiliser le compte `root` pour lancer les applications Node.js est à proscrire, et ce pour plusieurs raisons :

* Utiliser les privilèges `root` rendrait le serveur plus vulnérable à l'exploitation de failles de sécurité de Node.js,
* Ces privilèges ne sont nécessaires que si on veut qu'une application Node écoute sur un port "protégé" (inférieur à 1024), comme le port 80,
* Sachant qu'on veut réserver le port 80 à Apache, on pourra rediriger certaines requêtes entrantes d'Apache vers un processus Node écoutant sur un autre port.

On crée donc un compte utilisateur `nodejs` (dont le mot de passe est à communiquer en privé au porteur de projet).

    sudo adduser nodejs

### Déploiement de l'application cliente du projet KPL

Avant toute chose, on utilise le compte `nodejs` créé à l'étape précédente :

    su - nodejs

#### Récupération du code source via Git

Puis on clone le dépôt de l'application cliente du projet KPL :

    git clone https://github.com/WildCodeSchool/remotefr-js-0920-p3-regionsud-pollutionlumineuse-front kpl-frontend

#### Paramétrage via le fichier d'environnement

On se place dans le dossier `kpl-frontend` pour y installer ses dépendances et créer le fichier de variables d'environnement, à partir du modèle fourni par le fichier `.env.example`.

    cd kpl-frontend
    npm install
    cp .env.example .env.production.local

Pour éditer ce fichier, au moins deux informations nous sont nécessaires (voir la section Configuration du [dépôt de l'application cliente](https://github.com/WildCodeSchool/remotefr-js-0920-p3-regionsud-pollutionlumineuse-front)).

Avant de les renseigner, il faut prendre ceci en considération : toutes les applications hébergées sur la VM étant, à terme, accessibles depuis l'extérieur via un sous-domaine unique, un seul "Virtual Host" Apache gèrera tout le trafic HTTP entrant sur la VM.

C'est donc sous un certain _sous-répertoire_, à partir de l'URL de base du serveur, que chaque application (cliente ou serveur) sera accessible. **En attendant d'avoir une URL définitive en HTTPS** (par exemple <https://sub.domain.org>), on va, pour chaque application, utiliser l'adresse IP publique du serveur, suivie d'un chemin relatif.

Voici donc les deux variables à renseigner en priorité :

* `REACT_APP_URL_API`, prenant comme valeur L'URL publique de l'application serveur. Ici, ce sera `http://w.x.y.z/kpl-api`.
* `REACT_APP_ROUTER_BASENAME`, le chemin relatif servant de base (_basename_) au système de routage utilisé par l'application React (en l'occurence la bibliothèque React Router, et plus particulièrement son composant [BrowserRouter](https://reactrouter.com/web/api/BrowserRouter)). Si on souhaite accéder à l'application depuis l'URL publique `http://w.x.y.z/kit-pollution-lumineuse`, on lui affecte la valeur `/kit-pollution-lumineuse`.

La valeur définitive de la variable `REACT_APP_URL_FORMULAIRE` n'étant pas encore connue au moment de l'écriture du premier déploiement, et de l'écriture de cette documentation, on lui laisse une valeur par défaut (qui est la page d'accueil du SIT des Parcs Naturels Régionaux de PACA).

Voici donc le contenu du fichier `.env.production.local` (commentaires omis ici, par souci de concision) :

```
REACT_APP_URL_API=http://w.x.y.z/kpl-api
REACT_APP_URL_FORMULAIRE=http://geo.pnrpaca.org/
REACT_APP_ROUTER_BASENAME=/kit-pollution-lumineuse
```

#### Lancement du _build_

Pour effectuer le build correctement, on a besoin de connaître l'URL publique via laquelle l'application sera accessible. Ici, `http://w.x.y.z/kit-pollution-lumineuse`.

On peut et on doit, au moment du build, positionner la variable `PUBLIC_URL`, en lui donnant cette valeur (alternativement, on pourra renseigner la propriété `homepage` dans le `package.json`, une fois l'URL définitive connue). Voici donc la commande complète :

    PUBLIC_URL=http://w.x.y.z/kit-pollution-lumineuse npm run build

L'application cliente ayant très peu de dépendances, cette phase de build est très rapide (< 1 minute). Lors de sa complétion, on obtient ce message, indiquant la taille des différentes _assets_ (CSS et JavaScript), et confirmant la prise en compte de l'URL publique :

```
File sizes after gzip:

  85.12 KB  build/static/js/2.1f7a1fb3.chunk.js
  5.83 KB   build/static/js/main.e654bcc7.chunk.js
  4 KB      build/static/css/main.cce14ffe.chunk.css
  812 B     build/static/js/runtime-main.f385746b.js

The project was built assuming it is hosted at http://192.168.1.39/kit-pollution-lumineuse/.
You can control this with the homepage field in your package.json.

The build folder is ready to be deployed.

Find out more about deployment here:

  bit.ly/CRA-deploy

```

Comme l'indique ce message, les assets se trouvent sous le dossier `build/static`. Le dossier `build` contient également un `index.html`, généré à partir du fichier `public/index.html`, ainsi que d'autres fichiers.

On peut installer la commande `tree` (`sudo apt-get install -y tree`), puis l'utiliser pour examiner la structure et le contenu du dossier `build` (`tree build/`) :

```
build/
├── asset-manifest.json
├── index.html
├── precache-manifest.a6566c291734543a0c01b33ffbcdc336.js
├── service-worker.js
└── static
    ├── css
    │   ├── main.cce14ffe.chunk.css
    │   └── main.cce14ffe.chunk.css.map
    ├── js
    │   ├── 2.1f7a1fb3.chunk.js
    │   ├── 2.1f7a1fb3.chunk.js.LICENSE.txt
    │   ├── 2.1f7a1fb3.chunk.js.map
    │   ├── main.e654bcc7.chunk.js
    │   ├── main.e654bcc7.chunk.js.map
    │   ├── runtime-main.f385746b.js
    │   └── runtime-main.f385746b.js.map
    └── media
        ├── animation-nocturne.495cbb0d.jpg
        ├── backcardmemo.e518b748.png
        ├── background_article_essentiel.ee6bb484.jpg
        ├── icomoon.7034615a.svg
        ├── icomoon.79f6b11e.woff
        ├── icomoon.8a11bc82.ttf
        ├── icomoon.ad55172f.eot
        ├── jeu-pollution-lumineuse.b5873cad.jpg
        ├── kit-pratique-pour-rallumer-les-etoiles.a07f8949.PNG
        ├── le-cote-obscur-des-parcs-naturels-regionaux.e73fb291.PNG
        ├── livret-pedagogique-monde-nocturne.c20b370f.PNG
        ├── logo-PNR-PACA.89e59062.PNG
        ├── logosprnc.cb5ad317.png
        ├── pollution-lumineuse.044ec026.jpg
        └── topographic-map-pattern.d9cc30c0.png

4 directories, 28 files
```

On peut vérifier le contenu du fichier `build/index.html`, point d'entrée de l'application cliente, en lançant, toujours depuis `kpl-frontend`, la commande `cat build/index.html` (une partie a été volontairement coupée).

```
<!doctype html><html lang="fr"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="theme-color" content="#000000"/><meta name="description" content="Web site created using create-react-app"/><script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script><title>Geonrpacac</title><link href="http://192.168.1.39/kit-pollution-lumineuse/static/css/main.cce14ffe.chunk.css" rel="stylesheet"></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div><script><!-- ... --><script src="http://192.168.1.39/kit-pollution-lumineuse/static/js/2.1f7a1fb3.chunk.js"></script><script src="http://192.168.1.39/kit-pollution-lumineuse/static/js/main.e654bcc7.chunk.js"></script></body></html>
```

Il est intéressant de constater que les liens des assets (CSS via les `<link>`, JavaScript via les `<script>`) sont préfixés par l'URL publique. D'où l'importance de bien renseigner `PUBLIC_URL` lors du build, et de vérifier qu'elle a bien été prise en compte.

#### Lien symbolique vers le répertoire `/var/www/html`

Pour rendre accessible l'application cliente depuis la "document root" d'Apache, il suffit de créer un lien symbolique du dossier `build` vers le dossier `/var/www/html/kit-pollution-lumineuse` (le chemin `/kit-pollution-lumineuse` correspond au _basename_ du système de routage de React).

En étant revenu à un compte utilisateur ayant les droits sudo :

    sudo ln -s /home/nodejs/kpl-frontend/build /var/www/html/kit-pollution-lumineuse

On peut alors accéder à l'application depuis un navigateur, à l'adresse <http://w.x.y.z/kit-pollution-lumineuse>.

### Déploiement de l'application serveur du projet KPL

Pour les étapes qui suivent, on se reconnecte d'abord sous le compte `nodejs` : `su - nodejs`.

#### Récupération du code source via Git

Puis on clone le dépôt de l'application cliente du projet KPL :

    git clone https://github.com/WildCodeSchool/remotefr-js-0920-p3-regionsud-pollutionlumineuse-strapi kpl-strapi

#### Installation des dépendances

Comme pour l'application cliente, on se place dans le dossier `kpl-strapi` pour y installer ses dépendances.

> Note : l'application serveur Node.js / Strapi ayant été générée via le package manager [Yarn](https://yarnpkg.com) (une alternative à NPM, plus performante), on a d'abord installé celui-ci sur la VM (via un compte avec sudo) : `sudo npm install -g yarn` (bien qu'il soit plutôt déconseillé d'utiliser `sudo` pour installer des modules NPM en global). Puis on a utilisé `yarn` plutôt que `npm install` pour installer les dépendances.

Après coup, on a modifié le dépôt de l'application serveur, supprimant le "lockfile" de Yarn (`yarn.lock`) pour le remplacer par celui de NPM (`package-lock.json`), afin de ne pas avoir à installer quoi que ce soit en global.

    cd kpl-strapi
    npm install


#### Paramétrage via le fichier d'environnement

Pour créer le fichier de variables d'environnement, on se sert là encore du modèle fourni par le fichier `.env.example`. Par contre, on le copie en tant que `.env`.

    cp .env.example .env

Les paramètres de configuration ayant déjà été explicités dans la section Configuration de ce document, nous indiquons ici juste le contenu, sans les commentaires, du fichier `.env`.

La valeur de la clé secrète `ADMIN_JWT_SECRET` a bien sûr été changée, et l'IP réelle est toujours remplacée par `w.x.y.z` :

```
PORT=1337
ADMIN_JWT_SECRET=6uXwnCH0LMjkqZksqH9YVCssrzOUw3Mh
PUBLIC_URL=http://w.x.y.z/kpl-api
DATABASE_FILENAME=kpl-data.db
```

#### Récupération du contenu (BDD et fichiers médias)

Après la génération de l'application Strapi, les élèves ont créé les modèles de données via l'interface d'administration, et ont rempli la base de données. Cette phase incluait le téléversement de fichiers (notamment PDF), qui sont référencés dans la base de données, mais physiquement stockés sous le dossier `public/uploads`.

La base de données SQLite est stockée dans le fichier `kpl-data.db`.

À partir de leur travail, le script `backup.sh` a permis de faire une sauvegarde complète du contenu (dossier `public/uploads` et fichier `kpl-data.db`), dans une archive ZIP. On a récupéré cette archive ZIP (transmise au porteur de projet), et elle a été décompressée à la racine du dépôt sur le serveur.

    cd /home/nodejs/kpl-strapi
    unzip ../kpl-strapi-backup-2021MMDD.zip

#### Génération du _build_

Bien que ce ne soit pas systématiquement le cas pour des applications serveur Node.js, l'application Strapi fait l'objet d'une phase de _build_, qu'on initie en lançant `npm run build`, ou `yarn build` si on utilise Yarn.

Le _build_ est plus long que pour l'application React car Strapi comporte de nombreuses dépendances. Il est également plus consommateur de mémoire. Il arrive parfois que le build consomme toute la RAM disponible, et se solde par un échec. Dans ce cas, une solution possible est d'utiliser un autre package manager que celui utilisé pour l'installation des dépendances. Si cela ne suffit pas, on peut éventuellement ajouter du swap (cette question ne s'est pas posée sur la VM mise à disposition).

#### Installation de PM2

[PM2](https://pm2.keymetrics.io/) est un _process manager_ pour Node.js, permettant de mettre en production les applications Node.js, en gérant leur cycle de vie, leur démarrage en tant que services, etc. Pour l'installer (droits sudo requis) :

    sudo npm install -g pm2

#### Lancement de l'application serveur

Une des façons d'utiliser PM2 est d'utiliser un fichier `ecosystem.config.js`, qui permet de fournir des paramètres à PM2, tels que la (ou les) application(s) qu'il doit gérer. Ce fichier est présent à la racine du dépôt.

Pour lancer l'application Strapi en mode production (à nouveau en tant qu'utilisateur `nodejs`, sous le dossier `/home/nodejs/kpl-strapi`) :

    pm2 start ecosystem.config.js --env production

Un long message s'affiche, se terminant par des indications de statut :

```
[PM2] Spawning PM2 daemon with pm2_home=/home/nodejs/.pm2
[PM2] PM2 Successfully daemonized
[PM2][WARN] Applications kpl-strapi not running, starting...
[PM2] App [kpl-strapi] launched (1 instances)
┌─────┬───────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name          │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼───────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ kpl-strapi    │ default     │ 0.1.0   │ fork    │ 613      │ 0s     │ 0    │ online    │ 0%       │ 29.8mb   │ nodejs   │ disabled │
└─────┴───────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```

À tout moment, il est possible de vérifier le statut de toutes les applications via `pm2 status`, ou d'une application spécifique, en ajoutant son id (1ère colonne) ou son nom (2ème colonne) aux arguments (`pm2 status 0` ou `pm2 status kpl-strapi`).

La commande `pm2 log` permet, quant à elle, d'accéder aux logs, soit de toutes les applications, soit d'une application spécifique (`pm2 log 0` ou `pm2 log kpl-strapi`).

Voir la documentation de PM2, ou `pm2 --help`, pour des détails sur les autres commandes (`stop`, `restart`, etc.).

À partir de là, il doit être possible de contacter l'application serveur, depuis la VM, via `curl localhost:1337`. Mais le port 1337 n'étant pas ouvert, pour accéder à l'application depuis l'extérieur, il va nous falloir mettre en place un "reverse proxy" d'Apache vers le port 1337.

#### Gérer les processus Node.js comme des services

Il est possible de faire en sorte que les processus Node.js lancés par PM2 soient gérés comme des services via systemd. Plus de détails [ici](https://pm2.keymetrics.io/docs/usage/startup/).

On commence, sous le compte `nodejs`, par lancer :

    pm2 startup

Cette commande nous donne en sortie une autre commande, à exécuter avec les droits sudo. On sort donc du compte `nodejs` pour lancer cette commande, avec un utilisateur du groupe sudo :

    sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u nodejs --hp /home/nodejs

Enfin, on peut "figer" les processus à redémarrer automatiquement :

    sudo -u nodejs pm2 save

#### Modification du virtual host par défaut d'Apache

Contrairement à l'application cliente, qu'on pouvait rendre accessible via un simple lien symbolique dans la "document root" `/var/www/html`, on doit ici faire en sorte que les requêtes HTTP arrivant sur un certain chemin relatif soient redirigées vers l'application Strapi, donc vers le port 1337.

Avec un compte sudo, on édite le virtual host par défaut d'Apache :

    sudo vim /etc/apache2/sites-available/000-default.conf

On y ajoute ces lignes (sous `DocumentRoot`) :

        # Proxy all requests on /kpl-api to port 1337,
        # which is Node.js/Strapi backend for kit-pollution-lumineuse
        ProxyPass "/kpl-api"  "http://localhost:1337"

On peut se placer sous `/etc` puis "committer" les changements effectués :

    sudo git add apache2/sites-available/000-default.conf
    sudo git commit -m "Proxy incoming requests on /kpl-api to Node app on port 1337"

Puis on redémarre Apache :

    sudo systemctl restart apache2

Ce qui se solde par un message d'erreur :

    Job for apache2.service failed because the control process exited with error code.
    See "systemctl status apache2.service" and "journalctl -xe" for details.

Un extrait de la sortie de `sudo journalctl -xe` nous indique où se situe le problème :

    Feb 17 07:32:01 debianvm apachectl[825]: AH00526: Syntax error on line 16 of /etc/apache2/sites-enabled/000-default.conf:
    Feb 17 07:32:01 debianvm apachectl[825]: Invalid command 'ProxyPass', perhaps misspelled or defined by a module not included in the server configuration
    Feb 17 07:32:01 debianvm apachectl[825]: Action 'start' failed.

Pour le résoudre, il nous faut installer les modules proxy pour Apache (si une de ces commandes échoue, installer le paquet `apache2-bin`) :

    sudo a2enmod proxy
    sudo a2enmod proxy_http
    sudo a2enmod proxy_connect

À nouveau, sous `/etc`, on peut committer les changements :

    sudo git add apache2/mods-enabled
    sudo git commit -m "Enable apache2 proxy modules"

On redémarre à nouveau Apache :

    sudo systemctl restart apache2

On peut alors accéder à la "page d'accueil" du backend Node.js / Strapi, via l'URL <http://w.x.y.z/kpl-api>. On peut tester les "endpoints" de l'API, relatifs à cette URL, par exemple `/definitions`. Depuis un poste local :

    curl http://w.x.y.z/kpl-api/definitions

On obtient en sortie des données en JSON :

    [{"id":1,"title":"Pollution lumineuse","description":"Pollution gênante et anormale liée à la présence nocturne de l’éclairage artificiel et qui a des conséquences sur la faune, la flore, les écosystèmes ainsi que sur la santé humaine...","published_at":"2021-01-06T10:38:12.057Z","created_at":"2021-01-06T10:38:06.602Z","updated_at":"2021-01-06T10:38:12.076Z"},...]

> À ce stade, on doit pouvoir naviguer dans toutes les pages de l'application cliente sur l'URL <http://w.x.y.z/kit-pollution-lumineuse>. Les 5 pages "L'essentiel", "Définitions", "Les outils", "Jouer" et "Ressources" doivent s'afficher correctement, car elles peuvent désormais charger les données qui leur sont nécessaires depuis le backend Strapi.

Il reste une dernière modification à apporter : en l'état, tout se passe bien si on arrive sur l'application cliente via sa page d'accueil. Mais si on s'y rend via une autre page (par exemple, si on a mis la page "Ressources" dans ses marque-pages), on écope de la page d'erreur 404 d'Apache : "**Not Found** - The requested URL was not found on this server."

Il faut donc faire en sorte que *toute* requête arrivant sur le chemin relatif `/kit-pollution-lumineuse`, ou un de ses "descendants", atterrisse sur la page `index.html` du build de l'application React. Pour cela, on modifie à nouveau le virtual host par défaut d'Apache :

    sudo vim /etc/apache2/sites-available/000-default.conf

On y ajoute ces lignes (sous la ligne `ProxyPass` ajoutée précédemment) :

        # All URLs not matching a filename should fall back to the React app's index
        <Directory "/var/www/html/kit-pollution-lumineuse">
                FallbackResource "/kit-pollution-lumineuse/index.html"
        </Directory>

La directive `FallbackResource` permet d'indiquer la page à servir en lieu et place de la page d'erreur 404. À nouveau, on peut committer les changements via etckeeper :

    sudo git add apache2/sites-available/000-default.conf
    sudo git commit -m "Fall back to React app's index.html for KPL pathname"

Puis on redémarre Apache : `sudo systemctl restart apache2`.

> :trophy: Le déploiement de l'application Kit Pollution Lumineuse est terminé.

Il restera à régler certains paramètres d'Apache, ce qu'on verra à la toute fin. Il s'agit essentiellement de sécuriser l'installation d'Apache, en suivant par exemple les conseils de l'article [Apache Security – 10 Tips for a Secure Installation](https://www.acunetix.com/blog/articles/10-tips-secure-apache-installation/).
