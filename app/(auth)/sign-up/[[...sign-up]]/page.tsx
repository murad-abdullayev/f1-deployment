import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="relative min-h-screen bg-[url('./assets/f1-cars-bg.jpg')] bg-cover flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" />
      <SignUp />
    </div>
  );
}
