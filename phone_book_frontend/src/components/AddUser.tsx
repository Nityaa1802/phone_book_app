import Input from './Input';
import { Formik } from 'formik';
import Button from './Button';
import { User, UserDetails } from '../types';
import * as yup from 'yup';
import { postUser, putUser } from '../api/request';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { ModalContext } from '../context/modalContext';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const UserSchema = yup.object({
  firstName: yup.string().required('This is a mandatory field'),
  lastName: yup.string().required('This is a mandatory field'),

  phoneNo1: yup
    .string()
    .required('This is a mandatory field')
    .length(10, 'Phone number must be of 10 digits')
    .matches(phoneRegExp, 'Please enter a valid phone number')
    .trim(),
  phoneNo2: yup
    .string()
    .required('This is a mandatory field')
    .length(10, 'Phone number must be of 10 digits')
    .matches(phoneRegExp, 'Please enter a valid phone number')
    .trim(),
  email: yup
    .string()
    .required('This is a mandatory field')
    .email('Invalid Email'),
  address: yup.string().required('This is a mandatory field'),
});

export default function AddUser({ userDetails }: { userDetails?: User }) {
  const { setUser } = useContext(UserContext);
  const { setModalComponent } = useContext(ModalContext);

  async function onSubmit(user: UserDetails) {
    try {
      if (userDetails) {
        const response = await putUser(user, userDetails.id);
        if (response === 'Updated Successfully') {
          toast.success('User Details Updated successfully');
          setUser(null);
          setModalComponent(null);
        }
      } else {
        const response = await postUser(user);
        if (response === 'Added Successfully') {
          toast.success('User Details added successfully');
          setUser({} as User);
        }
      }
    } catch (err) {}
  }

  return (
    <div className='h-full w-full flex justify-center items-center min-w-[60vw]'>
      <div
        className={`h-fit px-14 py-5 border-x border-gray-200 shadow-lg my-2 ${
          userDetails ? 'w-full' : 'w-[60%]'
        }`}
      >
        <p className='text-center font-semibold text-3xl my-2'>
          {userDetails ? 'Edit' : 'Add'} Your Details
        </p>
        <div className='my-6'>
          <Formik
            initialValues={
              userDetails
                ? userDetails
                : {
                    firstName: '',
                    lastName: '',
                    phoneNo1: 0,
                    phoneNo2: 0,
                    email: '',
                    address: '',
                  }
            }
            onSubmit={(values, { setSubmitting }) => {
              onSubmit(values);
            }}
            validationSchema={UserSchema}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              errors,
              setFieldTouched,
              touched,
              isValid,
            }) => (
              <form onSubmit={handleSubmit} className='flex flex-col '>
                <Input
                  id='firstName'
                  name='firstName'
                  onBlur={handleBlur}
                  value={values.firstName}
                  onChange={handleChange}
                  placeholder='First Name'
                  error={errors.firstName}
                  setFieldTouched={setFieldTouched}
                  touched={touched.firstName}
                />

                <Input
                  id='lastName'
                  name='lastName'
                  onBlur={handleBlur}
                  value={values.lastName}
                  onChange={handleChange}
                  placeholder='Last Name'
                  error={errors.lastName}
                  setFieldTouched={setFieldTouched}
                  touched={touched.lastName}
                />
                <Input
                  id='phoneNo1'
                  type='number'
                  name='phoneNo1'
                  onBlur={handleBlur}
                  value={values.phoneNo1 ? values.phoneNo1.toString() : ''}
                  onChange={handleChange}
                  placeholder='Phone Number 1'
                  error={errors.phoneNo1}
                  setFieldTouched={setFieldTouched}
                  touched={touched.phoneNo1}
                />

                <Input
                  id='phoneNo2'
                  type='number'
                  name='phoneNo2'
                  onBlur={handleBlur}
                  value={values.phoneNo2 ? values.phoneNo2.toString() : ''}
                  onChange={handleChange}
                  placeholder='Phone Number 2'
                  error={errors.phoneNo2}
                  setFieldTouched={setFieldTouched}
                  touched={touched.phoneNo2}
                />

                <Input
                  id='email'
                  name='email'
                  onBlur={handleBlur}
                  value={values.email}
                  onChange={handleChange}
                  placeholder='Email'
                  error={errors.email}
                  setFieldTouched={setFieldTouched}
                  touched={touched.email}
                />

                <Input
                  id='address'
                  name='address'
                  onBlur={handleBlur}
                  value={values.address}
                  onChange={handleChange}
                  placeholder='Address'
                  error={errors.address}
                  setFieldTouched={setFieldTouched}
                  touched={touched.address}
                />

                <Button
                  placeholder={userDetails ? 'Save Changes' : 'Add Details'}
                  className='w-48 h-12 mx-auto'
                  disabled={
                    userDetails
                      ? !isValid ||
                        (values.email === userDetails.email &&
                          values.firstName === userDetails.firstName &&
                          values.lastName === userDetails.lastName &&
                          values.phoneNo1 === userDetails.phoneNo1 &&
                          values.address === userDetails.address &&
                          values.phoneNo2 === userDetails.phoneNo2)
                      : false
                  }
                  isLoading={isSubmitting}
                />
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
