import { useGoogleLogin } from 'react-google-login';
import { useAuth } from '../context/auth-context';
import { authenticate } from '../utils/api-client';

export default function useAuthAction() {
  const user = useAuth();
  const { signIn } = useGoogleLogin({
    onSuccess: authenticate,
    clientId: '724096889503-htt3jh98033ccm54s8oe9h4e4h1h7lcj.apps.googleusercontent.com',
  });

  function handleAuthAction(authAction, data) {
    if (user) {
      authAction(data);
    } else {
      signIn();
    }
  }

  return handleAuthAction;
}
