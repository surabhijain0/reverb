import cors from 'cors';
import express from 'express';

import auth from './routes/auth.ts';
import dashboard from './routes/dashboard.ts';
import follow from './routes/follow.ts';
import item from './routes/item.ts';
import login from './routes/login.ts';
import review from './routes/review.ts';
import search from './routes/search.ts';

const app = express().use(cors()).use(express.json());

app.use('/auth', auth);
app.use('/dashboard', dashboard);
app.use('/follow', follow);
app.use('/item', item);
app.use('/login', login);
app.use('/review', review);
app.use('/search', search);

app.listen(3001, () => console.log(`Listening on port 3001`));
