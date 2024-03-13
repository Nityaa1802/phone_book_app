import { useState } from 'react';
import './App.css';
import PhoneBook from './pages';
import { ModalContext } from './context/modalContext';
import Modal from './components/Modal';
import logo from './assets/images/Phone.png';

function App() {
  const [modalComponent, setModalComponent] = useState<JSX.Element | null>(
    null
  );
  return (
    <ModalContext.Provider
      value={{
        modalComponent: modalComponent,
        setModalComponent: setModalComponent,
      }}
    >
      <div className='h-screen w-screen'>
        {modalComponent && <Modal />}
        <div className='h-16 flex justify-between items-center w-full px-16'>
          <img alt='logo' src={logo} className='w-32 h-14' />
        </div>
        <hr className='bg-gray-200' />
        <div className='h-[calc(100%-64px)]'>
          <PhoneBook />
        </div>
      </div>
    </ModalContext.Provider>
  );
}

export default App;
