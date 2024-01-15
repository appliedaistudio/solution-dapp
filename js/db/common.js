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
function fetchJSONData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
}
  
export { putData, fetchJSONData };