import SignupForm from './components/SignupForm';

export default function Signup() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center max-w-[640px] w-1/3">
        <h1 className="mb-12 text-[2.25rem] font-medium">{'회원가입'}</h1>
        <SignupForm />
      </div>
    </div>
  );
}
