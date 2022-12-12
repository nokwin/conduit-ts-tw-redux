import { FC } from 'react';
import { FieldErrorsImpl } from 'react-hook-form';

interface ErrorsListProps {
  errors: Partial<FieldErrorsImpl<any>>;
}

export const ErrorsList: FC<ErrorsListProps> = ({ errors }) => {
  return (
    <ul className="list-disc pl-10">
      {(Object.keys(errors) as (keyof typeof errors)[]).map((field) => (
        <li
          key={`error-${String(field)}`}
          className="text-conduit-red font-bold"
        >
          {errors[String(field)]!.message as string}
        </li>
      ))}
    </ul>
  );
};
