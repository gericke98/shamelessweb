import { HeaderComponent } from "@/components/header";
import { MobileHeader } from "@/components/mobileHeader";
import { getCollections } from "@/db/queries";

type Props = {
  children: React.ReactNode;
};

const MainLayout = async ({ children }: Props) => {
  const collections = await getCollections();
  return (
    <>
      <HeaderComponent collections={collections} />
      <MobileHeader />
      <main className="h-full w-full">
        <div className="mx-auto h-full mt-14">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
