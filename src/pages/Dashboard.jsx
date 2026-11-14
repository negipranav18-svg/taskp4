
import { auth } from '../firebase';

export default function Dashboard() {
  const user = auth.currentUser;

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">
        <h1 className="mb-4 text-3xl font-bold text-blue-700">
          Welcome to your Dashboard!
        </h1>

        <p className="mb-2 text-gray-700">
          You have successfully logged in with Google.
        </p>

        <p className="text-gray-600">
          Name: {user?.displayName || 'User'}
        </p>

        <p className="text-gray-600">
          Email: {user?.email || 'No email available'}
        </p>
      </div>
    </main>
  );
}
