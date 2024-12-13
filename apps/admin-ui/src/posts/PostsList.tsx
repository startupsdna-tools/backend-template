import { Datagrid, List, TextField } from 'react-admin';

export function PostsList() {
  return (
    <List>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
      </Datagrid>
    </List>
  );
}
