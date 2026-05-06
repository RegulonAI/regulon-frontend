import * as React from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'flex h-11 w-full min-w-0 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-900 shadow-sm shadow-zinc-900/5',
          'placeholder:text-zinc-400',
          'outline-none transition-colors',
          'focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/15',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
