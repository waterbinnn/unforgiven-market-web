import axios from "axios";
import Head from "./head";
import "../styles/globals.scss";
import { GNBLayout } from "@/components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <html>
      <Head />
      <body>
        <GNBLayout>{children}</GNBLayout>
      </body>
    </html>
  );
}
