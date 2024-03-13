import { Contact, ContactDetails } from '../types';
import { http } from './interceptor';

export const fetchContactList = async (
  page: number,
  item: number,
  search:string
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
