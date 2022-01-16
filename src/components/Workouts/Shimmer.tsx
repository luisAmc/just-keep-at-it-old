export function Shimmer() {
  return (
    <div className='animate-pulse flex flex-col space-y-4'>
      <div className='flex justify-between'>
        <div className='bg-stone-200 h-8 w-32 rounded-lg'></div>

        <div className='flex items-center space-x-2'>
          <div className='bg-stone-200 h-6 w-20 rounded-lg'></div>
          <span className='text-stone-300'>&middot;</span>
          <div className='bg-stone-200 h-6 w-20 rounded-full'></div>
        </div>
      </div>

      <div className='bg-stone-200 h-10 w-full rounded-lg'></div>

      <div className='bg-stone-200 h-52 w-full rounded-lg'></div>

      <div className='flex justify-end'>
        <div className='bg-stone-200 h-6 w-32 rounded-lg'></div>
      </div>
    </div>
  );
}
