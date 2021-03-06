const express = require('express');
const keys   = require('./config/keys');
const stripe  = require('stripe')(keys.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');

const exphbs = require('express-handlebars');

const app = express();
// HANDLEBARS Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//BODYPARSER Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//SETSTATIC Folder
app.use(express.static(`${__dirname}/public`));

// INDEX Route
app.get('/',  (req , res) => {
    res.render('index', {
        STRIPE_PUBLIC_KEY : keys.STRIPE_PUBLIC_KEY 
    });
})
// TEST SUCCESS Route
// app.get('/success',  (req , res) => {
//     res.render('success');
// })

// CHARGE Route
app.post('/charge', async (req , res) => {
    const amount = 25000;

    await stripe.customers.create({
        email : req.body.stripeEmail,
        source : req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount,
        description: 'Web Development Book',
        currency: 'usd',
        customer : customer.id
    }))
    .then(charge => res.render('success'));

})
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
