import db from './models/index.mjs';

// import the controller
import initCentresController from './controllers/centres.mjs';
import initPeopleController from './controllers/people.mjs';
import initBookingsController from './controllers/bookings.mjs';

export default function bindRoutes(app) {
  // initialise controllers, pass in the db for all callbacks
  const centresController = initCentresController(db);
  const peopleController = initPeopleController(db);
  const bookingsController = initBookingsController(db);

  // routes
  app.get('/', (request, response) => {
    response.send('nothing to see here');
  });
  app.get('/bookings', bookingsController.index);
  app.get('/bookings/create', bookingsController.createForm);
  app.post('/bookings/create', bookingsController.create);
  app.get('/bookings/:id', bookingsController.show);
  app.get('/bookings/:id/edit', bookingsController.editForm);
  app.put('/bookings/:id/edit', bookingsController.update);
  app.delete('/bookings/:id/delete', bookingsController.destroy);

  app.get('/centres', centresController.index);
}
