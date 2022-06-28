import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

interface Item {
  name: string;
  id: string;
  selected: boolean;
}

let ITEMS: Item[] = [];

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/items', (req: Request, res: Response) => {
  res.send(ITEMS);
});

app.put('/item', (req: Request, res: Response) => {
  const {
    body: { name },
  } = req;

  if (name) {
    const item = { name, id: faker.datatype.uuid(), selected: false };
    ITEMS.push(item);
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
    if (ITEMS.some((item) => item.id === id)) {
      ITEMS = ITEMS.map((item) => {
        if (item.id === id) {
          item.selected = !item.selected;
        }
        return item;
      });
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

  if (ITEMS.some((item) => item.id === id)) {
    ITEMS = ITEMS.filter((item) => item.id !== id);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
