type Props = {
  data?: {
    me?: {
      username: 'string';
    };
  };
};

export function Home({ data }: Props) {
  console.log({ data });

  return (
    <div className='h-screen max-w-2xl w-full mx-auto flex'>
      <div className='flex-1 grid place-items-center'>
        <button className='px-4 py-3 bg-blue-500 text-white rounded-md shadow-lg shadow-blue-500/50'>
          Just a centered button!
        </button>
      </div>
    </div>
  );
}
