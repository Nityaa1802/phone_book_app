import { Formik } from 'formik';
import Input from './Input';
import Button from './Button';
import * as yup from 'yup';
import { Contact, ContactDetails } from '../types';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const ContactSchema = yup.object({
  name: yup.string().required('This is a mandatory field'),
  phoneNo: yup
    .string()
    .required('This is a mandatory field')
    .length(10, 'Phone number must be of 10 digits')
    .matches(phoneRegExp, 'Please enter a valid phone number')
    .trim(),
  email: yup
    .string()
    .required('This is a mandatory field')
    .email('Invalid Email'),
});

export default function AddContact({
  contactDetails,
  onSubmit,
}: {
  onSubmit: (contactDetail: ContactDetails) => void;
  contactDetails?: Contact;
}) {
  return (
    <div className='w-full h-fit px-4 min-w-[40vw]'>
      <p className='text-center font-semibold text-xl'>
        {contactDetails ? 'Edit Contact' : 'Add Contact'}
      </p>
      <div className='my-6'>
        <Formik
          initialValues={
            contactDetails
              ? contactDetails
              : { name: '', phoneNo: 0, email: '', tags: '' }
          }
          onSubmit={(values) => {
            onSubmit(values);
          }}
          validationSchema={ContactSchema}
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
            <form onSubmit={handleSubmit}>
              <Input
                id='name'
                name='name'
                onBlur={handleBlur}
                value={values.name}
                onChange={handleChange}
                placeholder='Name'
                error={errors.name}
                setFieldTouched={setFieldTouched}
                touched={touched.name}
              />

              <Input
                id='phoneNo'
                type='number'
                name='phoneNo'
                onBlur={handleBlur}
                value={values.phoneNo ? values.phoneNo.toString() : ''}
                onChange={handleChange}
                placeholder='Phone Number'
                error={errors.phoneNo}
                setFieldTouched={setFieldTouched}
                touched={touched.phoneNo}
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
                id='tags'
                name='tags'
                onBlur={handleBlur}
                value={values.tags}
                onChange={handleChange}
                placeholder='Label'
                error={errors.tags}
                setFieldTouched={setFieldTouched}
                touched={touched.tags}
              />

              <Button
                placeholder={contactDetails ? 'Save Changes' : 'Add Contact'}
                className='w-40 h-10'
                disabled={
                  contactDetails
                    ? !isValid ||
                      (values.email === contactDetails.email &&
                        values.name === contactDetails.name &&
                        values.phoneNo === contactDetails.phoneNo &&
                        values.tags === contactDetails.tags)
                    : false
                }
                isLoading={isSubmitting}
              />
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
