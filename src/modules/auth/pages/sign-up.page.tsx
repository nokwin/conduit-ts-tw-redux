import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { Container } from '../../../common/components/container/container.component';
import { Input } from '../../../common/components/input/input.component';
import { Button } from '../../../common/components/button/button.component';
import { useLazySignUpQuery } from '../api/repository';
import { setUser } from '../service/slice';
import { useAppDispatch } from '../../../store/store';

interface SignUpPageProps {}

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
}

const validationSchema = yup.object({
  username: yup.string().required().min(3),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

export const SignUpPage: FC<SignUpPageProps> = () => {
  const { register, handleSubmit, formState } = useForm<SignUpFormValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
  });
  const [triggerSignUpQuery] = useLazySignUpQuery();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      const { data } = await triggerSignUpQuery(values, false);

      if (!data) {
        throw new Error('No data in query');
      }

      debugger;
      dispatch(setUser(data.user));
      navigate('/');
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  return (
    <Container>
      <h1 className="text-4xl text-center mb-4">Sing up</h1>
      <p className="text-center mb-4">
        <Link to="/sign-in">Have an account?</Link>
      </p>
      <form
        className="max-w-xl mx-auto flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <ul className="list-disc pl-10">
          {(
            Object.keys(formState.errors) as (keyof typeof formState.errors)[]
          ).map((field) => (
            <li key={`error-${field}`} className="text-conduit-red font-bold">
              {formState.errors[field]!.message}
            </li>
          ))}
        </ul>
        <Input placeholder="Username" {...register('username')} />
        <Input placeholder="Email" type="email" {...register('email')} />
        <Input
          placeholder="Password"
          type="password"
          {...register('password')}
        />
        <div className="flex justify-end">
          <Button
            btnStyle="GREEN"
            size="LG"
            type="submit"
            disabled={formState.isSubmitting}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </Container>
  );
};
