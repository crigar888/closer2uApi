import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './routes/routes';
import DataBase from './config/database';

dotenv.config();
DataBase.runConnection();
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req: Request, res: Response) => {
    res.send('hola soy la api de cris me llamo closer to u y puedes preguntarme algo');
  });
app.use('/api', router);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});