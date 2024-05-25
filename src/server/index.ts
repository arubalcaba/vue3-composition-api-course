import express from 'express'
import cors from 'cors'
import {today, thisWeek, thisMonth} from '../posts'

const app = express()
app.use(cors())

app.get('/posts', (req, res) => {
    res.json([today, thisWeek, thisMonth])
})

app.listen(3012, () => {
    console.log('Server is running on http://localhost:3012')
})
