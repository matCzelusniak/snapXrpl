/* eslint-disable import/order */
import { FunctionComponent, ReactNode, useContext } from 'react';
import styled from 'styled-components';
import { Footer, Header } from './components';

import { GlobalStyle } from './config/theme';
import { ToggleThemeContext } from './Root';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import XrplReducer from './reducer/xrpl.reducers';
import ApiClient from './utils/apiClient';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  max-width: 100vw;
`;

export type AppProps = {
  children: ReactNode;
};

export const App: FunctionComponent<AppProps> = ({ children }) => {
  const toggleTheme = useContext(ToggleThemeContext);
  const store = createStore(XrplReducer);
  ApiClient.setStore(store);
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Wrapper>
        <Header handleToggleClick={toggleTheme} />
        {children}
        <Footer />
      </Wrapper>
    </Provider>
  );
};
