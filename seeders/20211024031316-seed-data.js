const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // CENTRES
    const centreNames = [
      'Radin Mas Community Club',
      'Buona Vista Community Club',
      'Potong Pasir Community Club',
      'Raffles City Convention Centre',
      'Tanjong Pagar Community Club',
      'Jalan Besar Community Club',
      'Bishan Community Club',
      'Queenstown Community Centre',
      'Toa Payoh West Community Club',
      'Marine Parade Community Club',
      'Geylang Serai Community Club',
      'Tampines East Community Club',
      'Bedok Community Centre',
      'Pasir Ris Elias Community Club',
      'Arena@ Our Tampines Hub (Hockey Court)',
      'Woodlands Community Club',
      'Woodlands Galaxy Community Club',
      'Canberra Community Club',
      'Nee Soon East Community Club',
    ];
    const centresList = [];
    for (let i = 0; i < centreNames.length; i += 1) {
      centresList.push({
        name: centreNames[i],
        slot_capacity: 10,
        start_time: '09:00',
        end_time: '18:00',
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

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
    for (let i = 0; i < people.length; i += 1) {
      const person = people[i];
      bookingsList.push({
        person_id: person.id,
        centre_id: Math.floor(Math.random() * centres.length) + 1,
        time: '09:00',
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    const bookings = await queryInterface.bulkInsert(
      'bookings',
      bookingsList,
      { returning: true },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('bookings', null, {});
    await queryInterface.bulkDelete('people', null, {});
    await queryInterface.bulkDelete('centres', null, {});
  },
};
