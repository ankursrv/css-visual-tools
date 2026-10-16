import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  helperText?: string;
}

/**
 * Accessible Input atom with label, optional error and helper text.
 * Always requires an explicit `id` to link label to input.
 */
export function Input({ label, id, error, helperText, className, ...props }: InputProps) {
  const descriptionId = helperText ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const ariaDescribedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
        {props.required && (
          <span aria-hidden="true" className="ml-0.5 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        {...props}
        id={id}
        aria-describedby={ariaDescribedBy}
        aria-invalid={error ? true : undefined}
        className={cn(
          'h-10 w-full rounded-md border px-3 py-2 text-sm',
          'bg-white text-gray-900 placeholder:text-gray-400',
          'transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
          'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400',
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
          className,
        )}
      />

      {helperText && !error && (
        <p id={descriptionId} className="text-xs text-gray-500">
          {helperText}
        </p>
      )}

      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
