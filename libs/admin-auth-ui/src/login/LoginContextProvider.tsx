import { useEffect, useState, ReactNode } from 'react';
import { useAuthProvider, useAuthState } from 'react-admin';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FirebaseAuthProvider } from '../authProvider';
import { LoginContext, LoginContextValue, LoginInputs } from './LoginContext';

export function LoginContextProvider(props: { children: ReactNode }) {
  const authProvider = useAuthProvider<FirebaseAuthProvider>();
  const authState = useAuthState();
  const navigate = useNavigate();
  const [resetPasswordDone, setResetPasswordDone] = useState(false);

  useEffect(() => {
    if (!authState.isPending && authState.authenticated) {
      redirect();
    }
  }, [authState.isPending, authState.authenticated]);

  const form = useForm<LoginInputs>({
    defaultValues: import.meta.env.PROD
      ? {}
      : {
          email: import.meta.env.VITE_ADMIN_AUTH_EMAIL,
          password: import.meta.env.VITE_ADMIN_AUTH_PASSWORD,
        },
  });

  function redirect() {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');
    if (redirect) {
      navigate(redirect);
    } else {
      navigate('/');
    }
  }

  const submitLogin = form.handleSubmit(async (data) => {
    await authProvider
      ?.login(data)
      .then(async () => redirect())
      .catch((error) => {
        form.setError('root', { type: error.code, message: error.message });
      });
  });

  const submitForgot = form.handleSubmit(async (data) => {
    await authProvider
      ?.resetPassword(data.email)
      .then(async () => {
        form.resetField('email');
        setResetPasswordDone(true);
      })
      .catch((error) => {
        form.setError('root', { type: error.code, message: error.message });
      });
  });

  const loginContext: LoginContextValue = {
    form,
    submitLogin,
    submitForgot,
    resetPasswordDone,
  };

  if (authState.isLoading) {
    return null;
  }

  return (
    <LoginContext.Provider value={loginContext}>
      {props.children}
    </LoginContext.Provider>
  );
}
