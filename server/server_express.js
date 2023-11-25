"use strict";
const express = require('express');
const cors = require('cors'); // Add this line to import the cors middleware
const dataHandler = require('./controllers/data_handler');



const app = express();
const port = 3000;

app.use(cors({
  origin:['http://127.0.0.1:5500']
})); // Enable CORS for all routes
app.use(express.json());

app.get('/',
  (req, res) => res.send('Hello DASWorld!')
);
app.route('/home').get(
  (req, res) => res.send('DASWorld Home')
);

//Ejercicio Users
app.route('/api/users')
  .get((req,res)=>{
    res.set('Content-Type','application/json');
    res.send(dataHandler.getUsers());
  })
  .post((req,res)=>{
    let user = req.body;
    dataHandler.createUser(user);
    res.type('text/plain');
    res.send('User ${user.nombre} was created');
  });





app.get('/api/users/:email', async (req, res) => {
  try {
    let email = req.params.email;

    // Buscar usuario por correo electrónico en la base de datos
    const user = await UserModel.findOne({ _email: email });

    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener información del usuario' });
  }
});

app.put('/api/users/:email', async (req, res) => {
  try {
    let email = req.params.email;
    let userUpdates = req.body;

    // Buscar y actualizar usuario por correo electrónico en la base de datos
    const user = await UserModel.findOneAndUpdate({ _email: email }, userUpdates, { new: true });

    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});

app.delete('/api/users/:email', async (req, res) => {
  try {
    let email = req.params.email;

    // Buscar y eliminar usuario por correo electrónico en la base de datos
    const user = await UserModel.findOneAndDelete({ _email: email });

    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
});







//Movies

app.route('/api/movies')
  .get((req,res)=>{
    res.set('Content-Type','application/json');
    res.send(dataHandler.getMovies());
  })
  .post((req,res)=>{
    let movie = req.body;
    dataHandler.createMovie(movie);
    res.type('tet/plain');
    console.log(`movie ${movie.nombre} was created`);
  });


  app.route('/api/movie/:movie')
  .get((req,res)=>{
      let movie = req.params.movie;
      res.json(dataHandler.getMovieByTitle(movie));
  })
  .delete((req,res)=>{
    let movie = req.params.movie;

    res.type('text/plain');
    console.log(`movie ${movie.title} was updated`);
  })





  app.route('/api/series')
  .get((req,res)=>{
    res.set('Content-Type','application/json');
    res.send(dataHandler.getSeries());
  })
  .post((req,res)=>{
    let serie = req.body;
    dataHandler.createSerie(serie);
    res.type('tet/plain');
    console.log(`serie ${serie.title} was created`);
  });





app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})