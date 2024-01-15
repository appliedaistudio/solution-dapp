// A common function to put data into the database
async function putData(db, data) {
    try {
      const result = await db.put(data);
      return result;
    } catch (error) {
      if (error.name !== 'conflict') {
        throw error;
      }
      console.warn(`Document with id ${data._id} already exists. Skipping.`);
    }
  }

// Function to fetch JSON data from server
async function fetchJSONData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
  
export { putData, fetchJSONData };