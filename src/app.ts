import express, { Application, Request, Response } from 'express'
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import apiNotFound from './app/middleware/notFound';
import { userRoutes } from './app/modules/user/user.routes';
import router from './app/routes';






const app: Application = express();


app.use(express.json());
app.use(cors())



// baseRoute
app.get('/', (req: Request, res: Response) => {
    res.status(200).json(' Blog server is running')
});

// application routes 


app.use('/api', router)




app.use(apiNotFound)

app.use(globalErrorHandler)



export default app;




