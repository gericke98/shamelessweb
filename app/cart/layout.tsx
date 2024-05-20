import { HeaderComponent } from "@/components/header";
import { MobileHeader } from "@/components/mobileHeader";

type Props = {
  children: React.ReactNode;
};

const CartLayout = ({ children }: Props) => {
  return (
    <>
      <HeaderComponent />
      <MobileHeader />
      <main>
        <div className="mx-auto h-full">{children}</div>
      </main>
    </>
  );
};

export default CartLayout;
