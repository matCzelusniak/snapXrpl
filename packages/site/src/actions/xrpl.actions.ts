const XrplActions = {
  setAccounts,
};

const setAccounts = (accounts) => {
  return {
    type: 'SET_ACCOUNTS',
    payload: accounts,
  };
};

export default XrplActions;
