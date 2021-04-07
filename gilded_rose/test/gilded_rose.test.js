const {
  Shop, 
  Item
} = require("../src/gilded_rose");

describe("Simple items and Aged Brie tests", function() {
  it("Simple item, never below 0", () => {
    const storeInventory = [
      new Item("+5 Dexterity Vest", 20, 0)
    ];
    const expectedResult = [
      new Item("+5 Dexterity Vest", 19, 0)
    ];
    const shop = new Shop(storeInventory);
    const items = shop.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it("sellIn data passed, quality decremented by two", () => {
    const storeInventory = [
      new Item("+5 Dexterity Vest", 0, 10)
    ];
    const expectedResult = [
      new Item("+5 Dexterity Vest", -1, 8)
    ];
    const shop = new Shop(storeInventory);
    const items = shop.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it("item cant be over 50", () => {
    const storeInventory = [
      new Item("Aged Brie", 1, 50)
    ];
    const expectedResult = [
      new Item("Aged Brie", 0, 50)
    ];
    const shop = new Shop(storeInventory);
    const items = shop.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it("quality is increased by one (Aged Brie)", () => {
    const storeInventory = [
      new Item("Aged Brie", 1, 0)
    ];
    const expectedResult = [
      new Item("Aged Brie", 0, 1)
    ];
    const shop = new Shop(storeInventory);
    const items = shop.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });
});

describe("Backstage passes tests", () => {
  it("quality increase as its sellin value approaches", () => {
    const storeInventory = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 14, 0)
    ];
    const expectedResult = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 13, 1)
    ];
    const shop = new Shop(storeInventory);
    const items = shop.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it("quality is increased by two when sellin less or equal 10 days", () => {
    const storeInventory = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0)
    ];
    const expectedResult = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 9, 2)
    ];
    const shop = new Shop(storeInventory);
    const items = shop.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it("quality is increased by three when sellin is less or equal 5 days", () => {
    const storeInventory = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 0)
    ];
    const expectedResult = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, 3)
    ];
    const shop = new Shop(storeInventory);
    const items = shop.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it("quality is dropped to 0 after concert is finished", () => {
    const storeInventory = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 30)
    ];
    const expectedResult = [
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0)
    ];
    const shop = new Shop(storeInventory);
    const items = shop.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });
});

describe("Conjured", () => {
  it("quality decreases twice", () => {
    const storeInventory = [
      new Item("Conjured Mana Cake", 10, 20),
    ];
    const expectedResult = [
      new Item("Conjured Mana Cake", 9, 18)
    ];
    const shop = new Shop(storeInventory);
    const items = shop.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });
});