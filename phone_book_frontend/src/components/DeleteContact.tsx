export default function DeleteComponent({
  onDelete,
  onCancelClick,
}: {
  onDelete: () => Promise<void>;
  onCancelClick: () => void;
}) {
  return (
    <div>
      <svg
        className='mx-auto mb-4 text-grey-primary w-12 h-12 '
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 20 20'
      >
        <path
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
        />
      </svg>
      <h3 className='mb-5 text-lg font-normal text-grey-primary '>
        Are you sure you want to delete this Contact?
      </h3>
      <button
        data-modal-hide='popup-modal'
        type='button'
        className='text-white bg-red-primary hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center'
        onClick={() => {
          (async () => {
            await onDelete();
          })();
        }}
      >
        Yes, I'm sure
      </button>
      <button
        data-modal-hide='popup-modal'
        type='button'
        className='py-2.5 px-5 ms-3 text-sm font-medium text-black-primary focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-primary focus:z-10 focus:ring-4 focus:ring-gray-100 '
        onClick={onCancelClick}
      >
        No, cancel
      </button>
    </div>
  );
}
