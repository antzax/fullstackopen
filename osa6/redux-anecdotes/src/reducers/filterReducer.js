export const filterAnecdote = (search) => {
  return {
    type: 'FILTER',
    payload: {
      search,
    }
  }
}

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case "FILTER":
      state = action.payload.search
      return state
    default:
      return state;
  }
};

export default filterReducer;
