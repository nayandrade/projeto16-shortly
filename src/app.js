import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import chalk from 'chalk';

import authRoutes from './routes/authRoutes.js';
import urlsRoutes from './routes/urlsRoutes.js';
import userRoutes from './routes/userRoutes.js';
import rankingRoutes from './routes/rankingRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(authRoutes)
app.use(urlsRoutes)
app.use(userRoutes)
app.use(rankingRoutes)

app.listen(process.env.PORT, () => {
    console.log(chalk.bold.bgRed(`Server is listening on port ${process.env.PORT}`));
});