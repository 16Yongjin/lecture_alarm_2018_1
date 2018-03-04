const router = require('koa-router')()
const getLectures = require('./getLectures')
const db = require('database')
const dbUtil = require('database/dump')

router.get('/lectures/:id', async ctx => {
  const id = ctx.params.id
  const gubun = ctx.query.gubun || '1'
  const users = await getLectures(id, null, gubun)
  ctx.body = users
})

router.get('/my/:token', async ctx => {
  const token = ctx.params.token
  ctx.body = db.userLectures(token)
})

router.post('/register', async ctx => {
  const { token, major, lecture, gubun } = ctx.request.body
  lecture.major = major
  delete lecture.people
  delete lecture.isEmpty
  db.add(token, major, lecture, gubun)
  ctx.body = db.userLectures(token)
  try {
    await dbUtil.dump()
  } catch (e) {
    console.log(e)
  }
})

router.post('/remove', async ctx => {
  const { token, lecture } = ctx.request.body
  db.remove(token, lecture)
  ctx.body = db.userLectures(token)
})

router.get('/adadmin', async ctx => {
  ctx.body = db
})

router.get('/adadmin/dump', async ctx => {
  await dbUtil.dump()
  ctx.body = db
})

router.get('/adadmin/load', async ctx => {
  await dbUtil.load()
  ctx.body = db
})

module.exports = router.routes()
