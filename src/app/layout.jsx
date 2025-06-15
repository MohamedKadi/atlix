import globals from './globals.css';
import ClientLayout from './ClientLayout';
export const metadata = {
  title: 'atlix',
  description: 'WebSite atlix by Abderhmane & his team',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
