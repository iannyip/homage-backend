import moment from 'moment';
import pkg from 'sequelize';

const { Op } = pkg;

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

      const startDate = moment(date).startOf('day').toISOString();
      const endDate = moment(date).endOf('day').toISOString();
      console.log('==============');
      console.log(`startDate: ${startDate}, endDate: ${endDate} `);

      // Get the particular centre's details
      const centreOperation = await db.Centre.findOne({
        where: { id },
        attributes: ['startTime', 'endTime', 'slotCapacity'],
      });

      // Get all bookings for the given date
      const bookingsOnDate = await db.Booking.findAll({
        where: {
          date: { [Op.between]: [startDate, endDate] },
          centreId: id,
        },
        attributes: ['date', 'time'],
      });
      console.log('==============');
      console.log(bookingsOnDate);

      // Generate object of timeslots and capacity
      // const timeslots = [];
      const timeslotsObj = {};
      const startArr = centreOperation.startTime.split(':');
      const endArr = centreOperation.endTime.split(':');
      const slotCount = (endArr[0] - startArr[0]) * 4;
      for (let i = 0; i < slotCount; i += 1) {
        timeslotsObj[moment().hours(startArr[0]).minutes(0).add(i * 15, 'm')
          .format('HH:mm')] = centreOperation.slotCapacity;
        // timeslots.push({
        //   time: moment().hours(startArr[0]).minutes(0).add(i * 15, 'm')
        //     .format('HH:mm'),
        //   capacity: centreOperation.slotCapacity,
        // });
      }
      console.log('~~~~~~~~~~1111~~~~~~~~~~');
      console.log(timeslotsObj);
      // Update capacity of timeslots object
      for (let i = 0; i < bookingsOnDate.length; i += 1) {
        console.log(`checking on ${bookingsOnDate[i].time.substr(0, 5)}`);
        timeslotsObj[bookingsOnDate[i].time.substr(0, 5)] -= 1;
      }
      console.log('~~~~~~~~~~2222~~~~~~~~~~');
      console.log(timeslotsObj);

      // convert timeslots object to an array
      const timeslotsArr = [];
      const timingsArr = Object.keys(timeslotsObj);
      const capacityArr = Object.values(timeslotsObj);
      for (let i = 0; i < timingsArr.length; i += 1) {
        timeslotsArr.push({
          time: timingsArr[i],
          capacity: capacityArr[i],
        });
      }

      console.log(timeslotsArr);

      response.send(timeslotsArr);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    index,
    showSlots,
  };
}
