export default function XrplReducer(
  state = {
    accounts: [],
  },
  action,
) {
  switch (action.type) {
    case 'SET_ACCOUNTS': {
      console.log('jajom action.payload', action.payload);
      return {
        ...state,
        accounts: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
