"use strict";
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
//const dataHandler = require('./controllers/data_handler');
const app = express();
const port = 3000;

// Configuración de CORS
app.use(cors());
// Habilitar el uso de JSON en las solicitudes
app.use(express.json());

// URL de conexión a MongoDB
const mongoUrl = 'mongodb+srv://admin:admin@cinewave.7lkndu5.mongodb.net/CineWave';
const db = mongoose.connection;

// Conectar a MongoDB
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a MongoDB');
});

//**Esquema de Media**//
const mediaSchema = new mongoose.Schema({
    title: String,
    director: String,
    year: Number,
    genre: [String],
    img: String,
    video: String
});

//**Esquema de User**//
const userSchema = new mongoose.Schema({
    _uid: String,
    _nombre: String,
    _apellidos: String,
    _email: String,
    _password: String,
    _fecha: String,
    _sexo: String,
    _imagen: String,
    profiles: {
        type: Map,
        of: {
            _imagen: String,
            _myList: [mediaSchema],
            _watching: [{
                media: mediaSchema,
                progress: Number
            }]
        }
    }
});

//**Esquema de Pelicula**//
const movieSchema = new mongoose.Schema({
    title: String,
    director: String,
    year: Number,
    genre: [String],
    imageURL: String,
    video: String
});

//**Esquema de Serie**//
const serieSchema = new mongoose.Schema({
    title: String,
    director: String,
    year: Number,
    genre: [String],
    imageURL: String,
    videos: [String]
});

//**Definicion de Modelos**//
const UserModel = mongoose.model("User", userSchema);
const MovieModel = mongoose.model("Movie", movieSchema);
const SerieModel = mongoose.model("Serie", serieSchema);

//**GET all Users**//
app.get('/api/user', async (req, res) => {
    try {
      // Buscar todos los usuarios en la base de datos
      const users = await UserModel.find({});
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
    }
});








app.post('/api/user', async (req, res) => {
  try {
    let newUser = req.body;

    // Verifica si el correo electrónico ya existe en la base de datos
    const existingUser = await UserModel.findOne({ _email: newUser._email });

    if (existingUser) {
      // Si el correo electrónico ya existe, responde con un error
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    // Crea una instancia del modelo User con los datos proporcionados
    const user = new UserModel(newUser);

    // Guarda el nuevo usuario en la base de datos
    await user.save();

    // Responde con el usuario recién creado
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar un nuevo usuario' });
  }
});


//**POSTEAR un perfil**//
app.post('/api/users/:email/profiles', async (req, res) => {
  try {
    let email = req.params.email;
    let newProfile = req.body;

    // Buscar usuario por correo electrónico en la base de datos
    const user = await UserModel.findOne({ _email: email });

    // Verificar si se proporcionó un profileId en el cuerpo de la solicitud
    if (!newProfile || !newProfile.profileId) {
      res.status(400).json({ error: 'El cuerpo de la solicitud debe contener un profileId' });
      return;
    }

    // Verificar si ya hay 4 perfiles
    const profileKeys = user.profiles.size;
    if (profileKeys>= 4) {
      res.status(400).json({ error: 'No se pueden agregar más de 4 perfiles' });
      return;
    }

    // Añadir el nuevo perfil al mapa de perfiles del usuario usando el profileId proporcionado
    user.profiles.set(newProfile.profileId, newProfile);

    // Guardar los cambios en la base de datos
    await user.save();

    res.status(201).json(newProfile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al agregar un nuevo perfil al usuario' });
  }
});

//**GET del usuario por email**//
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
  
  //**PUT para actualizar datos del usuario por email**//
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
  
  //**Borrar usuario por email**//
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
  
  //**GET de perfiles de un usuario por email**//
  app.get('/api/users/:email/profiles', async (req, res) => {
    try {
      let email = req.params.email;
  
      // Buscar usuario por correo electrónico en la base de datos
      const user = await UserModel.findOne({ _email: email });
  
      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }
  
      res.json(user.profiles);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al obtener información del usuario' });
    }
  });








  //**GET de perfiles de un usuario por email**//
  app.get('/api/users/:email/:profile/myList', async (req, res) => {
    try {
      let email = req.params.email;
      let profile = req.params.profile;

      // Buscar usuario por correo electrónico en la base de datos
      const user = await UserModel.findOne({ _email: email });
      const prof = await UserModel.findOne({ profile: profile });
      if (!user && !prof) {
        res.status(404).json({ error: 'Usuario/Perfil no encontrado' });
        return;
      }
      console.log(user.profiles[prof]._myList)
      res.json(user.profiles[prof]._myList);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al obtener información del usuario' });
    }
  });



  



  // app.post('/api/users/:email/profiles', async (req, res) => {
  //   try {
  //     let email = req.params.email;
  //     let newProfile = req.body;
  
  //     // Buscar usuario por correo electrónico en la base de datos
  //     const user = await UserModel.findOne({ _email: email });
  
  //     if (!user) {
  //       res.status(404).json({ error: 'Usuario no encontrado' });
  //       return;
  //     }
  
  //     // Generar un nuevo identificador para el perfil
  //     const profileId = `profile_${Date.now()}`;
      
  //     // Añadir el nuevo perfil al mapa de perfiles del usuario
  //     user.profiles.set(profileId, newProfile);
  
  //     // Guardar los cambios en la base de datos
  //     await user.save();
  
  //     res.status(201).json({
  //       profileId,
  //       newProfile
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ error: 'Error al agregar un nuevo perfil al usuario' });
  //   }
  // });

  //**DELETE un perfil por su nombre**//
  app.delete('/api/users/:email/profiles/:profileId', async (req, res) => {
    try {
        let email = req.params.email;
        let profileId = req.params.profileId;

        // Buscar usuario por correo electrónico en la base de datos
        const user = await UserModel.findOne({ _email: email });

        if (!user) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        // Eliminar el perfil utilizando el profileId
        user.profiles.delete(profileId);

        // Guardar los cambios en la base de datos
        await user.save();

        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar el perfil del usuario' });
    }
});
  
  

