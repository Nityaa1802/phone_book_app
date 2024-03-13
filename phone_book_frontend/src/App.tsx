import { useEffect, useState } from 'react';
import './App.css';
import PhoneBook from './pages';
import { ModalContext } from './context/modalContext';
import Modal from './components/Modal';
import logo from './assets/images/Phone.png';
import { User } from './types';
import { UserContext } from './context/userContext';
import { getUser } from './api/request';
import Spinner from './components/Spinner';
import AddUser from './components/AddUser';

function App() {
  const [modalComponent, setModalComponent] = useState<JSX.Element | null>(
    null
  );
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function getUserDetails() {
    if (user && user.id) return;
    try {
      const response = await getUser();
      if (response.length !== 0) {
        setUser(response[0]);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    (async () => {
      await getUserDetails();
    })();
  }, [user]);

  if (loading) return <Spinner />;
  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      <ModalContext.Provider
        value={{
          modalComponent: modalComponent,
          setModalComponent: setModalComponent,
        }}
      >
        {modalComponent && <Modal />}
        <div className='h-screen w-screen flex flex-col'>
          <div className='h-16 flex justify-center items-center w-full px-16'>
            <img alt='logo' src={logo} className='w-32 h-14' />
          </div>
          <hr className='bg-gray-200' />
          <div className='flex-1'>{user ? <PhoneBook /> : <AddUser />}</div>
        </div>
      </ModalContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
