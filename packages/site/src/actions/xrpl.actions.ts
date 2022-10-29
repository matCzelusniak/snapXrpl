const XrplActions = {
  setAccounts,
};

function fetchStart() {
  return (dispatch) => {
    dispatch(_fetchStart());
  };
}

const _fetchStart = () => {
  return {
    type: AuthConstants.PROFILE_GET_START,
  };
};

const setAccounts = (accounts) => {
  return {
    type: 'SET_ACCOUNTS',
    payload: accounts,
  };
};

function setAccountsUpd(accountsData) {
  dispatch(setAccounts(accountsData));
}

export default XrplActions;
