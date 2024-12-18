import express, { Application, Request, Response } from 'express'
import cors from 'cors';
import router from './app/routes/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import apiNotFound from './app/middleware/notFound';




const app: Application = express();


app.use(express.json());
app.use(cors())



// baseRoute
app.get('/', (req: Request, res: Response) => {
    res.status(200).json('project Blog running')
});

// app.use('/', router);
app.use(apiNotFound)
app.use(globalErrorHandler)
export default app;




