import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SettingsProvider } from "@/contexts/SettingsContext";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SettingsProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </SettingsProvider>
  );
}
