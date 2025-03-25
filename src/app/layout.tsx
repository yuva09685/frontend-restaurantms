import { Providers } from "@/app/providers"; // ✅ Ensure Redux Provider is included

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>  {/* ✅ Wrap children with Redux provider */}
      </body>
    </html>
  );
}
