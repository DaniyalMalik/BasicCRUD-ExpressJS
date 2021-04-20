const express = require('express');
const path = require('path');
const app = express();
const members = require('./Members');
const logger = require('./middleware/Logger');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
// app.use(logger);

app.get('/', (req, res) =>
  res.render('index', { title: 'Members App', members })
);

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use('/api/members', require('./routes/api/members'));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'home.html'));
// });

// app.get('/', (req, res) => {
//   res.send('<h1>My first Nodejs response!!</h1>');
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
