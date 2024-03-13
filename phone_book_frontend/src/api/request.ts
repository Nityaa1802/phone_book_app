import { Contact, ContactDetails, User, UserDetails } from '../types';
import { http } from './interceptor';

export const fetchContactList = async (
  page: number,
  item: number,
  search: string
): Promise<{
  data: Contact[];
  count: number;
}> => {
  const response = await http.get(
    `/contact?page=${page + 1}&items=${item}&search=${search}`
  );
  return response.data;
};

export const deleteContact = async (id: number) => {
  const response = await http.delete(`/contact/${id}`);
  return response;
};

export const updateContact = async (
  id: number,
  contactDetails: ContactDetails
) => {
  const response = await http.put(`/contact/${id}`, contactDetails);
  return response;
};

export const addContact = async (contactDetails: ContactDetails) => {
  const response = await http.post(`/contact`, contactDetails);
  return response;
};

export const getUser = async (): Promise<User[]> => {
  const response = await http.get(`/user`);
  return response.data;
};

export const postUser = async (user: UserDetails) => {
  const response = await http.post(`/user`, user);
  return response.data;
};

export const putUser = async (user: UserDetails, id: number) => {
  const response = await http.put(`/user/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await http.delete(`/user/${id}`);
  return response.data;
};
