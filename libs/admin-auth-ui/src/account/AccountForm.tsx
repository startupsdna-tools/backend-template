import {
  PasswordInput,
  SaveButton,
  SaveContextProvider,
  SaveContextValue,
  SimpleForm,
  TextInput,
  Toolbar,
  useAuthProvider,
  useGetIdentity,
  useNotify,
} from 'react-admin';
import { TextField } from '@mui/material';
import { AccountUpdateDto, FirebaseAuthProvider } from '../authProvider';

export function AccountForm() {
  const authProvider = useAuthProvider<FirebaseAuthProvider>();
  const { data: account, refetch, isLoading } = useGetIdentity();
  const notify = useNotify();

  const saveContext: SaveContextValue = {
    save: async (data: AccountUpdateDto) => {
      await authProvider?.update(data);
      if (refetch) refetch();
      notify('Account settings have been successfully updated', {
        type: 'success',
      });
    },
  };

  const defaultValues: AccountUpdateDto = {
    fullName: account?.fullName,
  };

  return (
    <SaveContextProvider value={saveContext}>
      <SimpleForm
        disabled={isLoading}
        defaultValues={defaultValues}
        toolbar={
          <Toolbar>
            <SaveButton />
          </Toolbar>
        }
      >
        <TextField
          label="Email"
          helperText={' '}
          value={account?.email || ''}
          disabled
          fullWidth
        />
        <TextInput source="fullName" label="Full Name" fullWidth />
        <PasswordInput source="password" label="New Password" fullWidth />
      </SimpleForm>
    </SaveContextProvider>
  );
}
