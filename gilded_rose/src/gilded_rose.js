const SULFURAS = "Sulfuras, Hand of Ragnaros";
const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";

class Item {
  constructor (name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const calculateSimpleItemQuality = ({ sellIn, quality }) => {
  const isQualityNotNegative = quality > 0;
  const noMoreDaysToSell = sellIn < 0;

  // Sell date has passed, Quality degrades twice as fast
  if (isQualityNotNegative && noMoreDaysToSell) {
    return -2;
  }
  if (isQualityNotNegative) {
    return -1
  }

  return 0;
}

// Backstage passes like aged brie, increases in quality as its
// SellIn value approaches
const calculateBackstagePassQuality = ({ sellIn, quality }) => {
  const tenDaysToSellIn = sellIn <= 10;
  const fiveDaysToSellIn = sellIn <= 5;
  const noMoreDaysToSell = sellIn < 0;

  if (noMoreDaysToSell) {
    return -quality;
  }
  if (fiveDaysToSellIn) {
    return +3;
  }
  if (tenDaysToSellIn) {
    return +2;
  }
  return +1;
}

const calculateAgeBrieQuality = ({ sellIn, quality }) => {
  const isQualityLessThan50 = quality < 50;
  if (isQualityLessThan50) {
    return +1;
  }
  return 0;
}

const calculateSellIn = ({sellIn, name}) => {
  const isSulfuras = name === SULFURAS;
  return !isSulfuras ? -1 : 0;
}

const calculateQuality = (item) => {
  // Items
  const isSulfuras = item.name === SULFURAS;
  const isAgedBrie = item.name === AGED_BRIE;
  const isBackstagePass = item.name === BACKSTAGE_PASSES;
  const isConjured = item.name.includes("Conjured");
  const isSimpleItem = !isAgedBrie && !isBackstagePass && !isSulfuras && !isConjured;

  if (isSimpleItem) {
    return calculateSimpleItemQuality(item);
  }
  if (isAgedBrie) {
    return calculateAgeBrieQuality(item);
  }
  if(isBackstagePass) {
    return calculateBackstagePassQuality(item);
  }
  if(isConjured) {
    return calculateSimpleItemQuality(item) * 2;
  }

  return 0;
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    return this.items.map((item) => {
     item.sellIn += calculateSellIn(item);
     item.quality += calculateQuality(item);

     return item;
    })
  }
}

module.exports = {
  Item,
  Shop
}
