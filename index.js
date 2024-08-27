const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()
const port = process.env.PORT
dotenv.config()

const dashboard = require('./routes/dashboard')

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connessione a MongoDB riuscita'))
    .catch((err) => console.error('Errore di connessione a MongoDB:', err));

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});

app.set('views', './views');
app.set('view engine', 'ejs');
// SETTO I FILE STATICI DELLA CARTELLA PUBLIC
// app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
// app.use(express.static(path.join(__dirname, 'app', 'public')));

app.use(express.json())

app.get('/', (req, res) => {
    res.render('home')
})

app.use(dashboard)
