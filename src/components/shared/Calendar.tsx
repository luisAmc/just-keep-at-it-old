import { CheckIcon, MinusIcon } from '@heroicons/react/24/outline';
import { addDays, addWeeks, endOfWeek, isSameDay, startOfWeek } from 'date-fns';
import { useMemo } from 'react';
import { formatDate } from 'src/utils/transforms';
import clsx from 'clsx';

interface CalendarProps {
  markedDays: Array<string>;
}

export function Calendar({ markedDays }: CalendarProps) {
  const today = new Date();
  const weekStart = startOfWeek(today);
  const start = addWeeks(weekStart, -2);
  const end = addDays(start, 27);

  const [headers, days] = useMemo(() => {
    const formatString = 'yy-MM-d';
    const headers = [];

    const endOfStartWeek = endOfWeek(start);
    for (
      let pivot = start;
      pivot <= endOfStartWeek;
      pivot = addDays(pivot, 1)
    ) {
      headers.push(
        <div
          key={`header-${formatDate(pivot, formatString)}`}
          className="grid place-items-center capitalize"
        >
          {formatDate(pivot, 'EEEEE')}
        </div>
      );
    }

    const specialDays = new Set(
      markedDays.map((day) => formatDate(new Date(day), formatString))
    );

    const days = [];

    for (let pivot = start; pivot <= end; pivot = addDays(pivot, 1)) {
      const formattedPivot = formatDate(pivot, formatString);

      days.push(
        <div
          key={formatDate(pivot, 'd-MMM')}
          className={clsx(
            'flex flex-col items-center justify-center rounded-lg border p-1.5',
            isSameDay(today, pivot)
              ? 'border-brand-300 bg-brand-800 text-brand-50'
              : 'border-transparent bg-white/[15%]'
          )}
        >
          {specialDays.has(formattedPivot) ? (
            <CheckIcon className="h-3.5 w-3.5 stroke-[3px]" />
          ) : (
            <MinusIcon className="h-3.5 w-3.5 stroke-[0.5px]" />
          )}
          <span className="text-[10px]">{formatDate(pivot, 'd')}</span>
        </div>
      );
    }

    return [headers, days];
  }, [markedDays, today]);

  return (
    <section className="rounded-xl bg-gradient-to-b from-white/5 to-white/30 px-2 py-3 backdrop-blur">
      <div className="mb-1 grid grid-cols-7 gap-1 text-brand-700">
        {headers}
      </div>

      <div className="grid grid-cols-7 grid-rows-4 gap-1">{days}</div>
    </section>
  );
}
