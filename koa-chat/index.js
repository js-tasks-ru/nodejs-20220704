const app = require('./app');

app.listen(process.env.PORT || 3000, () => {
  console.log('App is running on http://localhost:3000');
});
