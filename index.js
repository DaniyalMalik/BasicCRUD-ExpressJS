const express = require('express');
const path = require('path');
const app = express();
const logger = require('./middleware/Logger');

// app.use(logger);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/members', require('./routes/api/members'));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'home.html'));
// });

// app.get('/', (req, res) => {
//   res.send('<h1>My first Nodejs response!!</h1>');
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));