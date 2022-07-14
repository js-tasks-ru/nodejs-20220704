const Model = require('../model');

async function main() {
  const m = await Model.findOne({...});
  await m.populate('user'); // throw err!!!

  // thenable
  // mongoose.Query, .then(), .populate(), .sortBy()
  
}

