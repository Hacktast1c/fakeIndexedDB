require("../support-node");

'use strict';

for (let cursorCount of [2, 10, 100, 1000, 10000]) {
  promise_test(testCase => {
    return createDatabase(testCase, (database, transaction) => {
      const store = database.createObjectStore('cache', { keyPath: 'key' });
      store.put({ key: '42' });

      const promises = [];

      for (let j = 0; j < 2; j += 1) {
        const promise = new Promise((resolve, reject) => {
          let request = null;
          for (let i = 0; i < cursorCount / 2; i += 1) {
            request = store.openCursor();
          }

          let continued = false;
          request.onsuccess = testCase.step_func(() => {
            const cursor = request.result;

            if (!continued) {
              assert_equals(cursor.key, '42');
              assert_equals(cursor.value.key, '42');
              continued = true;
              cursor.continue();
            } else {
              assert_equals(cursor, null);
              resolve();
            }
          });
          request.onerror = () => reject(request.error);
        });
        promises.push(promise);
      }
      return Promise.all(promises);
    }).then(database => {
      database.close();
    });
  }, `${cursorCount} cursors`);
}
