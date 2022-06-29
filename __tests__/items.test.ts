import { data, addItem, createItem, getItems, removeItem, checkItemById, toggleSelectedItem } from '../src/items';

beforeEach(() => {
  data.items = [];
});

describe('Crate item', () => {
  it('should create new item with name', () => {
    const item = createItem('test');
    expect(item.name).toEqual('test');
  });
});

describe('Get items', () => {
  it('should return empty array as default', () => {
    const items = getItems();
    expect(items.length).toEqual(0);
  });

  it('should return array of items after create and add item', () => {
    const item = createItem('test');
    expect(item.name).toEqual('test');
    addItem(item);
    const items = getItems();
    expect(items.length).toEqual(1);
  });
});

describe('Remove item', () => {
  it('should delete element after it was created', () => {
    const item = createItem('test');
    expect(item.name).toEqual('test');
    addItem(item);
    const items = getItems();
    expect(items.length).toEqual(1);
    removeItem(item.id);
    const _items = getItems();
    expect(_items.length).toEqual(0);
  });
});

describe('Check item by id', () => {
  it('should return true if element exists', () => {
    const item = createItem('test');
    expect(item.name).toEqual('test');
    addItem(item);
    expect(checkItemById(item.id)).toEqual(true);

    const item2 = createItem('test2');
    expect(item2.name).toEqual('test2');
    addItem(item2);
    expect(checkItemById(item2.id)).toEqual(true);
  });

  it('should return false if element not exists', () => {
    const item = createItem('test');
    expect(item.name).toEqual('test');
    addItem(item);
    expect(checkItemById('test')).toEqual(false);
  });
});

describe('Toggle selected item', () => {
  it('should change selected item value to true', () => {
    const item = createItem('test');
    expect(item.name).toEqual('test');
    addItem(item);
    expect(checkItemById(item.id)).toEqual(true);
    expect(item.selected).toEqual(false);
    toggleSelectedItem(item.id);
    const items = getItems();
    expect(items[0].selected).toEqual(true);
  });

  it('should change selected item value to true and after another call to false', () => {
    const item = createItem('test');
    expect(item.name).toEqual('test');
    addItem(item);
    expect(checkItemById(item.id)).toEqual(true);
    expect(item.selected).toEqual(false);
    toggleSelectedItem(item.id);
    const items = getItems();
    expect(items[0].selected).toEqual(true);

    toggleSelectedItem(item.id);
    const _items = getItems();
    expect(_items[0].selected).toEqual(false);
  });
});
