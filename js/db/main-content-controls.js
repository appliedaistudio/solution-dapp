import { putData, fetchJSONData } from './common.js';

async function initializeMainContent(db) {
    const contentControls = fetchJSONData('../../data/main-content-controls.json');
  
    for (const item of contentControls) {
      await putData(db, item);
    }
  }

export { initializeMainContent };