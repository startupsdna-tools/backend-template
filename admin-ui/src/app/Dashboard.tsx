import { useEffect, useState } from 'react';

export function Dashboard() {
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   fetch('/api/')
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // });

  return (
    <div>
      <h1>Welcome to admin-ui!</h1>
      <p>{message}</p>
    </div>
  );
}
