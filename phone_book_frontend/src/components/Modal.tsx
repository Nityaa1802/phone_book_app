/* eslint-disable react/no-unescaped-entities */

import { useContext } from 'react';
import { ModalContext } from '../context/modalContext';

export default function Modal() {
  const { setModalComponent, modalComponent } = useContext(ModalContext);
  return (
    <div className=' overflow-y-auto fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-opacity-45 bg-black flex'>
      <div className='relative p-4 w-full max-w-md max-h-full'>
        <div className='relative bg-white rounded-lg shadow'>
          <button
            onClick={() => setModalComponent(null)}
            type='button'
            className='absolute top-3 end-2.5 text-grey-primary bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center'
            data-modal-hide='popup-modal'
          >
            <svg
              className='w-3 h-3'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
              />
            </svg>
            <span className='sr-only'>Close modal</span>
          </button>
          <div className='p-4 md:p-5 text-center'>{modalComponent}</div>
        </div>
      </div>
    </div>
  );
}
