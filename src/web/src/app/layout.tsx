import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import KennectAppBar from "@/common/components/appbar.component";
import { Box } from "@mui/material";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "post&konnect",
  description: "post and konnect",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <KennectAppBar />
        <Box>{children}</Box>
      </body>
    </html>
  );
}
