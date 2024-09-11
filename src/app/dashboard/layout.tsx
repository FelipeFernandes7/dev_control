import { ReactNode } from "react";
import { HeaderDashboard } from "./components/header";

export default function LayoutDashboard({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <HeaderDashboard />
      {children}
    </>
  );
}
