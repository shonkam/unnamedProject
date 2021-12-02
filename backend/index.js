const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/helloworld', (request, response) => {
    response.send('hello world')
})

const PORT = 3030

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})