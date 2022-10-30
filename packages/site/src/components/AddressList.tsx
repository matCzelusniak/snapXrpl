/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { signTransactionsOffline, getSeed } from '../utils';
import { stringToHex } from '../utils/helpers';
import utf8 from 'utf8';
import ApiClient from '../utils/apiClient';
//import { sign } from 'ripple-keypairs';
//import xrpl from 'xrpl';

const SEND_XRPL = 'SEND_XRPL';

export default function AddressList(props: { accounts: string[] }) {
  const [open, setOpen] = React.useState(false);
  const [transactionType, setTransactionType] = useState<string>(SEND_XRPL);
  const [accountDestination, setAccountDestination] = useState<string>('');

  const handleChangeTransactionType = (event) => {
    console.log('jajo event', event.target.value);
    setTransactionType(event.target.value || null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  //todo matCzelusniak move logic outside component
  const handleSubmitTx = async (accountSource: string) => {
    console.log('dupa123 accountSource', accountSource);
    console.log('accountDestination', accountDestination);
    switch (transactionType) {
      case SEND_XRPL: {
        // const tx = {
        //   TransactionType: 'Payment',
        //   Account: 'rP8fVjTPJ3imoSKgAQfU5M3AviJ7DY7AMB',
        //   Destination: 'rJayywgQKxYjMRjswc1eF9YBwtG5mgJ25J',
        //   Amount: '13100000',
        //   Fee: '12',
        //   //Flags: 2147483648,
        //   Sequence: 32418809,
        //   // SigningPubKey:
        //   //   'ED20648486B5FFF62F5F81CB2557CC625240A7A91FF1A8EB876C02E812EED32953',
        // };
        const tx = {
          TransactionType: 'Payment',
          Account: 'rP8fVjTPJ3imoSKgAQfU5M3AviJ7DY7AMB',
          Destination: 'rJayywgQKxYjMRjswc1eF9YBwtG5mgJ25J',
          Amount: '13100000',
          Fee: '12',
          Flags: 2147483648,
          Sequence: 32418809,
        };
        //const tx = JSON.parse('{"TransactionType":"Payment","Account":"","Destination":"","Amount":"100000000","Flags":2147483648,"Fee":"100000","LastLedgerSequence":30828104,"Sequence":25}')
        const txTstring = JSON.stringify(tx);
        console.log('jajo txTstring', txTstring);
        const pv =
          'ED9A489C4991DFBBCC4513DD5F2C9F19584BC453A288F830634DBA959E6C7E92AB';

        // const encoder = new TextEncoder();
        // const msgBuffer = encoder.encode(txTstring);
        // console.log('jajo txTstring msgBuffer', msgBuffer);
        //const txMsgInHex = convertHex(msgBuffer);
        // const txInHex = msgBuffer.toString('hex');
        //console.log('jajo txTstring txMsgInHex', txInHex);
        const utfEncoded = utf8.encode(txTstring);
        console.log('jajo txTstring txMsgInHex', utfEncoded);
        const strHex = stringToHex(txTstring);
        console.log('jajo txTstring strHex', strHex);

        //const resJajo = sign(strHex, pv);

        //signTransactionsOffline;
        console.log('jajo tx', tx);
        const signedTX = await signTransactionsOffline(
          strHex,
          'rP8fVjTPJ3imoSKgAQfU5M3AviJ7DY7AMB',
        );
        //console.log('resJajo', resJajo);
        console.log('jajo signedTX', `${signedTX}`);

        const seedSource = await getSeed('rP8fVjTPJ3imoSKgAQfU5M3AviJ7DY7AMB');
        console.log('jajo seedSource', seedSource);
        // const my_wallet = xrpl.Wallet.fromSeed(seedSource);
        // let my_seq = 21404872;
        // const txJSON = {
        //   Account: accountSource,
        //   TransactionType: 'Payment',
        //   Destination: accountDestination,
        //   Amount: '13000000',
        //   Flags: 2147483648,
        //   LastLedgerSequence: 7835923, // Optional, but recommended.
        //   Fee: '13',
        //   Sequence: my_seq,
        // };

        // const signed = my_wallet.sign(txJSON);

        // console.log('tx_blob is:', signed.tx_blob);
        // console.log('tx hash is:', signed.hash);
        // const temp = {
        //   id: 2,
        //   command: 'sign',
        //   tx_json: {
        //     TransactionType: 'Payment',
        //     Account: accountSource,
        //     Destination: accountDestination,
        //     Amount: 100000000,
        //   },
        //   secret: seedSource,
        //   offline: false,
        //   fee_mult_max: 1000,
        // };

        const temp2 = {
          id: 2,
          command: 'submit',
          tx_json: {
            TransactionType: 'Payment',
            Account: 'rP8fVjTPJ3imoSKgAQfU5M3AviJ7DY7AMB',
            Destination: 'rJayywgQKxYjMRjswc1eF9YBwtG5mgJ25J',
            Amount: '13100000',
          },
          secret: seedSource,
          offline: false,
          fee_mult_max: 1000,
        };

        ApiClient.getApi().submitSign(temp2);
        //ApiClient.getApi().submitTx(signedTX);
        break;
      }

      default: {
        break;
      }
    }
  };

  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string,
  ) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <List sx={{ width: '100%', maxWidth: '360', bgcolor: 'bla' }}>
      {console.log('jajo props', props)}
      {props.accounts.map((value) => (
        <ListItem
          key={value.classicAddress}
          disableGutters={false}
          sx={{ height: 30 }}
          secondaryAction={
            <div>
              <Button onClick={handleClickOpen}>Actions</Button>
              <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Select Action</DialogTitle>
                <DialogContent>
                  <Box
                    component="form"
                    sx={{ display: 'flex', flexWrap: 'wrap' }}
                  >
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel htmlFor="demo-dialog-native">
                        Action
                      </InputLabel>
                      <Select
                        native
                        value={transactionType}
                        onChange={handleChangeTransactionType}
                        input={
                          <OutlinedInput
                            label="Action"
                            id="demo-dialog-native"
                          />
                        }
                        sx={{
                          width: 300,
                          color: 'success.main',
                          marginBottom: '3%',
                          fontSize: '15px',
                        }}
                      >
                        <option value={SEND_XRPL}>Send XRP</option>
                      </Select>
                      {transactionType === SEND_XRPL && (
                        <TextField
                          id="outlined-basic"
                          label="XRP classic address"
                          variant="outlined"
                          size="medium"
                          value={accountDestination}
                          onChange={(e) =>
                            setAccountDestination(e.target.value)
                          }
                        />
                      )}
                    </FormControl>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button
                    onClick={() => {
                      handleSubmitTx(value.classicAddress);
                    }}
                  >
                    Send
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          }
        >
          <ListItemText
            sx={{ fontSize: 25 }}
            primary={`${value.classicAddress} balance: ${
              value.balance === -1
                ? 'Account not activated. Send min 10XRP to account'
                : value.balance
            }`}
          />
        </ListItem>
      ))}
    </List>
  );
}
