import "./globals.css";

export const metadata = {
  title: "Edge Solvinter",
  description: "Lokala noder för svalka, data, laddning och stillhet.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
