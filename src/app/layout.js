import "./globals.css";

export const metadata = {
  title: "Solvinter Edge Atlas",
  description: "Accra Node 0.1 som ekonomisk startpunkt för Solvinter Edge.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
