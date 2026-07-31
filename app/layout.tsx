import './globals.css';

export const metadata = {
  title: 'Flux Test App',
  description: 'Testing Flux image updates',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
