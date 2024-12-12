import { forwardRef } from 'react';
import { useUserMenu } from 'react-admin';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { ManageAccounts } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const AccountMenuItem = forwardRef<any>((props, ref) => {
  const userMenu = useUserMenu();
  if (!userMenu) {
    throw new Error('<AccountMenuItem> should be used inside a <UserMenu>');
  }

  return (
    <MenuItem
      {...props}
      component={Link}
      to="/account"
      onClick={userMenu.onClose}
      ref={ref}
    >
      <ListItemIcon>
        <ManageAccounts />
      </ListItemIcon>
      <ListItemText>Account Settings</ListItemText>
    </MenuItem>
  );
});
