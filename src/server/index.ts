import * as path from 'path'
import * as express from 'express'
import template from './template'

// @ts-ignore
import * as reload from 'reload'
// @ts-ignore
import * as proxy from 'express-http-proxy'

const app = express()
app.disable('x-powered-by')

app.use(express.static(path.resolve(process.cwd(), './node_modules')))
app.use(express.static(process.cwd()))
app.use('/api', proxy(`${process.env.CIVSLOG_SERVER}:3377`))

app.get('/', (_req, res) =>  {
	res.send(template())
})

if (process.env.NODE_ENV === 'development') reload(app)

const PORT = 3000
app.listen(PORT)
console.log(`Listening on port ${PORT}`)