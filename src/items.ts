import { faker } from '@faker-js/faker';

export interface Item {
  name: string;
  id: string;
  selected: boolean;
}

export const data: { items: Item[] } = {
  items: [],
};

export const createItem = (name: string): Item => {
  return { name, id: faker.datatype.uuid(), selected: false };
};

export const getItems = (): Item[] => data.items;

export const addItem = (item: Item): void => {
  data.items.push(item);
};

export const removeItem = (id: string): void => {
  data.items = data.items.filter((item) => item.id !== id);
};

export const toggleSelectedItem = (id: string): void => {
  data.items = data.items.map((item) => {
    if (item.id === id) {
      item.selected = !item.selected;
    }
    return item;
  });
};

export const checkItemById = (id: string): boolean => {
  return data.items.some((item) => item.id === id);
};
