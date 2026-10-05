import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "All Day Kitchen & Bar | Good Food. Good Drinks. All Day.",
  description:
    "A contemporary kitchen and bar in Thane, made for long lunches, evening conversations and nights worth remembering.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
