import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Props {
  onChange: (query: string) => void;
}

export function SearchInput({ onChange }: Props) {
  return (
    <div className='w-full flex items-center rounded-full bg-slate-700 transition focus-within:border-brand-600 focus-within:text-brand-600 focus-within:bg-slate-800 text-slate-300 overflow-hidden'>
      <MagnifyingGlassIcon className='w-4 h-4 ml-4' />

      <input
        className='bg-transparent w-full px-4 py-1.5 focus:outline-none text-slate-300'
        placeholder='Buscar...'
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
