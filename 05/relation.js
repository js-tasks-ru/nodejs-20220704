const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

mongoose.plugin(beautifyUnique);

mongoose.connect('mongodb://localhost/test');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }]
});

const Book = mongoose.model('Book', bookSchema);

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Author = mongoose.model('Author', authorSchema);

(async function() {
  // await Book.deleteMany({});
  // await Author.deleteMany({});

  // const warAndPeace = await Book.create({title: 'War And Peace'});
  // const annaKarenina = await Book.create({title: 'Anna Karenina'});
  // const hadjiMurad = await Book.create({title: 'Hadji Murad'});

  // const leo = await Author.create({
  //   name: 'Leo Tolstoy',
  //   books: [
  //     warAndPeace, annaKarenina, hadjiMurad,
  //   ]
  // });
  
  console.log(await Author.findOne({name: 'Leo Tolstoy'}).populate('books'));

  // deep (multi-level) populate: http://mongoosejs.com/docs/populate.html#deep-populate
})().catch(console.error).then(() => mongoose.disconnect());
