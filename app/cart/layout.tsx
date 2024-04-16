import { HeaderComponent } from "@/components/header";

type Props = {
  children: React.ReactNode;
};

const CartLayout = ({ children }: Props) => {
  return (
    <>
      <HeaderComponent />
      <main>
        <div className=" mx-auto h-full">{children}</div>
      </main>
    </>
  );
};

export default CartLayout;
