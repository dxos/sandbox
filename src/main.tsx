import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import {
  Add as AddIcon,
  Redeem as RedeemIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import { Box, CssBaseline, colors, Typography, IconButton } from '@mui/material';

import { PublicKey } from '@dxos/crypto';
import { ClientProvider, useClient, useParties, useProfile } from '@dxos/react-client';
import { CopyText, FullScreen } from '@dxos/react-components';
import {
  ErrorBoundary,
  FrameworkContextProvider,
  JoinPartyDialog,
  PartySharingDialog,
  RegistrationDialog
} from '@dxos/react-framework';

import { configProvider } from './config';

const App = () => {
  const client = useClient();
  const profile = useProfile();
  const parties = useParties();

  const [showRedeem, setShowRedeem] = useState(false);
  const [shareParty, setShareParty] = useState<PublicKey>();

  if (!profile) {
    return (
      <RegistrationDialog
        open
        onComplete={async (seedPhrase, username) => {
          // Create profile.
          await client.halo.createProfile({ username });

          // Create initial party.
          await client.echo.createParty();
        }}
        onRestore={() => {
          throw new Error('Not implemented.');
        }}
      />
    );
  }

  return (
    <>
      <Box sx={{
        maxWidth: 600,
        minHeight: '40vmin',
        marginX: 'auto',
        marginY: 10,
        padding: 3,
        backgroundColor: 'background.paper'
      }}>
        <Box display='flex'>
          <Typography
            component='h1'
            sx={{
              fontSize: 'x-large'
            }}
          >
            Parties
          </Typography>
          <Box flex={1} />
          <IconButton title='Join party.' onClick={() => setShowRedeem(true)}>
            <RedeemIcon />
          </IconButton>
          <IconButton title='Create party.' onClick={() => client.echo.createParty()}>
            <AddIcon />
          </IconButton>
        </Box>

        {parties.map(party => (
          <Box key={party.key.toHex()} display='flex'>
            <CopyText value={party.key.toHex()} />
            <IconButton title='Share party.' onClick={() => setShareParty(party.key)}>
              <ShareIcon />
            </IconButton>
          </Box>
        ))}
      </Box>

      <JoinPartyDialog
        open={showRedeem}
        onClose={() => setShowRedeem(false)}
      />

      {/* TODO(wittjosiah): Invititation list shared between parties? */}
      {shareParty && (
        <PartySharingDialog
          open
          partyKey={shareParty}
          onClose={() => setShareParty(undefined)}
        />
      )}
    </>
  );
};

const Root = () => {
  const config = () => configProvider().then(({ values }) => values);

  return (
    <FullScreen sx={{ backgroundColor: colors.grey[50] }}>
      <ErrorBoundary>
        <CssBaseline />
        <ClientProvider config={config}>
          <FrameworkContextProvider>
            <App />
          </FrameworkContextProvider>
        </ClientProvider>
      </ErrorBoundary>
    </FullScreen>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
