import { install, getCache, setCache } from '@rebased/cache';

install('my-db', 'my-store');

async function run() {
  await setCache('person', { firstName: 'John', lastName: 'Doe' });
  console.log(await getCache('person'));
  // { firstName: "John", lastName: "Doe" }
}

run();
