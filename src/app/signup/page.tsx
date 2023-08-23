import { SignUpForm } from "./components/SignUpForm";

export const SignupPage = () => {
  return (
    <div className="container">
      <SignUpForm type={"BUYER"} />
    </div>
  );
};

export default SignupPage;
