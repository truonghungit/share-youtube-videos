import { useFormik } from 'formik';
import * as Yup from 'yup';

import { UserCredential } from '@/core/auth';
import { Button } from '@/ui-components/button';
import { Input } from '@/ui-components/input';

const shareVideoValidationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Please try again. The email format is wrong.'),
  password: Yup.string().required('Password is required'),
});

type AuthFormProps = {
  onSubmit: (credential: UserCredential) => void;
};

export const AuthForm = ({ onSubmit }: AuthFormProps) => {
  const form = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: shareVideoValidationSchema,
    onSubmit: values => {
      onSubmit && onSubmit(values);
    },
  });

  return (
    <form className='flex items-center gap-3' onSubmit={form.handleSubmit}>
      <div>
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
      <div>
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
      <Button variant='primary' type='submit'>
        Login / Register
      </Button>
    </form>
  );
};
