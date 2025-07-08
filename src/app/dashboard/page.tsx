import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import Image from "next/image";
import RestaurantList from "./components/RestaurantList";
import UserMenu from "./components/UserMenu";
import PremiumUserAvatar from '../../components/PremiumUserAvatar';
import PremiumAnalyticsWidget from '../../components/PremiumAnalyticsWidget';
import DashboardTabs from "./components/DashboardTabs";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  console.log("[Dashboard] getServerSession session:", session);
  if (!session) redirect("/api/auth/signin");

  const user = session.user;

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-8">
      <header className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <PremiumUserAvatar src={user?.image ?? undefined} name={user?.name ?? 'User'} online={true} />
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user?.name || "User"}</h1>
            <p className="text-gray-600 text-sm">{user?.email}</p>
          </div>
        </div>
        <UserMenu user={user ?? {}} />
      </header>
      <DashboardTabs user={user ?? {}} />
    </main>
  );
} 