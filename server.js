import express from 'express';
import cors from 'cors';
import DB from './db.js';
import error from './middlewares/error.js';
import notFound from './middlewares/notFound.js';
import { restRouter } from './api/index.js';

try {
    await DB.connect();
}
catch (err) {
    console.error(err);
}

restRouter.route('/hello').get((req, res) => {
    res.json({ message: 'Hello from Node.js API!' });
});

const app = express();
app.use(cors());
app.use('/api', restRouter);
app.use(notFound);
app.use(error);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));