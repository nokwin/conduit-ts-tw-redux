import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Button } from '../../../../common/components/button/button.component';
import { TextArea } from '../../../../common/components/textarea/textarea.component';
import { useAuth } from '../../../auth/hooks/use-auth';
import { useCreateCommentMutation } from '../../api/repository';

interface NewCommentProps {
  slug: string;
}

interface NewCommentFormValues {
  comment: string;
}

const validationSchema = yup.object({
  comment: yup.string().required(),
});

export const NewComment: FC<NewCommentProps> = ({ slug }) => {
  const auth = useAuth();
  const [triggerCreateComment] = useCreateCommentMutation();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      comment: '',
    },
    resolver: yupResolver(validationSchema),
  });

  if (!auth.isLoggedIn) {
    return (
      <p>
        <Link to="/sign-in">Sign in</Link> or <Link to="/sign-up">sign up</Link>{' '}
        to add comments on this article.
      </p>
    );
  }

  const onSubmit = async (values: NewCommentFormValues) => {
    try {
      await triggerCreateComment({
        articleSlug: slug,
        comment: values.comment,
      }).unwrap();
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-conduit-gray-250 rounded"
    >
      <TextArea
        placeholder="Leave your comment"
        {...register('comment')}
        noBorder
        size="SM"
        rows={4}
        className="py-3 px-6"
      />
      <div className="border-t border-conduit-gray-250 bg-conduit-gray-150 py-3 px-5 flex justify-between items-center">
        <img
          src={auth.user?.image}
          alt={`${auth.user?.username} avatar`}
          className="w-8 h-8 rounded-full inline mr-2"
        />
        <Button type="submit" btnStyle="GREEN" disabled={isSubmitting}>
          Post comment
        </Button>
      </div>
    </form>
  );
};
