import { useState } from 'react';
import { styled, Typography } from '@mui/material';
import { LoginForm } from './LoginForm';
import { ForgotForm } from './ForgotForm';
import { LoginContextProvider } from './LoginContextProvider';

export function LoginPage() {
  const [view, setView] = useState<'login' | 'forgot'>('login');

  return (
    <LoginContextProvider>
      <Root>
        <Typography variant="subtitle1" color="grey.500" gutterBottom>
          {document.title}
        </Typography>
        {view === 'login' && <LoginForm gotoForgot={() => setView('forgot')} />}
        {view === 'forgot' && <ForgotForm gotoLogin={() => setView('login')} />}
      </Root>
    </LoginContextProvider>
  );
}

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  paddingTop: '6em',
});
