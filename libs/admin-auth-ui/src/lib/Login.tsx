import { SignIn } from '@clerk/clerk-react';

export function Login() {
  return (
    <div style={{ marginTop: '4rem', display: 'grid', placeContent: 'center' }}>
      <SignIn routing="virtual" />
    </div>
  );
}
