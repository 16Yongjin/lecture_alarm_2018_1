const moment = require('moment')
const db = require('database')
const push = require('./push')
const getLectures = require('./getLectures')

const sendWhenEmpty = async empty => {
  empty.forEach(lecture => {
    const users = db.lectureToUser[lecture]
    users.forEach(user => {
      const lec = db.users[user][lecture]
      if (lec.sent)
        return
      push(user, '빈 자리 알람', `${lec.name} - ${lec.professor} 교수님 자리 났어요.`)
      db.remove(user, lec)
    })
  })
}

const alram = () => {
  const majors = db.majors

  const librals = db.librals

  Object.entries(majors).forEach(async ([major, { list }]) => {
    const empty = await getLectures(major, list, '1')
    sendWhenEmpty(empty)
  })

  Object.entries(librals).forEach(async ([major, { list }]) => {
    const empty = await getLectures(major, list, '2')
    sendWhenEmpty(empty)
  })
}

const looping = () => {
  setInterval(() => {
    const hour = + moment().format('H')
    if (9 < hour && hour < 16)
      alram()
  }, 3000);
}

module.exports = looping