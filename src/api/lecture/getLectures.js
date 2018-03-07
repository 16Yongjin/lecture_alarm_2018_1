const rq = require('request-promise')
const cheerio = require('cheerio')
// const menu = `No.
// 개설영역(Area)
// 학년(Year)
// 학수번호(Course number)
// 교과목명(Subject name)
// Syllabus
// 전필(R)
// 온라인(O)
// 원어(F)
// TeamTeaching
// 담당교수(Professor)
// 학점(Credit)
// 시간(Time)
// 강의시간/강의실(Class time/Lecture room)
// 신청/제한인원(Apply/Restrictednumber of people)
// 비고(Note)`.split('\n')
// 3, 4, 10, 12, 14
// id, name, professor, time, people

const info = {
  3: 'id',
  4: 'name',
  10: 'professor',
  13: 'info',
  14: 'people'
}

const form = {
  tab_lang: 'K',
  ag_ledg_year: '2018',
  ag_ledg_sessn: '1',
  ag_org_sect: 'A',
  campus_sect: 'H1',
  gubun: '1',
  ag_compt_fld_cd: '301_H1',
  ag_crs_strct_cd: 'AAR01_H1'
}

const parseByIndex = ($, indices) => {
  // console.time('parsing with idx')
  const tr = $(
    'div.table.write.margin_top10.align_center.font-size11 tr'
  )
  const empty = []
  indices.forEach(index => {
    $(tr).eq(index).each((idx, b) => {
      const lecture = $(b).children('td')
      const id = $(lecture).eq(3).text()
      const people = $(lecture).eq(14).text()

      try { 
        if (people && eval(people) < 1)
          empty.push(id)
      } catch (e) {}

    })
  })
  // console.timeEnd('parsing with idx')
  return empty
}

const parseLectures = ($) => {
  // console.time('parsing')
  const tr = $(
    'div.table.write.margin_top10.align_center.font-size11 tr'
  )
  const lectures = []
  $(tr).each((idx, b) => {
    const child = $(b).children('td')
    const lecture = { idx }

    $(child).each((i, text) => {
      if (info[i])
        lecture[info[i]] = $(text).text()
    })
    lecture.name = lecture.name && lecture.name.replace(/\s{3,}/g, ' ')
    lecture.professor = lecture.professor && lecture.professor.replace(/ \(.+\)/, '').trim()
    lecture.name = lecture.name && lecture.name.replace(/ \(.+\) $/, '').trim()
    lecture.info = lecture.info && lecture.info.replace(/(.+\))\(.+\)$/, '$1')
    if (lecture.people)
      try { lecture.isEmpty = eval(lecture.people) < 1 } catch (e) {}
    lectures.push(lecture)
  })
  lectures.shift() // remove head of table
  // console.timeEnd('parsing')  
  // console.log(lectures)
  return lectures
}

const getPage = (id, gubun) => {
  if (gubun == '1' || gubun === '1' ) {
    Object.assign(form, { ag_crs_strct_cd: id })
  } else {
    Object.assign(form, { ag_compt_fld_cd: id, gubun })
  }
  var options = {
    method: 'POST',
    uri:
      'http://webs.hufs.ac.kr:8989/src08/jsp/lecture/LECTURE2020L.jsp',
    form,
    transform(body) {
      return cheerio.load(body)
    }
  }
  return rq(options)
}

const getLectures = async (id, indices, gubun) => {
  console.log(indices, gubun)
  try {
    const $ = await getPage(id, gubun)
    return indices ? parseByIndex($, indices) : parseLectures($)
  } catch (e) {
    console.log(e)
    return []
  }
}

// getLectures('AAD01_H1', [1,2,3,4])
module.exports = getLectures
