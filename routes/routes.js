const passport = require('passport');
const multer = require('multer');
const knex = require('./../database');

// Multer middleware
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img');
  },
  filename: (req, file, cb) => {
    // user-567sdcsd67dbcd-34567.jpg
    const ext = file.mimetype.split('/')[1];
    cb(null, `${Date.now()}.${ext}`);
  },
});

const upload = multer({
  storage: multerStorage,
});

module.exports = (express) => {
  const router = express.Router();

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/signup');
  }

  // HOME Page
  router.get('/', (req, res) => {
    const user = req.user;
    res.locals.user = user;
    res.render('welcome');
  });

  // GET a Random Recipe
  router.get('/random-recipe', async (req, res) => {
    try {
      const recipe = await knex('recipe').select('*');
      const rand = Math.floor(Math.random() * recipe.length); // random number generator
      // res.send(recipe.rows[rand]); // get one random recipe
      const user = req.user;
      res.locals.user = user;
      const one_recipe = recipe[rand];
      const ingredients = one_recipe.ingredients.split(',');
      res.render('recipe', { recipe: { one_recipe, ingredients } });
    } catch (error) {
      console.log(error.message);
    }
  });

  // POST Recipe
  router.post('/add-recipe', upload.single('image'), async (req, res) => {
    try {
      const image = req.file.filename;
      const { name, description, ingredients, instructions } = req.body;
      await knex('recipe').insert({
        name: name,
        description: description,
        ingredients: ingredients,
        instructions: instructions,
        image: image,
      });
      // res.redirect('/login');
      // res.send(new_recipe);
      res.redirect('/add_recipe.html');
    } catch (error) {
      console.log(error);
    }
  });

  // ADD a review
  router.post('/add-review', isLoggedIn, async (req, res) => {
    try {
      const { review, recipeid, userid } = req.body;
      const user = req.user;
      res.locals.user = user;
      await knex('review').insert({
        review: review,
        recipe_id: recipeid,
        user_id: userid,
      });
      res.render('recorded', { message: 'You review has been recorded' });
    } catch (error) {
      console.log(error);
    }
  });

  router.get('/error', (req, res) => {
    res.send("You've not logged in. Please login.");
  });

  ////////////////////////////////////
  // A U T H
  router.get('/login', (req, res) => {
    res.sendFile(`${process.cwd()}/public/login.html`);
  });

  router.get('/signup', (req, res) => {
    res.sendFile(`${process.cwd()}/public/signup.html`);
  });

  router.get('/logout', (req, res) => {
    req.logout(function (err) {
      if (err) return next(err);
      res.redirect('/login');
    });
  });

  ////////////////////////////////////////
  // P O S T
  router.post(
    '/login',
    passport.authenticate('local-login', {
      successRedirect: '/',
      failureRedirect: '/error',
    })
  );

  router.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/login',
      failureRedirect: '/error',
    })
  );

  // [404 : Handler] [default page - if URL doesn't match any resource]
  router.all('*', (req, res) => {
    res.render('404');
  });

  return router;
};
