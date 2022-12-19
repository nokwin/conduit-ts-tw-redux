import clsx from 'clsx';
import { ComponentProps, forwardRef } from 'react';

enum InputSize {
  SM = 'SM',
  BASE = 'BASE',
}

interface InputProps {
  placeholder: ComponentProps<'textarea'>['placeholder'];
  name: ComponentProps<'textarea'>['name'];
  onChange: ComponentProps<'textarea'>['onChange'];
  onBlur: ComponentProps<'textarea'>['onBlur'];
  rows: ComponentProps<'textarea'>['rows'];
  className?: ComponentProps<'textarea'>['className'];
  noBorder?: boolean;
  size?: keyof typeof InputSize;
}

export const TextArea = forwardRef<HTMLTextAreaElement, InputProps>(
  ({ size = InputSize.BASE, noBorder, className, ...inputProps }, ref) => {
    const inputClasses = clsx(
      'border border-black/15 rounded w-full outline-none',
      {
        'py-3 px-6 text-xl': size === InputSize.BASE,
        'py-1 px-2 text-base': size === InputSize.SM,
        'border-0': noBorder,
      },
      className
    );

    return <textarea ref={ref} {...inputProps} className={inputClasses} />;
  }
);
