/**
 * Utility functions for handling price formatting and parsing
 */

/**
 * Format price to display with $ symbol
 * @param {string|number} price - Price value (can be string like "$299" or number like 299)
 * @returns {string} Formatted price string with $ symbol
 */
export const formatPrice = (price) => {
  if (typeof price === 'string') {
    // If already formatted with $, return as is
    if (price.startsWith('$')) {
      return price;
    }
    // If it's a string number, add $
    return `$${price}`;
  }
  // If it's a number, convert to string with $
  return `$${price}`;
};

/**
 * Parse price to get numeric value for calculations
 * @param {string|number} price - Price value (can be string like "$299" or number like 299)
 * @returns {number} Numeric price value
 */
export const parsePrice = (price) => {
  if (typeof price === 'string') {
    // Remove $ and any other non-numeric characters, then parse
    return parseInt(price.replace(/[^0-9.]/g, ''));
  }
  // If it's already a number, return as is
  return price;
};

/**
 * Calculate discount percentage
 * @param {string|number} originalPrice - Original price
 * @param {string|number} salePrice - Sale price
 * @returns {number} Discount percentage (rounded)
 */
export const calculateDiscount = (originalPrice, salePrice) => {
  const original = parsePrice(originalPrice);
  const sale = parsePrice(salePrice);
  
  if (original <= sale) return 0;
  
  return Math.round(((original - sale) / original) * 100);
};

/**
 * Check if price falls within a given range
 * @param {string|number} price - Price to check
 * @param {string} priceRange - Range string like "Under $200", "$200 - $500", "Over $500"
 * @returns {boolean} Whether price falls in range
 */
export const isPriceInRange = (price, priceRange) => {
  const numericPrice = parsePrice(price);
  
  switch (priceRange) {
    case 'All':
      return true;
    case 'Under $200':
      return numericPrice < 200;
    case '$200 - $500':
      return numericPrice >= 200 && numericPrice <= 500;
    case 'Over $500':
      return numericPrice > 500;
    default:
      return true;
  }
};
