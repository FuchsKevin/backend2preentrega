import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import { connectDB } from './config/db.js';
import { initializePassport } from './config/passport.config.js'; // Ajuste en la ruta
import { sessionsRouter } from './routes/api/sessions.router.js';
import { viewsRouter } from './routes/views.router.js';
import { productsRouter } from './routes/api/products.router.js'; // Nueva ruta para productos
import { cartsRouter } from './routes/api/carts.router.js'; // Nueva ruta para carritos
import { currentRouter } from './routes/api/current.router.js'; // Nueva ruta para /current

const app = express();
const PORT = process.env.PORT || 8080;

// Configurar Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve('src/views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Passport
initializePassport();
app.use(passport.initialize());

// Rutas
app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/current', currentRouter);

// Conectar a la base de datos y levantar servidor
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
}).catch(err => console.error('Error al conectar con la base de datos:', err));
