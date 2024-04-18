import NavBar from "@/components/dashboard/navbar/navbar";
import { SideBar } from "@/components/dashboard/sidebar/sidebar";
import React from "react";
import Footer from "./footer/footer";

type Props = {
  children: React.ReactNode;
};
const LayoutDashboard = ({ children }: Props) => {
  return (
    <div className="bg-[var(--primary-dark-color)] flex flex-row h-screen w-full">
      <div className="basis-1/5 bg-[var(--primary-soft-color)] p-5 text-white">
        <SideBar />
      </div>
      <div className="basis-4/5 text-white p-5 h-full w-full ">
        <NavBar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default LayoutDashboard;
