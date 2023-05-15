import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // New object store for data with a key name of 'id', increments automatically//
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Function exported to PUT in database //
export const putDb = async (content) => {
  console.log('PUT to the database');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.put({ id: 1, value: content });

  // Get request confirmation //
  const result = await request;
  console.log('Saved to database', result);
};

// Function exported to GET to database //
export const getDb = async () => {
  console.log('GET from the database');

  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly')
  const store = tx.objectStore('jate');
  const request = store.getAll();

  // Get request confirmation //
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();