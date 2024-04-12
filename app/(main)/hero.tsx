import Banner from "@/components/banner";
import Image from "next/image";

export const Hero = () => {
  return (
    <div className="w-full h-full">
      <Banner text="PENINSULAR FREE SHIPPING" variant="dark" />
      <div className="h-screen w-full relative">
        <Image
          src="/heropc.jpg"
          alt="Hero"
          fill
          style={{ objectFit: "cover", objectPosition: "10% 12%" }}
          quality={100}
        />
      </div>
      <Banner text="LIVE WITHOUT SHAME WEAR WITHOUT FEAR" variant="white" />
    </div>
  );
};
