const yargs = require("yargs");
const fs = require("fs");
const { getInformation } = require("./api");
const { Shop, Item } = require("./gilded_rose/src/gilded_rose");

const argv = yargs.option({
  u: {
    demand: true,
    alias: "update",
    describe: "Insert a number, how many times the shop should update it's items",
    type: "number"
  },
  r: {
    demand: true,
    alias: "mocks",
    describe: "Insert a number of start requests to the mock API",
    type: "number"
  }
}).argv;

const items = [
  new Item("+5 Dexterity Vest", 10, 20),
  new Item("Aged Brie", 2, 0),
  new Item("Elixir of the Mongoose", 5, 7),
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),

  // This Conjured item does not work properly yet
  new Item("Conjured Mana Cake", 3, 6),
];
const shop = new Shop(items);

const { update, mocks } = argv;

const apiMockCall = async (callsNumber) => {
  const fnCalls = [];
  for (var i = 0; i < callsNumber; i++) {
    fnCalls.push(getInformation());
  }
  let positiveRes = [];
  await Promise.all([...fnCalls]).then((values) => {
    positiveRes = values.filter((el) => el.answer === "yes");
    fs.writeFile("log.txt", positiveRes.length, (e) => {
      if (e) {
        console.log(err);
      }
    });
    if(positiveRes.length !== 0) {
      return apiMockCall(positiveRes.length)
    }
  });
  return 0;
}

const updateStore = async (callsNumber) => {
 
  for (let i = 0; i < update; i++) {
    await apiMockCall(callsNumber);
    const items = shop.updateQuality();
    console.log(items);
  }
}
 
updateStore(mocks);
