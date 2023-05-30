import { Amplify } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../aws-exports';
import CreateHotel from './CreateHotel.jsx';
import MainPage from './MainPage.jsx';
Amplify.configure(awsExports);

const test = () =>
{
  Auth.currentSession().then(data => {return data.getAccessToken().getJwtToken().toString()});
}

function Login() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <MainPage user={user} signOut={signOut}/>
        </main>
      )}
    </Authenticator>
  );
}

export default Login;
