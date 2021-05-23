import path from 'path';

import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

import models from './data/models';

import routes from './routes';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

// models.sync().catch(e=>console.log(e.stack));

// Routes
routes(app);
models.sequelize.sync().then(function() {
    app.listen(process.env.PORT || 5500);
  });