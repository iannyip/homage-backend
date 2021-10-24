const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // CENTRES
    const centresList = [
      {
        name: 'Bukit Batok CC',
        slot_capacity: 10,
        start_time: '09:00',
        end_time: '18:00',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Bukit Panjang CC',
        slot_capacity: 10,
        start_time: '09:00',
        end_time: '19:00',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Bukit Timah CC',
        slot_capacity: 10,
        start_time: '09:00',
        end_time: '15:00',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Outram Park Polyclinic',
        slot_capacity: 10,
        start_time: '08:00',
        end_time: '20:00',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    const centres = await queryInterface.bulkInsert(
      'centres',
      centresList,
      { returning: true },
    );

    // PEOPLE
    const peopleList = [];
    const lastChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 20; i += 1) {
      const nricSuffix = lastChar[Math.floor(Math.random() * lastChar.length)];
      const nricYear = Math.floor(Math.random() * 100);
      const nricBody = (`00000${Math.floor(Math.random() * 100000).toString(10)}`).slice(-5);
      let nricPrefix;
      if (nricYear < 21) {
        nricPrefix = 'T';
      } else {
        nricPrefix = 'S';
      }

      peopleList.push({
        full_name: faker.name.findName(),
        nric: `${nricPrefix}${nricYear}${nricBody}${nricSuffix}`,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    const people = await queryInterface.bulkInsert(
      'people',
      peopleList,
      { returning: true },
    );

    // BOOKINGS
    const bookingsList = [];
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('people', null, {});
    await queryInterface.bulkDelete('centres', null, {});
  },
};
