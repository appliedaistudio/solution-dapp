import { putData, fetchJSONData } from './common.js';

async function initializeMenu(db) {
    var menuItems = fetchJSONData('../../data/menu-options.json');
  
    for (const item of menuItems) {
      await putData(db, item);
    }
}

export { initializeMenu };