const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const cmsRoutes = require('./routes/cms');
const adminRoutes = require('./routes/admin');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cmsRoutes);
app.use(adminRoutes);
app.use(errorController.get404);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
});