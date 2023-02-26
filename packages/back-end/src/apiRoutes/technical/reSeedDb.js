const dbSeed = require('../../fixtures/dbSeed');

/**
 * Some tests may require to start from a clean slate
 * This endpoint re-seeds the DB (only available in dev/testing)
 */
module.exports = async (req, res) => {
  await dbSeed({ force: true });

  return res.json({});
};
