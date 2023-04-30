## RecipeApp

An express app that generates a random recipe from our database for users to cook.

### Features

- (admin) add a wide range of recipes

- (user) login and registration

- (user) view recipes + images of what they'll be cooking

- (user) leave a review about the recipe if logged in

---

## Things to note before setting up & running this application

- This repo utilizes the following:

- 'Express' - Node.js web application framework

- 'Postgres' for database management

- 'Knex' for database querying

- 'PassportJS' for authentication

- 'Express-Handlebars' for templating

- A database administration tool to view database data (e.g. DBeaver)

## 1. Common setup

Clone the repo and install the dependencies.

```bash

git clone  https://github.com/tejahang/ultimate-recipe.git

cd  ultimate-recipe

```

## 2. Installation

Install the dependencies.

```bash

npm install

```

## 3a. '.env' file

Set up an **.env** file in your root directory

```bash

DB_NAME='YOUR-DB-NAME'

DB_USERNAME='YOUR-DB-USERNAME'

DB_PASSWORD='YOUR-DB-PASSWORD'

```

## 3b. Local-strategy.js > Knex function

Update same database, user, and password fields as .ENV file

## 4. Create a database in Postgres (same name as DB_NAME); run Knex migration to create empty data tables

## 5. Run the express application using index.js

- `localhost:PORT/` should return the landing page a member sees once logged in.

- Currently, no recipes will show if 'Show Me' button is clicked

## 6. Populate 'recipe' table with data

- Populate data by going to `localhost:PORT/add_recipe.html` admin page to add recipe(s)

- Each successfully added recipe will randomly display on landing page when 'Show Me' button is clicked

## 7. Interact with different buttons (i.e. routes) & functionalities in app

- Currently if you try to submit a review for a recipe, it will redirect you to a sign-up page

## 8. Populate 'user' table with data

- Populate data via `localhost:PORT/signup.html`

- Once data is recorded, you will be redirected to `localhost:PORT/login.html`

- Sign in with newly created credentials; you can now successfully submit a review for a recipe
