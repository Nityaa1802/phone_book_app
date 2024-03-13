import Button from '../components/Button';
import { ReactComponent as AddContactIcon } from '../assets/icons/add.svg';
import SearchBar from '../components/SearchBar';
import CustomTable from '../components/Table';
import { useCallback, useContext, useEffect, useState } from 'react';
import { addContact, fetchContactList } from '../api/request';
import { Contact, ContactDetails } from '../types';
import Spinner from '../components/Spinner';
import { ModalContext } from '../context/modalContext';
import toast from 'react-hot-toast';
import AddContact from '../components/AddContact';
import { UserContext } from '../context/userContext';
import { ReactComponent as Edit } from '../assets/icons/edit.svg';
import { ReactComponent as NoContact } from '../assets/icons/no-contacts.svg';
import AddUser from '../components/AddUser';

export default function PhoneBook() {
  const [contactList, setContactList] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemPerPage] = useState(8);
  const [search, setSearch] = useState('');
  const { setModalComponent } = useContext(ModalContext);
  const { setUser, user } = useContext(UserContext);

  async function getContactList() {
    try {
      const response = await fetchContactList(page, itemsPerPage, search);
      setContactList(response.data);
      setTotal(response.count);
      setLoading(false);
    } catch (err) {}
  }

  async function onAddClick(contactDetails: ContactDetails, id?: number) {
    try {
      const response = await addContact(contactDetails);
      console.log(response);
      if (response.data === 'Added Successfully') {
        toast.success('Contact added successfully');
        setLoading(true);
      }
      setModalComponent(null);
    } catch (err) {}
  }
  const debouncehandeler = useCallback(() => {
    var timer = setTimeout(() => {
      (async () => {
        await getContactList();
      })();
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(debouncehandeler, [search, loading]);

  if (loading) return <Spinner />;

  return (
    <div className='flex w-full h-full'>
      <div className='w-[35%] p-7'>
        <div className='flex justify-between items-center'>
          <p className='text-2xl font-semibold leading-10 mb-2'>My Details</p>
          <Edit
            className='cursor-pointer'
            onClick={() => {
              if (user) setModalComponent(<AddUser userDetails={user} />);
            }}
          />
        </div>
        <hr />
        <div className='my-5'>
          {[
            { label: 'Name:', value: `${user?.firstName} ${user?.lastName}` },
            { label: 'Phone Number 1:', value: user?.phoneNo1 },
            { label: 'Phone Number 2:', value: user?.phoneNo2 },
            { label: 'Email:', value: user?.email },
            { label: 'Address:', value: user?.address },
          ].map((item) => (
            <div
              className='bg-gray-100 p-3 rounded-lg mb-4 border border-gray-200 shadow-md'
              key={item.label}
            >
              <p>{item.label}</p>
              <p className='my-2 text-lg text-purple-600 font-semibold'>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className='p-7 w-full h-full  border-s border-gray-200'>
        <p className='text-2xl font-semibold leading-10 mb-2'>My Contacts</p>
        <hr />
        <div className='h-10 flex justify-between items-center w-full my-8'>
          <SearchBar
            search={search}
            placeholder='search contacts... '
            setSearch={(e) => {
              setSearch(e);
            }}
            className={
              contactList.length == 0 && search === '' ? 'invisible' : ''
            }
          />
          <Button
            onClick={() => {
              setModalComponent(
                <AddContact
                  onSubmit={(contactDetail: ContactDetails) => {
                    (async () => {
                      await onAddClick(contactDetail);
                    })();
                  }}
                />
              );
            }}
            placeholder={
              <div className='flex gap-1 justify-center items-center'>
                <AddContactIcon />
                <p className='text-white text-sm '>Add New</p>
              </div>
            }
            className='px-3 py-2 '
          />
        </div>
        {total != 0 ? (
          <CustomTable
            setItemPerPage={setItemPerPage}
            itemsPerPage={itemsPerPage}
            page={page}
            setPage={setPage}
            count={total}
            rows={contactList}
            setLoading={setLoading}
          />
        ) : (
          <div className='h-[70%] w-full flex justify-center items-center'>
            <div className='w-[50%] h-[50%] flex flex-col justify-center gap-5 items-center'>
              <NoContact />
              <div className='text-[#00000054] text-center'>
                <p className='font-medium mb-2 text-xl text-grey-primary'>
                  No Contacts Found.
                </p>
                {search !== '' ? (
                  <p>
                    Please clear the search bar or try searching for a different
                    name
                  </p>
                ) : (
                  <p>Please add some new contacts</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
