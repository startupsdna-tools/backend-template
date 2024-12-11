import { BrowserRouter } from 'react-router-dom';
import { Admin } from 'react-admin';
import { Dashboard } from '../dashboard';
import { PostsResource } from '../posts';

export function App() {
  return (
    <BrowserRouter>
      <Admin dashboard={Dashboard}>{PostsResource}</Admin>
    </BrowserRouter>
  );
}

export default App;
