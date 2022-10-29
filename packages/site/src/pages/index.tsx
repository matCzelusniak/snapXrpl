/* eslint-disable import/no-extraneous-dependencies */
import { useContext, useState } from 'react';
import styled from 'styled-components';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';

import {
  connectSnap,
  getSnap,
  createXRPAccount,
  getXRPAccountsAddresses,
  shouldDisplayReconnectButton,
  createXRPAccountBasedOnSeed,
  signTransactionsOffline,
} from '../utils';
import {
  ConnectButton,
  InstallFlaskButton,
  ReconnectButton,
  CreateXRPAccountButton,
  CreateXRPAccountButtonBasedOnSeed,
  Card,
} from '../components';

import ApiClient from '../utils/apiClient';
import AddressList from '../components/AddressList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 7.6rem;
  margin-bottom: 7.6rem;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 2.4rem;
  text-align: center;
`;

const Span = styled.span`
  color: ${(props) => props.theme.colors.primary.default};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 0;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 64.8rem;
  width: 100%;
  height: 100%;
  margin-top: 1.5rem;
`;

const Notice = styled.div`
  background-color: ${({ theme }) => theme.colors.background.alternative};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  color: ${({ theme }) => theme.colors.text.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;

  & > * {
    margin: 0;
  }
  ${({ theme }) => theme.mediaQueries.small} {
    margin-top: 1.2rem;
    padding: 1.6rem;
  }
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error.muted};
  border: 1px solid ${({ theme }) => theme.colors.error.default};
  color: ${({ theme }) => theme.colors.error.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.small} {
    padding: 1.6rem;
    margin-bottom: 1.2rem;
    margin-top: 1.2rem;
    max-width: 100%;
  }
