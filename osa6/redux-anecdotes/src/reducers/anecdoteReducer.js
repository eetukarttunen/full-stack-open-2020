
const getId = () => (100000 * Math.random()).toFixed(0)

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export const addVote = (id) => {
  return {
    type: 'ADD_VOTE',
    data: {
      id: (id)
    }
  }
}


const anecdoteReducer = (state = [], action) => {
  var stateCopy = [...state]
  console.log("Staten tilanne: ", stateCopy)
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'ADD_VOTE':
    var indexCopy = stateCopy.findIndex((anecdote) => {
      return anecdote.id === action.data.id
    });
    //console.log("Täsmääkö: " + ((stateCopy[indexCopy].votes)+1))
    stateCopy[indexCopy].votes++;
    return stateCopy;
    // palautetaan default 
    default:
      return state
  }
}


export default anecdoteReducer