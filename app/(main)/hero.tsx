import Banner from "@/components/banner";
import Image from "next/image";

export const Hero = () => {
  return (
    <div className="w-full h-full">
      <Banner text="PENINSULAR FREE SHIPPING" variant="dark" repeat={5} />
      <div className="h-screen w-full relative">
        <Image
          src="/heropc.jpg"
          alt="Hero"
          fill
          style={{ objectFit: "cover", objectPosition: "15% 12%" }}
          priority
        />
      </div>
      <Banner
        text="LIVE WITHOUT SHAME WEAR WITHOUT FEAR"
        variant="white"
        repeat={4}
      />
    </div>
  );
};
