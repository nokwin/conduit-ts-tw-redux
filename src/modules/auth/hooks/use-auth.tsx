import { useAppDispatch, useAppSelector } from '../../../store/store';
import { SignInOutDTO } from '../api/dto/sign-in.out';
import { SignUpOutDTO } from '../api/dto/sign-up.out';
import { useLazySignInQuery, useLazySignUpQuery } from '../api/repository';
import { selectUser, setUser } from '../service/slice';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const isLoggedIn = Boolean(user);

  const [triggerSignInQuery] = useLazySignInQuery();
  const signIn = async (values: SignInOutDTO['user']) => {
    const { data } = await triggerSignInQuery(values, false);

    if (!data) {
      throw new Error('No data in query');
    }

    dispatch(setUser(data.user));
  };

  const [triggerSignUpQuery] = useLazySignUpQuery();
  const signUp = async (values: SignUpOutDTO['user']) => {
    const { data } = await triggerSignUpQuery(values, false);

    if (!data) {
      throw new Error('No data in query');
    }

    dispatch(setUser(data.user));
  };

  const logOut = () => {
    dispatch(setUser(null));
  };

  return { isLoggedIn, signIn, signUp, logOut, user };
};
