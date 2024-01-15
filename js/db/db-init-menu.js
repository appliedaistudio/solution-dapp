import { putData, fetchJSONData } from './db-init-common.js';

async function initializeMenu(db) {
  // Fetch the JSON data and await its resolution.
  const menuData = await fetchJSONData('../../data/menu-options.json');

  // Assuming the fetched data has structure { "options": [ ... ] }, 
  // we need to access the `options` property.
  const menuItems = menuData.options;

  // Now you can iterate over menuItems, which is an iterable array.
  for (const item of menuItems) {
    await putData(db, item);
  }
}

export { initializeMenu };