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
import ApiClient from '../utils/apiClient';
//import { sign } from 'ripple-keypairs';
//import xrpl from 'xrpl';

const SEND_XRPL = 'SEND_XRPL';

export default function AddressList(props: { accounts: string[] }) {
  const [open, setOpen] = React.useState(false);
  const [transactionType, setTransactionType] = useState<string>(SEND_XRPL);
  const [accountDestination, setAccountDestination] = useState<string>('');
  const [amountToSend, setAmountToSend] = useState<number>(0);

  const handleChangeTransactionType = (event) => {
    setTransactionType(event.target.value || null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  //todo matCzelusniak move logic outside component
  const handleSubmitTx = async (
    accountSource: string,
    sequence: number,
    value,
  ) => {
    switch (transactionType) {
      case SEND_XRPL: {
        setOpen(false);
        const tx = {
          TransactionType: 'Payment',
          Account: accountSource,
          Destination: accountDestination,
          Amount: amountToSend.toString(),
          Fee: '12',
          Flags: 2147483648,
          Sequence: sequence,
        };
        const signedTX = await signTransactionsOffline(tx);
        if (signedTX !== false) {
          ApiClient.getApi().submitTx(signedTX);
        }

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
      {props.accounts.map((val) => (
        <ListItem
          key={val.classicAddress}
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
                        <>
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
                          <p></p>
                          <TextField
                            id="outlined-basic"
                            label="XRP Amount"
                            variant="outlined"
                            size="medium"
                            value={amountToSend}
                            onChange={(e) => setAmountToSend(e.target.value)}
                          />
                        </>
                      )}
                    </FormControl>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button
                    onClick={() => {
                      handleSubmitTx(val.classicAddress, val.sequence, val);
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
            primary={`${val.classicAddress} balance: ${
              val.balance === -1
                ? 'Account not activated. Send min 10XRP to account'
                : val.balance
            }`}
          />
        </ListItem>
      ))}
    </List>
  );
}
