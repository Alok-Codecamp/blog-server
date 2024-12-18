import Router, { NextFunction, Request, Response } from 'express';


const router = Router()



const allRoutes = [
    {
        path: '/',
        route: router.get('/', (req: Request, res: Response, next: NextFunction) => {
            res.status(200).json('Project Blog server is running');
            next()
        })
    }
]


// use all route through forEach loop

allRoutes.forEach(route => router.use(route.path, route.route));

export default router;

