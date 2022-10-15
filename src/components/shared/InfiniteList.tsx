import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';

interface Props {
  children: ReactNode;
  next(): void;
  length: number;
  hasNext: boolean;
}

const ROOT_MARGIN = '150px';

function useObserver(ref: RefObject<HTMLDivElement>) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>();
  const observerRef = useRef<IntersectionObserver>();

  if (!observerRef.current && typeof IntersectionObserver !== 'undefined') {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
      },
      {
        rootMargin: ROOT_MARGIN,
        threshold: 1
      }
    );
  }

  useEffect(() => {
    const loaderEl = ref.current;
    const observer = observerRef.current;
    if (!loaderEl || !observer) return;

    observer.observe(loaderEl);
    return () => observer.unobserve(loaderEl);
  }, [ref.current]);

  return entry;
}

export function InfiniteList({ children, next, length, hasNext }: Props) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [loading, setloading] = useState(false);
  const entry = useObserver(loaderRef);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setloading(false);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [length]);

  useEffect(() => {
    if (loading || !entry?.isIntersecting || !hasNext) return;
    setloading(true);
    next();
  }, [entry?.isIntersecting, loading, hasNext]);

  return (
    <>
      {children}
      {loading && <Loader />}
      {hasNext && <div ref={loaderRef}></div>}
    </>
  );
}

function Loader() {
  return (
    <div className='flex justify-center'>
      <svg
        className='animate-spin -ml-1 mr-3 h-7 w-7 text-brand-700'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
      >
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='4'
        ></circle>
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        ></path>
      </svg>
    </div>
  );
}
