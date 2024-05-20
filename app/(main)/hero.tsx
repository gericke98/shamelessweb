import Banner from "@/components/banner";
import Image from "next/image";

export const Hero = () => {
  return (
    <div className="w-full h-full">
      <Banner text="PENINSULAR FREE SHIPPING" variant="dark" repeat={5} />
      <div className="h-screen w-full relative flex justify-center items-center">
        <Image
          src="/heropc.jpg"
          alt="Hero"
          fill
          className="object-cover"
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