// Movies

app.get('/api/movies', async (req, res) => {
    try {
      // Obtener todas las películas desde la base de datos
      const movies = await MovieModel.find({});
      res.json(movies);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al obtener la lista de películas' });
    }
  });
  
  app.post('/api/movies', async (req, res) => {
    try {
      let movie = req.body;
  
      // Crear y guardar la nueva película en la base de datos
      const newMovie = new MovieModel(movie);
      await newMovie.save();
  
      res.status(201).json(newMovie);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al insertar la película en la colección' });
    }
  });
  
  app.get('/api/movie/:title', async (req, res) => {
    try {
      let title = req.params.title;
  
      // Buscar película por título en la base de datos
      const movie = await MovieModel.findOne({ title });
  
      if (!movie) {
        res.status(404).json({ error: 'Película no encontrada' });
        return;
      }
  
      res.json(movie);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al obtener información de la película' });
    }
  });
  
  app.delete('/api/movie/:title', async (req, res) => {
    try {
      let title = req.params.title;
  
      // Eliminar película por título de la base de datos
      const deletedMovie = await MovieModel.findOneAndDelete({ title });
  
      if (!deletedMovie) {
        res.status(404).json({ error: 'Película no encontrada' });
        return;
      }
  
      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al eliminar la película' });
    }
  });
  
  // Series
  
  app.get('/api/series', async (req, res) => {
    try {
      // Obtener todas las series desde la base de datos
      const series = await SerieModel.find({});
      res.json(series);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al obtener la lista de series' });
    }
  });
  
  app.post('/api/series', async (req, res) => {
    try {
      let serie = req.body;
  
      // Crear y guardar la nueva serie en la base de datos
      const newSerie = new SerieModel(serie);
      await newSerie.save();
  
      res.status(201).json(newSerie);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al insertar la serie en la colección' });
    }
  });
  











//inicio Sesion
app.post('/api/login', async (req, res) => {
  try {
    console.log('Solicitud de inicio de sesión recibida:', req.body);
    const { email, password } = req.body;
    const user = await UserModel.findOne({ _email: email });

    if (user && password === user._password) {
      // Inicio de sesión exitoso
      res.status(200).json(user);

    } else {
      // Credenciales incorrectas
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor al procesar la solicitud de inicio de sesión' });
  }
});







// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



