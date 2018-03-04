const getLecture = require('./api/lecture/getLectures')


getLecture('AAE01_H1', null, '1').then(i => console.log(i))