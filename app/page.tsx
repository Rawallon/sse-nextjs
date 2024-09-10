import NotificationComponent from "@/components/NotificationComponent";

export default function DashboardPage() {
  // Pegar ID usando Auth??
  const userId = "123";

  return (
    <div className="container mx-auto p-4">
      <NotificationComponent userId={userId} />
    </div>
  );
}
