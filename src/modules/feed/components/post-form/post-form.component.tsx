import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button } from '../../../../common/components/button/button.component';
import { ErrorsList } from '../../../../common/components/errors-list/errors-list.component';
import { Input } from '../../../../common/components/input/input.component';
import { MDEditorHookForm } from '../../../../common/components/mdeditor-hook-form/mdeditor-hook-form.component';
import { SingleArticleInDTO } from '../../api/dto/single-article.in';
import { PostFormValues } from '../../types';

const validationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required(),
  tags: yup.string(),
});

interface PostFormProps {
  onSubmit: (values: PostFormValues) => Promise<void>;
  data?: SingleArticleInDTO;
}

export const PostForm: FC<PostFormProps> = ({ data, onSubmit }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<PostFormValues>({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tags: '',
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    reset({
      title: data.article.title,
      description: data.article.description,
      body: data.article.body,
      tags: data.article.tagList.join(', '),
    });
  }, [data]);

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <ErrorsList errors={errors} />
      <Input placeholder="Article Title" {...register('title')} />
      <Input
        placeholder="What's this article about"
        {...register('description')}
        size="SM"
      />
      <MDEditorHookForm control={control} name="body" />
      <Input placeholder="tags" {...register('tags')} size="SM" />
      <div className="flex justify-end">
        <Button
          size="LG"
          type="submit"
          btnStyle="GREEN"
          disabled={isSubmitting}
        >
          Publish article
        </Button>
      </div>
    </form>
  );
};
