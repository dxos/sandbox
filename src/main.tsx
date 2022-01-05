import React from 'react';
import ReactDOM from 'react-dom';

import { Box, CssBaseline, Link, colors } from '@mui/material';

import { ClientProvider, useClient } from '@dxos/react-client';
import { DXOS, JsonTreeView } from '@dxos/react-components';

const App = () => {
  const client = useClient();

  return (
    <Box>
      <Box 
        component='header'
        sx={{
          backgroundColor: colors.blueGrey[400],
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'calc(10px + 2vmin)',
          color: 'white'
        }}
      >
        <DXOS sx={{
          height: '30vmin',
          width: '30vmin'
        }} />
        <p>
          Edit <code>src/main.tsx</code> and save to reload.
        </p>
        <Link
          href="https://dxos.org"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: colors.lightBlue[300] }}
        >
          Learn DXOS
        </Link>
        <Box marginTop={4}>
          <JsonTreeView
            data={client.info()}
          />
        </Box>
      </Box>
    </Box>
  );
};

const Root = () => (
  <ClientProvider>
    <CssBaseline />
    <App />
  </ClientProvider>
);

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
