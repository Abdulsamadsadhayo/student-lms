import "./globals.css";

export const metadata = {
  title: "Student LMS Admin",
  description: "Student Management Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}