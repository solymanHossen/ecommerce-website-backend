import express from 'express'
import { db} from './config/db.config'
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

const app = express();
// compression
app.use(compression())
// morgan http request
app.use(morgan('combined'));
// helmet
app.use(helmet())
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//routes
// app.use('/api/v1/posts', router);
// app.use('/api/v1/product',productRouter)

//db connection then server connection
db.then(() => {
    app.listen(5000, () => console.log('http://localhost:5000'))
})
