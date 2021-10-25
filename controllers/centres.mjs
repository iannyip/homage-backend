import moment from 'moment';

export default function initCentresController(db) {
  // For now, centres will have no controllers
  const index = async (request, response) => {
    try {
      const allCentres = await db.Centre.findAll({
        attributes: ['id', 'name'],
      });
      allCentres.unshift({ name: 'None', id: 0 });
      response.send(allCentres);
    } catch (error) {
      console.log(error);
    }
  };

  const showSlots = async (request, response) => {
    try {
      const { id, date } = request.params;
      console.log('getting slots!');
      console.log(`id: ${id}`);
      console.log(`date: ${date}`);

      // handle null requests
      if (id === 0) {
        response.send(204);
      }

      // Get the particular centre's details
      const centreOperation = await db.Centre.findOne({
        where: { id },
        attributes: ['startTime', 'endTime', 'slotCapacity'],
      });

      // Generate array of timeslots and capacity
      const timeslots = [];
      const startArr = centreOperation.startTime.split(':');
      const endArr = centreOperation.endTime.split(':');
      const slotCount = (endArr[0] - startArr[0]) * 4;
      for (let i = 0; i < slotCount; i += 1) {
        timeslots.push({
          time: moment().hours(startArr[0]).minutes(0).add(i * 15, 'm')
            .format('HH:mm'),
          capacity: centreOperation.slotCapacity,
        });
      }

      response.send(timeslots);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    index,
    showSlots,
  };
}
