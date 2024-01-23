import { FC } from 'react';

export interface HighlightProps {
  title?: string;
  message: string;
  link?: {
    label: string;
    href: string;
  };
}

export const Highlight: FC<HighlightProps> = (props): JSX.Element => {
  return (
    <div id="dropdown-cta" className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900" role="alert">
      <div className="mb-3 flex items-center">
        {props.title && (
          <span className="me-2 rounded bg-orange-100 px-2.5 py-0.5 text-sm font-semibold text-orange-800 dark:bg-orange-200 dark:text-orange-900">
            {props.title}
          </span>
        )}
        <button
          type="button"
          className="-mx-1.5 -my-1.5 ms-auto inline-flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 p-1 text-blue-900 hover:bg-blue-200 focus:ring-2 focus:ring-blue-400 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
          data-dismiss-target="#dropdown-cta"
          aria-label="Close">
          <span className="sr-only">Close</span>
          <svg
            className="h-2.5 w-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
      <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">{props.message}</p>
      {props.link && (
        <a
          className="text-sm font-medium text-blue-800 underline hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
          href={props.link.href}>
          {props.link.label}
        </a>
      )}
    </div>
  );
};
