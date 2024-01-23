import { X } from 'lucide-react';
import { FC, useState } from 'react';
import { Link } from '../Link';

export interface HighlightProps {
  title?: string;
  message: string;
  link?: {
    label: string;
    href: string;
  };
}

export const Highlight: FC<HighlightProps> = (props): JSX.Element => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div data-show={show} className="mt-6 rounded-lg bg-blue-50 p-4 data-[show=false]:hidden">
      <div className="mb-3 flex items-center">
        {props.title && (
          <span className="me-2 rounded bg-orange-100 px-2.5 py-0.5 text-sm font-semibold text-orange-800 dark:bg-orange-200 dark:text-orange-900">
            {props.title}
          </span>
        )}
        <button
          type="button"
          className="-mx-1.5 -my-1.5 ms-auto inline-flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 p-1 text-blue-900 hover:bg-blue-200 active:bg-blue-300 "
          onClick={handleClose}>
          <span className="sr-only">Close</span>
          <X className="h-5 w-5" aria-hidden="true" fill="none" />
        </button>
      </div>
      <p className="mb-3 text-sm text-blue-800 ">{props.message}</p>
      {props.link && (
        <Link
          className="text-sm font-medium text-blue-800 underline hover:text-blue-900"
          href={props.link.href}>
          {props.link.label}
        </Link>
      )}
    </div>
  );
};
