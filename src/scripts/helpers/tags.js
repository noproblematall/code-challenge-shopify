/* eslint import/prefer-default-export: "off" */

const tagDefs = {
  productBadge: 'badge',
  subscribeMessage: 'subscribe-msg',
  freeShipping: 'free-shipping',
  discountPercent: 'discount-percent-',
};

const getValueByPrefix = (tags, param) => {
  const prefix = `__${param}:`;
  const matchingTag = tags.find((tag) => tag.indexOf(prefix) === 0);

  return matchingTag ? matchingTag.slice(prefix.length) : matchingTag;
};

// usage example
// export const getRecurringProductId = tags =>
//   getValueByPrefix(tags, 'my-tag')

export function getProductBadge(tags) {
  return getValueByPrefix(tags, tagDefs.productBadge);
}
