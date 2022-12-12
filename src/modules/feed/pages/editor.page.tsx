import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Button } from '../../../common/components/button/button.component';
import { Container } from '../../../common/components/container/container.component';
import { ErrorsList } from '../../../common/components/errors-list/errors-list.component';
import { Input } from '../../../common/components/input/input.component';
import { MDEditorHookForm } from '../../../common/components/mdeditor-hook-form/mdeditor-hook-form.component';
import { CreateArticleInDTO } from '../api/dto/create-article.in';
import { EditArticleInDTO } from '../api/dto/edit-article.in';
import {
  useCreateArticleMutation,
  useEditArticleMutation,
  useGetSingleArticleQuery,
} from '../api/repository';

interface EditorPageProps {}

interface EditorFormValues {
  title: string;
  description: string;
  body: string;
  tags: string;
}

const validationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required(),
  tags: yup.string(),
});

export const EditorPage: FC<EditorPageProps> = ({}) => {
  const [triggerCreateArticle] = useCreateArticleMutation();
  const [triggerEditArticle] = useEditArticleMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<EditorFormValues>({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tags: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const { slug } = useParams();
  const { data, isLoading } = useGetSingleArticleQuery(
    { slug: String(slug) },
    { skip: !Boolean(slug) }
  );
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

  const navigate = useNavigate();
  const onSubmit = async (values: EditorFormValues) => {
    try {
      let data: CreateArticleInDTO | EditArticleInDTO;
      if (slug) {
        data = await triggerEditArticle({ ...values, slug }).unwrap();
      } else {
        data = await triggerCreateArticle(values).unwrap();
      }
      navigate(`/article/${data.article.slug}`);
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  if (slug && isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
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
    </Container>
  );
};
