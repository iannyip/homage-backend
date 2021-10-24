export default function initBookingsController(db) {
  // most methods for this app will be in this controller
  const index = async (request, response) => {
    try {
      const allBookings = await db.Booking.findAll();
      response.send(allBookings);
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
      const { id } = request.params;
      const singleBooking = await db.Booking.findOne({
        where: { id },
      });
      response.send(singleBooking);
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
      const { id } = request.params;
      await db.Booking.destroy({
        where: { peroson_id: id },
      });
      response.send(200);
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
