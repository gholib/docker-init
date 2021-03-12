const express = require('express')
const { connectDB } = require('./db/db')
const app = express()
const {port, db, apiUrl} = require('./configuration')
const axios = require('axios')

const startServer = () => {
    app.listen(port, () => {
        console.log('satrted auth service port=' + port)
        console.log('db=', db);
    })
}
app.get('/data', (req, res) => {
    axios.get(apiUrl + '/data').then(response => {
        res.send(response.data)
    })
})

app.get('/api/user', (req, res) => {
    res.send({
        name: 'test',
        login: 'test@test.com'
    })
})


connectDB().on('error', console.log)
    .on('disconnected', connectDB)
    .once('open', startServer)