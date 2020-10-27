const express = require('express');
const bodyParser = require('body-parser');
const path    = require('path');
const exphbs  = require('express-handlebars');
const logger  = require('./middleware/logger');
const members = require('./members');

const app = express();


// Init middleware
// app.use(logger);

// handleBars middleWare
app.engine('handlebars', exphbs({ defaultLayout : 'main'}));
app.set('view engine', 'handlebars');


// Body parser middleware 
app.use(bodyParser.json());
app.use(express.urlencoded({ extended : false }));

// Homepage Route
app.get('/', (req, res) => 
    res.render('index', {
    title : "Members App",
    members
    })

);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Members API route
app.use('/api/members', require('./route/api/members'));    

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));