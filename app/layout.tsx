import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Sharing Vision",
  description: "sharing vision test oleh dwi adi bangkit",
  author: "Dwi Adi Bangkit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-base-100 w-full flex flex-col min-h-screen">
        <main className="w-10/12  bg-base mx-auto min-h-screen">
          <h2 className="text-xl font-extralight mt-10 mb-4 text-right">
            Sharing Vision Test
          </h2>
          <Navbar />

          {children}
        </main>
      </body>
    </html>
  );
}
