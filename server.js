import express from 'express';
import cors from 'cors';
import { sequelize } from './app/models/index.js';
import userRoutes from './app/routes/user.routes.js';
import bootcampRoutes from './app/routes/bootcamp.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/bootcamp', bootcampRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de datos sincronizada...');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos:', error);
    });
