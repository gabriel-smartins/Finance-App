import express from 'express'
import 'dotenv/config.js'

import { PostgresHelper } from './src/db/postgres/helper.js'

const app = express()

app.get('/', async (req, res) => {
    const results = await PostgresHelper.query('Select * from users;')

    res.send(JSON.stringify(results))
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})
