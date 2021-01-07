const { install, fetch } = require('@rebased/core');
const { map } = require('rxjs/operators');

// optional setup
install({
  silent: true, // disable logs
  driver: 'firestore', // default driver
  timestampCreated: 'createdAt',
  timestampUpdated: 'updatedAt',
  identifier: 'objectId', // auto generated id
});

// Get a random kitty
fetch('kitty', {
  from: 'http', // use http driver
  silent: true, // show logs
  baseURL: 'https://api.thecatapi.com',
  endpoint: '/v1',
})
  .get('/images/search?size=small&mime_types=gif')
  .pipe(map((it) => it[0]))
  .subscribe(
    (kitty) => console.log(kitty),
    (err) => console.log(err)
  );

// switching driver at runtime
[/*'firestore', 'firebase',*/ 'http'].map((driver) =>
  fetch('kitty', {
    silent: false,
    baseURL: 'https://api.thecatapi.com', // http only
    endpoint: '/v1/images/search?size=small&mime_types=gif', // http only
  })
    .from(driver)
    .where('size', '==', 'small') // firebase/firestore only
    .where('mime_types', '==', 'gif') // firebase/firestore only
    .find()
    .subscribe(
      (kitty) => console.log(kitty, 'from', driver),
      (err) => console.log(err, 'from', driver)
    )
);
