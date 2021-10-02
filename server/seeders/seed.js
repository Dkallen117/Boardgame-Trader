const db = require('../config/connection');
const { User, Listing } = require('../models');
const userSeeds = require('./userSeeds.json');
const listingSeeds = require('./listingSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Listing.deleteMany({});

    await User.create(userSeeds);
    await Listing.create(listingSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
