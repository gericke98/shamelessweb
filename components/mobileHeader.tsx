import { MobileSideBar } from "./mobileSideBar";

export const MobileHeader = () => {
  return (
    <nav className="lg:hidden px-6 h-[60px] flex items-center justify-center bg-white border-b fixed top-0 w-full z-50">
      <MobileSideBar />
    </nav>
  );
};
