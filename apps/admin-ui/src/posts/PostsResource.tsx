import { Resource } from 'react-admin';
import { PostsList } from './PostsList';

export const PostsResource = (
  <Resource name="posts" list={PostsList} options={{}} />
);