`;

const Index = () => {
  const [state, dispatchMetamask] = useContext(MetaMaskContext);
  const dispatch = useDispatch();
  const xrplData = useSelector((state) => state);
  const [seed, setSeed] = useState('');
  const [secret, setSecret] = useState('');

  console.log('xrplData', xrplData);
  ApiClient.initApi();
  const handleConnectClick = async () => {
    try {
      const snapId = await connectSnap();
      console.log('jajo snap installed', snapId);
      dispatchMetamask({
        type: MetamaskActions.SetSnapId,
        payload: snapId,
      });

      const installedSnap = await getSnap();

      dispatchMetamask({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });

      if (snapId) {
        let accounts = await getXRPAccountsAddresses();
        let accountsData = [];
        for (let account of accounts) {
          accountsData.push({
            classicAddress: account,
            balance: 0,
          });

          try {
            ApiClient.getApi().getBalance(account);
          } catch (e) {
            console.log(e);
          }
        }

        console.log('jajo accounts', accountsData);
        dispatch({ type: 'SET_ACCOUNTS', payload: accountsData });

        // distapchXrpl({
        //   type: XrplActions.SetAccounts,
        //   payload: accounts,
        // });
      }
    } catch (e) {
      console.error(e);
      dispatchMetamask({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const handleCreateAccount = async () => {
    await createXRPAccount();
    const accounts = await getXRPAccountsAddresses();
    console.log('jajo accounts upd', accounts);

    let accountsData = [];
    for (let account of accounts) {
      accountsData.push({
        classicAddress: account,
        balance: 0,
      });

      try {
        ApiClient.getApi().getBalance(account);
      } catch (e) {
        console.log(e);
      }
    }

    //console.log('jajo accounts upd', accounts);
    dispatch({ type: 'SET_ACCOUNTS', payload: accountsData });
  };

  const handleCreateAccountBasedOnSeed = async () => {
    await createXRPAccountBasedOnSeed(seed);
    const accounts = await getXRPAccountsAddresses();
    console.log('jajo accounts upd', accounts);

    let accountsData = [];
    for (let account of accounts) {
      accountsData.push({
        classicAddress: account,
        balance: 0,
      });

      try {
        ApiClient.getApi().getBalance(account);
      } catch (e) {
        console.log(e);
      }
    }

    dispatch({ type: 'SET_ACCOUNTS', payload: accountsData });
  };

  const handleSignTransactionsOffline = async () => {
    await signTransactionsOffline();
  };

  // const handleCreateAccountBasedOnSecret = async () => {
  //   await createXRPAccountBasedOnSecret(secret);
  //   const accounts = await getXRPAccountsAddresses();
  //   console.log('jajo accounts upd', accounts);

  //   let accountsData = [];
  //   for (let account of accounts) {
  //     accountsData.push({
  //       classicAddress: account,
  //       balance: 0,
  //     });

  //     try {
  //       ApiClient.getApi().getBalance(account);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }

  //   dispatch({ type: 'SET_ACCOUNTS', payload: accountsData });
  // };

  return (
    <Container>
      <Heading>
        Welcome to <Span>Ripple metamask snap</Span>
      </Heading>
      <Subtitle>
        Easy use XRPL Ripple network via Metamask <Span>in SECURE way</Span>
      </Subtitle>
      <CardContainer>
        {state.error && (
          <ErrorMessage>
            <b>An error happened:</b> {state.error.message}
          </ErrorMessage>
        )}
        {!state.isFlask && (
          <Card
            content={{
              title: 'Install',
              description:
                'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
              button: <InstallFlaskButton />,
            }}
            fullWidth
          />
        )}
        {!state.snapId && (
          <Card
            content={{
              title: 'Connect',
              description:
                'Connect app to metamask and start using Ripple network',
              button: (
                <ConnectButton
                  onClick={handleConnectClick}
                  disabled={!state.isFlask}
                />
              ),
            }}
            disabled={!state.isFlask}
            fullWidth={true}
          />
        )}
        {shouldDisplayReconnectButton(state.installedSnap) && (
          <Card
            content={{
              title: 'Reconnect',
              description:
                'While connected to a local running snap this button will always be displayed in order to update the snap if a change is made.',
              button: (
                <ReconnectButton
                  onClick={handleConnectClick}
                  disabled={!state.installedSnap}
                />
              ),
            }}
            disabled={!state.installedSnap}
          />
        )}
        {state.snapId && (
          <Card
            content={{
              title: 'create XRPL Account',
              description: 'Create new XRPL account and use easy in Secure way',
              button: (
                <CreateXRPAccountButton
                  onClick={handleCreateAccount}
                  disabled={false}
                />
              ),
            }}
            disabled={false}
            fullWidth={false}
          />
        )}
        {state.snapId && (
          <Card
            content={{
              title: 'upload XRPL Account',
              description:
                'Upload existed XRPL account to metamask based on SEED. Use easy in Secure way',
              button: (
                <>
                  <CreateXRPAccountButtonBasedOnSeed
                    onClick={handleCreateAccountBasedOnSeed}
                    disabled={false}
                  />
                  <p></p>
                  <TextField
                    id="outlined-basic"
                    label="Seed"
                    variant="outlined"
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                  />
                </>
              ),
            }}
            disabled={false}
            fullWidth={false}
          />
        )}
        {state.snapId && (
          <Card
            content={{
              title: 'upload XRPL Account',
              description:
                'Upload existed XRPL account to metamask based on SEED. Use easy in Secure way',
              button: (
                <>
                  <CreateXRPAccountButtonBasedOnSeed
                    onClick={handleSignTransactionsOffline}
                    disabled={false}
                  />
                  <p></p>
                  <TextField
                    id="outlined-basic"
                    label="Seed"
                    variant="outlined"
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                  />
                </>
              ),
            }}
            disabled={false}
            fullWidth={false}
          />
        )}
        {/* {state.snapId && (
          <Card
            content={{
              title: 'upload XRPL Account',
              description:
                'Upload existed XRPL account to metamask based on SECRET. Use easy in Secure way',
              button: (
                <>
                  <CreateXRPAccountButtonBasedOnSecret
                    onClick={handleCreateAccountBasedOnSecret}
                    disabled={false}
                  />
                  <p></p>
                  <TextField
                    id="outlined-basic"
                    label="Seed"
                    variant="outlined"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                  />
                </>
              ),
            }}
            disabled={false}
            fullWidth={false}
          />
        )} */}
        <AddressList accounts={xrplData.accounts} />
        <Notice>
          <p>
            Please note that <b>all your private informations like keys</b> are
            kept in secure way in isolated environment and are not shared with
            anyone.
          </p>
        </Notice>
      </CardContainer>
    </Container>
  );
};

export default Index;
