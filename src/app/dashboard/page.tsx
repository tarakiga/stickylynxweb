import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import Image from "next/image";
import RestaurantList from "./components/RestaurantList";
import UserMenu from "./components/UserMenu";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  console.log("[Dashboard] getServerSession session:", session);
  if (!session) redirect("/api/auth/signin");

  const user = session.user;

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-8">
      <header className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          {user?.image && (
            <Image src={user.image} alt="User avatar" width={48} height={48} className="rounded-full" />
          )}
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user?.name || "User"}</h1>
            <p className="text-gray-600 text-sm">{user?.email}</p>
          </div>
        </div>
        <UserMenu user={user} />
      </header>

      {/* Analytics widget placeholder (can be made dynamic later) */}
      <section className="mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col sm:flex-row items-center gap-6">
          <div>
            <div className="text-3xl font-bold">—</div>
            <div className="text-gray-500">Lists</div>
          </div>
          <div className="w-px h-8 bg-gray-200 hidden sm:block" />
          <div>
            <div className="text-3xl font-bold">—</div>
            <div className="text-gray-500">Total Clicks</div>
          </div>
        </div>
      </section>

      <RestaurantList />
    </main>
  );
} 