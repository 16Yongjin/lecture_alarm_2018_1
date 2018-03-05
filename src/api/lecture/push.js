const FCM = require('fcm-push')

const serverKey = 'AAAAF0fPUwk:APA91bGP8nfVgRPNlDMAlWp49b2OyJch2sVfIWYGdbTQ0QFDVmoOpzLuXRvAT9DuhMGxFcmgmcu2qQQEUUNSCpwWWV8GV_AsDTD8iABjWSz1kZ1mJRsS9iwODl7TR3j1ddIejTaQ8D_v'
const fcm = new FCM(serverKey)

const send = (to, title, body) => {
  const message = {
    to,
    notification: { title, body }
  }
  fcm.send(message)
    .then(response => {
        console.log("Successfully sent with response: ", response)
    })
    .catch(err => {
        console.error("Something has gone wrong!", err)
    })
}

// send('cTZrfxO2L-0:APA91bFVP-9XQhNmAhGGtqRPDhTfCScDeLy_UxdkxEsE60JaggQrQpteCiPGrqiTZbMITJ6kl5cgVyZ5-dGu8GQtJrZigbme3EtW1WeyqyYqmrNEHf19WJyu-XsII9icAfDAxkxyJaVL',
// 'hello', 'world')

module.exports = send
