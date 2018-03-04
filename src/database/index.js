const state = {
  users: {}, // { user: { lec1: { name, prof, info, sent } } } 
  majors: {}, // { major1: [lec1, lec2], major2: [lec1, lec4] }
  librals: {},
  lectureToUser: {} // { lec1: [user1, user2], lec2: [] }
}

const userLectures = (token) => { return state.users[token] ? Object.values(state.users[token]) : [] }

const add = (token, major, lecture, gubun) => {
  if (state.users[token]) { // 이미 있는 유져면 강의만 추가
    if (state.users[token][lecture.id]) // 중복 추가 시 그냥 나감
      return 
    Object.assign(state.users[token], { [lecture.id]: lecture } )
  } else {
    state.users[token] = { [lecture.id]: lecture }
  }

  if (state.lectureToUser[lecture.id]) {
    if (!state.lectureToUser[lecture.id].includes(token)) 
      state.lectureToUser[lecture.id].push(token)
  } else {
    state.lectureToUser[lecture.id] = [token]
  }

  if (gubun === '1') { 
    if (state.majors[major]) {
      if (!state.majors[major].list.includes(lecture.idx)) {
        state.majors[major].list.push(lecture.idx)
        state.majors[major][lecture.idx] = 1
      } else { // 이미 들어있는 과목 카운트만 추가
        state.majors[major][lecture.idx] += 1
      }
    } else {
      state.majors[major] = { list: [lecture.idx], [lecture.idx]: 1 }
    }
  } else {
    if (state.librals[major]) {
      if (!state.librals[major].list.includes(lecture.idx)) {
        state.librals[major].list.push(lecture.idx)
        state.librals[major][lecture.idx] = 1
      } else { // 이미 들어있는 과목 카운트만 추가
        state.librals[major][lecture.idx] += 1
      }
    } else {
      state.librals[major] = { list: [lecture.idx], [lecture.idx]: 1 }
    }
  }
}

const remove = (token, lecture) => {
  const major = lecture.major

  if (state.users[token]) {
    delete state.users[token][lecture.id]
  }

  if (state.majors[major]) {
    const lecNum = state.majors[major][lecture.idx]
    state.majors[major][lecture.idx] = Math.max(lecNum -1, 0)
    
    if (state.majors[major][lecture.idx] < 1) {
      const lecList = state.majors[major].list
      const filteredLec = lecList.filter(n => n !== lecture.idx)
      state.majors[major].list = filteredLec
      
      if (filteredLec.length < 1)
      delete state.majors[major]
    }
  }

  if (state.librals[major]) {
    const lecNum = state.librals[major][lecture.idx]
    state.librals[major][lecture.idx] = Math.max(lecNum -1, 0)
    
    if (state.librals[major][lecture.idx] < 1) {
      const lecList = state.librals[major].list
      const filteredLec = lecList.filter(n => n !== lecture.idx)
      state.librals[major].list = filteredLec
      
      if (filteredLec.length < 1)
      delete state.librals[major]
    }
  }  

  if (state.lectureToUser[lecture.id]) {
    const tokenList = state.lectureToUser[lecture.id]
    const filteredToken = tokenList.filter(t => t !== token)
    state.lectureToUser[lecture.id] = filteredToken
    
    if (filteredToken.length < 1) {
      delete state.lectureToUser[lecture.id]
    }
  }
    
}

Object.assign(state, { add, remove, userLectures })

module.exports = state