import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Logic for PUT method that accepts some content and adds it to the database
export const putDb = async (content) => {

  console.log('Update data in IndexedDB');

  // Open the database
  const contentDB = await openDB('jate', 1);
  
  // Create a transaction on the database, specify the database and data privelages
  const tx = contentDB.transaction('jate', 'readwrite');

  // Open the desired object store
  const store = tx.objectStore('jate');

  // Add the data to the database
  const request = store.put({ content });

  // Wait for the request to complete
  const result = await request;
  
  console.log('Data saved to the database', result);
};

// Logic for a GET method that gets all the content from the database
export const getDb = async () => {
  
  console.log('GET data from IndexedDB');

  // Open the database
  const contentDB = await openDB('jate', 1);

  // Create a transaction on the database, specify the database and data privelages
  const tx = contentDB.transaction('jate', 'readonly');

  // Open the desired object store
  const store = tx.objectStore('jate');

  // Get all the data from the database
  const request = store.getAll();

  // Wait for the request to complete
  const result = await request;
  
  console.log('result.value', result);

  return result;
};

initdb();
