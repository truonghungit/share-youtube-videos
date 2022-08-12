import { Button } from '@/ui-components/button';
import Input from '@/ui-components/input';

type UserCredential = {
  email: string;
  password: string;
};

type AuthFormProps = {
  onSubmit: (credential: UserCredential) => void;
};

export const AuthForm = ({ onSubmit }: AuthFormProps) => {
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        email: '',
        password: '',
      });
    }
  };

  return (
    <form className='flex items-center gap-3'>
      <Input name='email' placeholder='Email' type='email' autoComplete='off' />
      <Input name='password' placeholder='Password' type='password' />
      <Button variant='primary' type='submit' onClick={handleSubmit}>
        Login / Register
      </Button>
    </form>
  );
};
