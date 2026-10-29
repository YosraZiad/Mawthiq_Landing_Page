import React from 'react';
import { cn } from '../../lib/utils';
import { AlertCircle } from 'lucide-react';

export interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  optionalLabel?: string;
  helperText?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  required,
  optionalLabel,
  helperText,
  error,
  className,
  children,
}) => {
  return (
    <div className={cn('space-y-2 text-right', className)}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-slate-200"
        >
          {label}
          {required ? (
            <span className="text-red-400 mr-1 select-none" aria-hidden="true">
              *
            </span>
          ) : optionalLabel ? (
            <span className="text-xs text-slate-500 mr-2 font-normal">
              ({optionalLabel})
            </span>
          ) : null}
        </label>
      </div>

      {helperText && (
        <p className="text-xs text-slate-400 leading-normal font-normal">{helperText}</p>
      )}

      <div className="relative">{children}</div>

      {error && (
        <div
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-xs text-red-400 mt-1 animate-fade-in"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export const inputClass = (hasError?: boolean) =>
  cn(
    'w-full rounded-2xl bg-slate-950/90 border px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition-colors duration-150',
    'focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500',
    hasError
      ? 'border-red-500/80 bg-red-950/10 text-red-100 focus:border-red-500 focus:ring-red-500/30'
      : 'border-slate-800 hover:border-slate-700'
  );
