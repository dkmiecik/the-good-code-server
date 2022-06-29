import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { getItems, addItem, checkItemById, createItem, Item, removeItem, toggleSelectedItem } from './items';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/items', (req: Request, res: Response) => {
  res.send(getItems());
});

app.put('/item', (req: Request, res: Response) => {
  const {
    body: { name },
  } = req;

  if (name) {
    const item: Item = createItem(name);
    addItem(item);
    res.json(item);
  } else {
    res.sendStatus(400);
  }
});

app.post('/item/:id', (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;

  if (id) {
    if (checkItemById(id)) {
      toggleSelectedItem(id);
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
});

app.delete('/item/:id', (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;

  if (checkItemById(id)) {
    removeItem(id);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
