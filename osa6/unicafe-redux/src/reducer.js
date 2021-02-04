const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}
                        // huomioi tässä on "kaksi parametria", yhdellä tulee NaN
const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return {...state, good : state.good + 1}
    case 'OK':
      return {...state, ok : state.ok + 1}
    case 'BAD':
      return {...state, bad : state.bad + 1}
    case 'ZERO':
      return ({...state, good: state.good = 0}, {...state, ok: state.ok = 0}, {...state, bad: state.bad = 0})
    default: return state
  }
  
}

export default counterReducer