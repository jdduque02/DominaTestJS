import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import helmet from 'helmet';
import compression from 'compression';

import routesTask from './routes/route.mjs';
const { PORT, MONGODB_URI } = process.env;
const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: false }));
// Rutas
app.use('/api', routesTask);
// Conexión a la base de datos
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .catch(err => console.error('Error de conexión a MongoDB:', err))
    .then(() => console.log('Conectado a MongoDB'))

app.listen(PORT, () => {
    console.log(`Servicio de tareas ejecutándose en el puerto ${PORT}`);
});