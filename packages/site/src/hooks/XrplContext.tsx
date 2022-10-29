import { createContext, Dispatch, ReactNode, Reducer, useReducer } from 'react';

export type XrplState = {
  accounts: string[];
};

const initialState: XrplState = {
  accounts: [],
};

type XrplDispatch = { type: XrplActions; payload: any };

export const XrplContext = createContext<[XrplState, Dispatch<XrplDispatch>]>([
  initialState,
  () => {
    /* no op */
  },
]);

export enum XrplActions {
  SetAccounts = 'SetAccounts',
}

const reducer: Reducer<XrplState, XrplDispatch> = (state, action) => {
  switch (action.type) {
    case XrplActions.SetAccounts:
      return {
        ...state,
        accounts: action.payload,
      };

    default:
      return state;
  }
};

/**
 * XrplProvider context provider.
 *
 * @param props - React Props.
 * @param props.children - React component to be wrapped by the Provider.
 * @returns JSX.
 */
export const XrplProvider = ({ children }: { children: ReactNode }) => {
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   async function detectSnapInstalled() {
  //     const installedSnap = await getSnap();
  //     dispatch({
  //       type: MetamaskActions.SetInstalled,
  //       payload: installedSnap,
  //     });
  //   }

  //   detectFlask();

  //   if (state.isFlask) {
  //     detectSnapInstalled();
  //   }
  // }, [state.isFlask, window.ethereum]);

  // useEffect(() => {
  //   let timeoutId: number;

  //   if (state.error) {
  //     timeoutId = window.setTimeout(() => {
  //       dispatch({
  //         type: MetamaskActions.SetError,
  //         payload: undefined,
  //       });
  //     }, 10000);
  //   }

  //   return () => {
  //     if (timeoutId) {
  //       window.clearTimeout(timeoutId);
  //     }
  //   };
  // }, []);

  return (
    <XrplContext.Provider value={[state, dispatch]}>
      {children}
    </XrplContext.Provider>
  );
};
