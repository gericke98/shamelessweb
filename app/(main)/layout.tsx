import Banner from "@/components/banner";
import { HeaderComponent } from "@/components/header";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <HeaderComponent />
      <Banner text="PENINSULAR FREE SHIPPING" />
      <main className="px-2">
        <div className="max-w-[1056px] mx-auto pt-6 h-full">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
