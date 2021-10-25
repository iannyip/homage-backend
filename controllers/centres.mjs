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

  return {
    index,
  };
}
