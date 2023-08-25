import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import 'express-async-errors';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import { resolve } from 'path';
import { router } from './router';

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use(cors());
app.use(router);
app.use('/files', express.static(resolve(__dirname, '..', 'tmp')));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
   if (err instanceof Error) {
      return res.status(400).json({
         error: err.message,
      });
   }

   return res.status(500).json({
      status: 'error',
      message: 'Internal server error.',
   });
});
app.listen(3333, () => console.log('Servidor online!'));
