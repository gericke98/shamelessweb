import { MobileSideBar } from "./mobileSideBar";

export const MobileHeader = () => {
  return (
    <nav className="lg:hidden px-6 h-[60px] flex items-center justify-center bg-white fixed top-0 w-full z-50 border-b-2">
      <MobileSideBar />
    </nav>
  );
};
