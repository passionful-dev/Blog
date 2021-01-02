const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

//connect to MongoDB
const dbURI = 'mongodb+srv://test:password@cluster0.tjbu1.mongodb.net/dbname?retryWrites=true&w=majority'
// const dbURI = 'mongodb+srv://test:<password>@cluster0.tjbu1.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  // .then((result) => console.log('connected to db'))
  .then((result) => app.listen(3005))
  .catch((err) => console.log(err))

const app = express()

// register view engine
app.set('view engine', 'ejs')

// middleware and static files
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true})) 
app.use(express.static('public'));

// Getting n setting data
app.get('/', (req, res) => {  
  res.redirect('/blogs')
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About'})
})

app.get('/about-us', (req, res) => {
  res.redirect('/about')
})

// Blog routes
// app.use(blogRoutes)
app.use('/blogs', blogRoutes)


app.use((req, res) => {
  res.status(404).render('404', { title: '404'})
})


