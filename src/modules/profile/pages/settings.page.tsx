import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Button } from '../../../common/components/button/button.component';
import { Container } from '../../../common/components/container/container.component';
import { ErrorsList } from '../../../common/components/errors-list/errors-list.component';
import { Input } from '../../../common/components/input/input.component';
import { TextArea } from '../../../common/components/textarea/textarea.component';
import { useAuth } from '../../auth/hooks/use-auth';
import { useUpdateUserMutation } from '../api/repository';

interface SettingsPageProps {}

interface SettingsFormValues {
  avatar: string;
  username: string;
  bio: string;
  email: string;
  newPassword: string;
}

const validationSchema = yup.object({
  avatar: yup.string().url().required(),
  username: yup.string().min(3).required(),
  bio: yup.string(),
  email: yup.string().email().required(),
  newPassword: yup.string(),
});

export const SettingsPage: FC<SettingsPageProps> = ({}) => {
  const auth = useAuth();
  const [triggerUpdateUser] = useUpdateUserMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormValues>({
    defaultValues: {
      avatar: auth.user?.image,
      username: auth.user?.username,
      bio: auth.user?.bio || '',
      email: auth.user?.email,
      newPassword: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values: SettingsFormValues) => {
    try {
      await triggerUpdateUser(values).unwrap();
      navigate(`/@${encodeURIComponent(values.username)}`);
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  return (
    <Container>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <ErrorsList errors={errors} />
        <Input
          placeholder="URL of profile picture"
          {...register('avatar')}
          size="SM"
        />
        <Input placeholder="Username" {...register('username')} />
        <TextArea
          placeholder="Short bio about you"
          {...register('bio')}
          rows={10}
        />
        <Input placeholder="Email" {...register('email')} type="email" />
        <Input
          placeholder="New password"
          {...register('newPassword')}
          type="password"
        />
        <div className="flex justify-end">
          <Button type="submit" btnStyle="GREEN" size="LG">
            Update settings
          </Button>
        </div>
      </form>
    </Container>
  );
};
