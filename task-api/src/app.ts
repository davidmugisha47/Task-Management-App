import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan';
import { db } from './models';
import taskRoutes from './routes/taskRoutes';

const cors = require('cors');

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use('/api/tasks', taskRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});

db.sync({ alter: true }).then(() => {
    console.info("connected to the database!")
});

app.listen(3000);