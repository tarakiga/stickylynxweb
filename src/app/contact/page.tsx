import ContactForm from '../dashboard/components/ContactForm';

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <ContactForm />
    </main>
  );
} 