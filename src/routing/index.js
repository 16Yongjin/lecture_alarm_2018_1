const router = require('koa-router')()
const lecture = require('api/lecture/routes')

router.use('/api', lecture)

module.exports = router
