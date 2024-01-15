import { putData, fetchJSONData } from './db-init-common.js';

async function initializeMainContent(db) {
  // Await the result of fetchJSONData to ensure contentControls is an array
  const contentData = await fetchJSONData('../../data/main-content-controls.json');

  // Assuming the fetched data has structure { "icons": [ ... ] }, 
  // we need to access the `icons` property.
  const contentControls = contentData.icons;
  
  for (const item of contentControls) {
    await putData(db, item);
  }
}

export { initializeMainContent };