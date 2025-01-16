import LoginForm from './components/LoginForm';

export default function Login() {
  return (
    <div className="w-full h-[calc(100vh-81px)] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center max-w-[640px] w-1/3">
        <h1 className="mb-12 text-[2.25rem] font-medium">{'로그인'}</h1>

        <LoginForm />
      </div>
    </div>
  );
}
