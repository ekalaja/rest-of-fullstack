const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
  sumOfAll: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      var goodState = Object.assign({}, state)
      goodState['good'] = goodState['good'] + 1
      goodState['sumOfAll'] = goodState['sumOfAll'] + 1
      return goodState
    case 'OK':
      var okState = Object.assign({}, state)
      okState['ok'] = okState['ok'] + 1
      okState['sumOfAll'] = okState['sumOfAll'] + 1
      return okState
    case 'BAD':
      var badState = Object.assign({}, state)
      badState['bad'] = badState['bad'] + 1
      badState['sumOfAll'] = badState['sumOfAll'] + 1
      return badState
    case 'ZERO':
      return initialState
    default:
      return state
  }
}


export default counterReducer