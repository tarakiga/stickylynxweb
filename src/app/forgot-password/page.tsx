import PasswordResetRequestForm from '../dashboard/components/PasswordResetRequestForm';

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Forgot Password</h1>
      <PasswordResetRequestForm />
    </main>
  );
} 