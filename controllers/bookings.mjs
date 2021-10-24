export default function initBookingsController(db) {
  // most methods for this app will be in this controller
  const index = async (request, response) => {
    try {
      const data = '/bookings, from inside index action';
      response.send(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createForm = async (request, response) => {
    try {
      const data = '/bookings/create, from inside action: createForm ';
      response.send(data);
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (request, response) => {
    try {
      const data = '/bookings/create, from inside action: create';
      response.send(data);
    } catch (error) {
      console.log(error);
    }
  };

  const show = async (request, response) => {
    try {
      const data = '/bookings/:id, from inside action: show';
      response.send(data);
    } catch (error) {
      console.log(error);
    }
  };

  const editForm = async (request, response) => {
    try {
      const data = '/bookings/:id/edit, from inside action: editForm';
      response.send(data);
    } catch (error) {
      console.log(error);
    }
  };

  const update = async (request, response) => {
    try {
      const data = '/bookings/:id/edit, from inside action: update';
      response.send(data);
    } catch (error) {
      console.log(error);
    }
  };

  const destroy = async (request, response) => {
    try {
      const data = '/bookings/:id/delete, from inside action: delete';
      response.send(data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    index,
    createForm,
    create,
    show,
    editForm,
    update,
    destroy,
  };
}
