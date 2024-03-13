import { FormikErrors } from 'formik';

type InputPorps = {
  placeholder: string;
  className?: string;
  value: string | undefined;
  onChange?: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  onBlur?: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  id: string;
  name: string;
  error?: string;
  setFieldTouched: (
    field: string,
    isTouched?: boolean | undefined,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<any>>;
  touched: boolean | undefined;
  type?: 'text' | 'number';
};

export default function Input({
  placeholder,
  type = 'text',
  id,
  name,
  className = '',
  value,
  onChange,
  onBlur,
  error,
  setFieldTouched,
  touched,
}: InputPorps) {
  return (
    <div className={error && touched ? 'mb-3' : 'mb-10'}>
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        className={
          className +
          ' border border-light-grey-primary placeholder:grey-primary w-full p-4 rounded-lg outline-none ' +
          (error &&
            touched &&
            ' border-red-primary placeholder:text-red-primary')
        }
        onChange={onChange}
        onBlur={() => {
          setFieldTouched(id);
        }}
        style={{ resize: 'none' }}
      />
      {error && touched && (
        <p className='text-red-primary text-sm text-start mt-2'>{error}</p>
      )}
    </div>
  );
}
