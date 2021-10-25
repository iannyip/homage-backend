export default function initCentresController(db) {
  // For now, centres will have no controllers
  const index = async (request, response) => {
    try {
      const allCentres = await db.Centre.findAll({
        attributes: ['id', 'name'],
      });
      allCentres.push({ name: 'None', id: 0 });
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
      response.send(200);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    index,
    showSlots,
  };
}
