//todo matCzelusniak.
// Change accounts to map<string, AccountData> later. Much more faster to read data
export default function XrplReducer(
  state = {
    accounts: [],
  },
  action,
) {
  switch (action.type) {
    case 'SET_ACCOUNTS': {
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
