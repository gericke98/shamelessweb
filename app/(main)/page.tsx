import { Hero } from "./hero";
import { CategoryList } from "./categoryList";

export default function Home() {
  return (
    <main className="flex flex-col justify-between w-[100%]">
      <Hero />
      <CategoryList />
    </main>
  );
}
