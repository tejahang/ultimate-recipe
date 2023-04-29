## RecipeApp

An express app to generate a random recipe for you to cook from our pool of special recipe database.
### Features

- select wide range of recipes 
- user login and registration
- view images of what you'll be cooking
- leave a review about the recipe if logged in

## 1. Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/tejahang/ultimate-recipe.git
cd ultimate-recipe
```

## 2. Installation
Install the dependencies.
```bash
npm install
```

## 3. .ENV file

You might want to set up an **.env** file

```bash
DB_NAME='YOUR-DB-NAME'
DB_USERNAME='YOUR-DB-USERNAME'
DB_PASSWORD='YOUR-DB-PASSWORD'
```

## 3. create a database and run migrations

Unfortunately, you have to populate your own recipe data. 

`localhost:PORT/add_recipe.html` to add recipe.

