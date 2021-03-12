const express = require('express')
const { connectDB } = require('./db/db')
const app = express()
const {port, db, authApiUrl} = require('./configuration')
const mongoose = require('mongoose')
const axios = require('axios')

const postSchema = new mongoose.Schema({
    name: String
})

const Post = mongoose.model('Post', postSchema)


const startServer = () => {
    app.listen(port, () => {
        console.log('satrted api service port=' + port)
        console.log('db=', db);
    })

    const slience = new Post({name: 'Silience'})
    slience.save((err, post) => {
        if(err) return console.error(err)

        console.log('saved with volumes test', post);
    })
}
app.get('/api/data', (req, res) => {
    res.send({data: 'api working'})
})

app.get('/user', (req, res) => {
    axios.get(authApiUrl + '/user').then(response => {
        res.send({user: response.data})
    })
})

connectDB().on('error', console.log)
    .on('disconnected', connectDB)
    .once('open', startServer)