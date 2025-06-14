import Header from "@/components/shared/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white">
      <div className="min-h-screen">
        <Header />
        {children}
      </div>
    </div>
  );
}
