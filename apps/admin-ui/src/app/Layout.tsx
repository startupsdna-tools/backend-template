import {
  AppBar as RaAppBar,
  AppBarProps,
  Layout as RaLayout,
  LayoutProps,
  Logout,
  UserMenu,
} from 'react-admin';
import { AccountMenuItem } from '@app/admin-auth-ui';

export function Layout(props: LayoutProps) {
  return <RaLayout {...props} appBar={AppBar} />;
}

function AppBar(props: AppBarProps) {
  return (
    <RaAppBar
      {...props}
      userMenu={
        <UserMenu>
          <AccountMenuItem />
          <Logout />
        </UserMenu>
      }
    />
  );
}
