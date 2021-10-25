export default function initBookingsController(db) {
  // most methods for this app will be in this controller
  const index = async (request, response) => {
    try {
      const allBookings = await db.Booking.findAll({
        include: [
          {
            model: db.Person,
            attributes: ['fullName', 'nric'],
          },
          {
            model: db.Centre,
            attributes: ['name'],
          },
        ],
      });
      response.send(allBookings);
    } catch (error) {
      console.log(error);
    }
  };

  const createForm = async (request, response) => {
    try {
      const data = '/bookings/create, from inside action: createForm ';
      const fullName = 'Claire McDermott';
      const person = await db.Person.findOne({
        where: { fullName },
      });
      response.send(person);
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (request, response) => {
    try {
      const formData = request.body;
      console.log(formData);

      // if user is new, create a new user as well
      // use nric to identify person
      let person = await db.Person.findOne({
        where: { nric: formData.nric },
      });
      if (person == null) {
        console.log('no such person exists! Creating new person');
        person = await db.Person.create({
          fullName: formData.fullName,
          nric: formData.nric,
        });
      }
      // create new booking
      const newBooking = await db.Booking.create({
        personId: person.id,
        centreId: formData.centreId,
        date: formData.date,
        time: formData.time,
      });
      response.send(200);
      // response.status(200);
    } catch (error) {
      console.log(error);
    }
  };

  const show = async (request, response) => {
    try {
      const { id } = request.params;
      console.log('received request for one booking!');
      console.log(id);
      const singleBooking = await db.Booking.findOne({
        where: { id },
        include: [
          {
            model: db.Person,
            attributes: ['fullName', 'nric', 'id'],
          },
          {
            model: db.Centre,
            attributes: ['name'],
          },
        ],
      });
      response.send(singleBooking);
    } catch (error) {
      console.log(error);
    }
  };

  const update = async (request, response) => {
    try {
      const updatedData = request.body;
      console.log(updatedData);
      const updatedPerson = await db.Person.update(
        {
          fullName: updatedData.name,
          nric: updatedData.nric,
        },
        { where: { id: updatedData.personId } },
      );
      const updatedBooking = await db.Booking.update(
        {
          centreId: updatedData.centre,
          date: updatedData.date,
          time: updatedData.chosenSlot,
        },
        { where: { id: updatedData.bookingId } },
      );
      console.log('======== updatedPerson');
      console.log(updatedPerson);
      console.log('======== updatedBooking');
      console.log(updatedBooking);
      response.send(200);
    } catch (error) {
      console.log(error);
    }
  };

  const destroy = async (request, response) => {
    try {
      const { id } = request.params;
      console.log('delete req came in!');
      console.log(id);
      await db.Booking.destroy({
        where: { id },
      });
      response.sendStatus(200);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    index,
    createForm,
    create,
    show,
    update,
    destroy,
  };
}
