import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Button } from '@/ui-components/button';
import { Input } from '@/ui-components/input';

const shareVideoValidationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Please try again. The email format is wrong.'),
  password: Yup.string().required('Password is required'),
});

type AuthFormProps = {
  onSubmit: (email: string, password: string) => void;
};

export const AuthForm = ({ onSubmit }: AuthFormProps) => {
  const form = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: shareVideoValidationSchema,
    onSubmit: values => {
      onSubmit && onSubmit(values.email, values.password);
    },
  });

  return (
    <form className='flex flex-col md:flex-row items-center gap-3' onSubmit={form.handleSubmit}>
      <div className='w-full'>
        <Input
          name='email'
          placeholder='Email'
          type='email'
          autoComplete='off'
          hasError={form.touched.email && Boolean(form.errors.email)}
          value={form.values.email}
          onBlur={form.handleBlur}
          onChange={form.handleChange}
        />
      </div>
      <div className='w-full'>
        <Input
          name='password'
          placeholder='Password'
          type='password'
          value={form.values.password}
          hasError={form.touched.password && Boolean(form.errors.password)}
          onBlur={form.handleBlur}
          onChange={form.handleChange}
        />
      </div>
      <Button variant='primary' type='submit' className='w-full'>
        Login / Register
      </Button>
    </form>
  );
};
