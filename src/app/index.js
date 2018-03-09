const Koa = require('koa')
const router = require('routing')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-morgan')
const cors = require('koa2-cors')
const responseTime = require('koa-response-time')
const loop = require('api/lecture/loop')

const app = new Koa()
app.use(cors())
app.use(responseTime())
app.use(logger('combined'))
app.use(bodyParser())
app.use(router.routes())
app.use(ctx => { ctx.type = 'json' })

exports.start = async () => {
  try {
    const port = 7000
    await app.listen(port)
    // loop()
    console.log(`Connected on port ${port}`)
  } catch (error) {
    console.error('Something went wrong', error)
  }
}
