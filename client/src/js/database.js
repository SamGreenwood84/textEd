import { openDB } from 'idb';

const initdb = async () => {
  await openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

// Method to add content to the database
export const putDb = async (content) => {
  try {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    await store.put({ value: content });
    await tx.done;
    console.log('Data added to the database successfully');
  } catch (error) {
    console.error('Error adding data to the database:', error);
  }
};

// Method to get all content from the database
export const getDb = async () => {
  try {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const result = await store.getAll();
    await tx.done;
    console.log('Data retrieved from the database:', result);
    return result;
  } catch (error) {
    console.error('Error retrieving data from the database:', error);
  }
};

initdb();
