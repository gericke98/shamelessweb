import { SideBar } from "@/components/dashboard/sidebar/sidebar";
import React from "react";
import Footer from "./footer/footer";
import { MobileSideBar } from "@/components/dashboard/sidebar/mobileSideBar";

type Props = {
  children: React.ReactNode;
};
const LayoutDashboard = ({ children }: Props) => {
  return (
    <>
      <div className="hidden bg-[var(--primary-dark-color)] lg:flex flex-row h-full w-full min-h-screen">
        <div className="basis-1/5 bg-[var(--primary-soft-color)] p-5 text-white">
          <SideBar />
        </div>
        <div className="basis-4/5 text-white p-5 h-full w-full ">
          {children}
          <Footer />
        </div>
      </div>
      <div className="lg:hidden bg-[var(--primary-dark-color)] flex flex-col h-full w-full min-h-screen">
        <div className="basis-4/5 text-white p-5 h-full w-full ">
          <MobileSideBar />
          {children}
        </div>
      </div>
    </>
  );
};

export default LayoutDashboard;
