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

export default function PhoneBook() {
  const [contactList, setContactList] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemPerPage] = useState(8);
  const [search, setSearch] = useState('');
  const { setModalComponent } = useContext(ModalContext);

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
      <div className='w-[25%] p-7'>
        <p className='text-2xl font-semibold leading-10'>My Details</p>
      </div>
      <div className='p-7 w-full h-full  border-s border-gray-200'>
        <p className='text-2xl font-semibold leading-10 mb-2'>My Contacts</p>
        <hr />
        <div className='h-10 flex justify-between items-center w-full my-4'>
          <SearchBar
            search={search}
            placeholder='search contacts... '
            setSearch={(e) => {
              setSearch(e);
              // debouncehandeler();
            }}
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
          <div> No contacts</div>
        )}
      </div>
    </div>
  );
}
