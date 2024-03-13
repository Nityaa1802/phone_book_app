import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ReactComponent as Delete } from '../assets/icons/delete.svg';
import { ReactComponent as Edit } from '../assets/icons/edit.svg';
import { Avatar } from '@mui/material';
import { Contact, ContactDetails } from '../types';
import { ModalContext } from '../context/modalContext';
import { useContext } from 'react';
import DeleteComponent from './DeleteContact';
import {  deleteContact, updateContact } from '../api/request';
import toast from 'react-hot-toast';
import AddContact from './AddContact';

interface Column {
  id: 'name' | 'phoneNo' | 'email' | 'tags';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 100, align: 'left' },
  { id: 'phoneNo', label: 'Phone Number', minWidth: 100, align: 'center' },
  {
    id: 'email',
    label: 'email',
    minWidth: 150,
    align: 'center',
  },
  {
    id: 'tags',
    label: 'Tags',
    minWidth: 100,
    align: 'center',
  },
];
export default function CustomTable({
  rows,
  count,
  setItemPerPage,
  setPage,
  itemsPerPage,
  page,
  setLoading,
}: {
  rows: Contact[];
  count: number;
  setItemPerPage: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  itemsPerPage: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setModalComponent, modalComponent } = useContext(ModalContext);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setItemPerPage(+event.target.value);
    setPage(0);
  };

  async function removeContact(id: number) {
    try {
      const response = await deleteContact(id);
      if (response.data === 'Deleted Successfully') {
        toast.success('Contact removed successfully');
        setLoading(true);
      }
    } catch (err) {}
  }

  async function onAddClick(contactDetails: ContactDetails, id?: number) {
    if (!id) return;
    try {
      const response = await updateContact(id, contactDetails);
      if (response.data === 'Updated Successfully') {
        toast.success('Contact updated successfully');
        setLoading(true);
      }

      setModalComponent(null);
    } catch (err) {}
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ width: '100%', maxHeight: 510 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell
                align={'right'}
                style={{
                  minWidth: 10,
                  backgroundColor: '#e6d3f2',
                }}
              />
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    textTransform: 'uppercase',
                    color: '#4b5563',
                    fontWeight: '600',
                    backgroundColor: '#e6d3f2',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                align={'center'}
                style={{
                  minWidth: 120,
                  backgroundColor: '#e6d3f2',
                }}
              />
            </TableRow>
          </TableHead>
          <TableBody sx={{ overflow: 'hidden', maxHeight: '70%' }}>
            {rows
              .slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                    <TableCell align={'right'}>
                      <Avatar className='inline p-2 px-3'>
                        {row.name.charAt(0).toUpperCase()}
                      </Avatar>
                    </TableCell>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <>
                          {column.id === 'tags' ? (
                            <TableCell key={column.id} align={column.align}>
                              <div className=' bg-purple-200 inline px-2 py-1 border-0.5 border-purple-500 text-purple-500 rounded-full'>
                                {value}
                              </div>
                            </TableCell>
                          ) : (
                            <TableCell
                              key={column.id}
                              sx={{ color: '#17293599' }}
                              align={column.align}
                            >
                              {value}
                            </TableCell>
                          )}
                        </>
                      );
                    })}
                    <TableCell
                      align='center'
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Edit
                        className='mr-5 cursor-pointer'
                        onClick={() => {
                          setModalComponent(
                            <AddContact
                              contactDetails={row}
                              onSubmit={(contactDetail: ContactDetails) => {
                                (async () => {
                                  await onAddClick(contactDetail, row?.id);
                                })();
                              }}
                            />
                          );
                        }}
                      />
                      <Delete
                        className='cursor-pointer'
                        onClick={() => {
                          setModalComponent(
                            <DeleteComponent
                              onCancelClick={() => setModalComponent(null)}
                              onDelete={async () => {
                                removeContact(row.id);
                                setModalComponent(null);
                              }}
                            />
                          );
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 8, 10, 25, 100]}
        component='div'
        count={count}
        rowsPerPage={itemsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          borderTop: 0.5,
          borderColor: '#e5e7eb',
        }}
      />
    </Paper>
  );
}
