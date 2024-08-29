const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()
const port = process.env.PORT
const passport = require('passport')
const session = require('express-session')
const methodOverride = require('method-override')
const loginPassport = require('./config/loginPassport')
dotenv.config()

const ensureAuth = require('./middleware/ensureAuth')
const dashboard = require('./routes/dashboard')
const auth = require('./routes/auth')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret', // Cambia questa con una chiave segreta forte
    resave: false,
    saveUninitialized: false,
}));
app.use(methodOverride('_method'))
loginPassport(passport)
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connessione a MongoDB riuscita'))
    .catch((err) => console.error('Errore di connessione a MongoDB:', err));

app.set('views', './views');
app.set('view engine', 'ejs');

// Serve file statici (se necessario)
// app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
// app.use(express.static(path.join(__dirname, 'app', 'public')));

// Rotta Home
app.get('/', (req, res) => {
    res.render('home')
})

// Rotte di autenticazione (non protette)
app.use(auth);

// Rotte protette
app.use(ensureAuth, dashboard);

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});

