# Grosik [MVP]
Grosik is a home budget app. This project is the MVP version and it will be developing consistently.

#### Table of Contents:
1. [App Description](https://github.com/patrykjachowski/grosik#app-description)
2. [Installation](https://github.com/patrykjachowski/grosik#installation)
3. [Roadmap, future plans](https://github.com/patrykjachowski/grosik#roadmap)

- - - -

## App description:
The main goal of the Grosik is for you to have a full control over your budget. 

The flow of the app:
1. You create your categories which you spend your money on: 
	* typical every month: groceries, shopping, electricity etc.
	* your future goals: new car, new laptop etc.
2.  You import transactions from your bank accounts and and assign it to proper category.
3. You assign max value for each category you can spend money on.
4. You see how much money you spend on each categories based on transactions.
5. If you overspending your money on a single category you must give it back from another one, maybe vacation?

The key to successful budgeting is to assign every money to categories. There is no „free money”. There is always a target, even a very far.

#### Tech stack:
**Frontend:** 

* React.js
* Redux
* Material-UI

**Backend:**  

* Symfony
* api-platform
* MySQL 

#### Screenshots:

![Grosik1](https://github.com/patrykjachowski/grosik/blob/develop/assets/images/grosik1.png?raw=true)  

![Grosik2](https://github.com/patrykjachowski/grosik/blob/develop/assets/images/grosik2.png?raw=true)

- - - -

## Installation

The installation process assumes you already have `docker` and  `docker-compose` installed on you system.

0. Directory
1. Docker image
2. Composer
3. Migrations
4. Fixtures
5. JavaScript
6. Run the app


### 0. Clone the repo and go to new directory
```sh
cd grosik
```


### 1. Docker image
Run:
```sh
docker-compose up -d
```


### 2. Composer
Run:
```sh
docker-compose run php composer install
```


### 3. Migrations
Run couple times:
```sh
docker exec -it grosik-php bin/console doctrine:migrations:migrate --no-interaction
```

there could be an error during migrations: `There is no active transaction` . If you know the cause please tell me me how to fix the error :) or you can repeat migration command until you got info:
```sh
[OK] Already at the latest version ("DoctrineMigrations\Version20210118141034") 
```


### 4. Fixtures
Run:
```sh
docker exec -it grosik-php bin/console doctrine:fixtures:load
```


### 5. JavaScript
Run:
```sh
docker exec -it grosik-php npm run install
docker exec -it grosik-php npm run run dev
```


### 6. Run the app
You use the app by going to localhost on the browser.


### Exit project
Run:
```sh
docker-compose down
```


### Troubleshooting
Make sure you have unlocked port :8000 on your localhost to get the app running.

- - - -

## Roadmap:

##### Features implemented:
- [x] Import transactions from CSV file and parsing them as data. *
- [x] Budgeting subcategories based on date - calendar months
- [x] Autotracking expenses based on transactions
- [x] Display info about budgeting: insufficient, overbudget, equal

* currently only mBank statement (csv) is supported

#### Todo:

- [ ] Change transaction/subcategory edit UI - sidebar instead input
- [ ] Support for multiple banks and multiple bank accounts
- [ ] Support for multiple banks and multiple bank accounts
- [ ] Draggable categories, custom order
- [ ] Transaction subcategory proposals
- [ ] Extended user action logs
- [ ] Export data / backup
- [ ] Prevent importing transaction duplicates
- [ ] Demo tour
- [ ] Styling / responsiveness
- [ ] Mobile app

#### Ideas:

- [ ] Sending csv file to the app email and automatically parsing them from inbox
- [ ] Proposal transactions base on history, annotations, reminders


