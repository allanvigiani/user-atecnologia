import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import auth from './routers/auth.js';

import { readFile } from 'fs/promises';
const swaggerJsonDocs = JSON.parse(
  await readFile(
    new URL('./swagger.json', import.meta.url)
  )
);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth-api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsonDocs));

app.use('/auth', auth);

app.listen(process.env.PORT, () => {
    console.log(`Servidor está rodando na porta ${process.env.PORT}`);
});

export default app;