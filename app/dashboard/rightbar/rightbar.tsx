import Image from "next/image";
import React from "react";
import { MdPlayCircleFilled } from "react-icons/md";

export default function RightBar() {
  return (
    <div className="fixed">
      <div className="relative bg-[var(--primary-soft-color)] py-5 rounded-md mb-5">
        <div className="absolute bottom-0 right-0 w-2/4 h-2/4 ">
          <Image
            src="/"
            alt="Astronaut"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="flex flex-col gap-6 p-4">
          <span className="font-bold ">Available Now</span>
          <h3 className="font-regular text-lg">
            How to use the new version of the admin dashboard
          </h3>
          <span className="text-xs">Takes 4 minutes to learn</span>
          <p className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
            architecto, atque sit eius sint autem consectetur recusandae nam
            aspernatur, reprehenderit dolorem aperiam optio sapiente tenetur
            fugit? Quibusdam sequi libero voluptate.
          </p>
          <button className="p-2 flex items-center gap-2 text-white border-none rounded-sm cursor-pointer bg-[#5d57c9]">
            <MdPlayCircleFilled />
            Watch
          </button>
        </div>
      </div>
      <div className="relative bg-[var(--primary-soft-color)] py-5 rounded-md mb-5">
        <div className="absolute bottom-0 right-0 w-2/4 h-2/4 ">
          <Image
            src="/"
            alt="Astronaut"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="flex flex-col gap-6 p-4">
          <span className="font-bold ">Available Now</span>
          <h3 className="font-regular text-lg">
            How to use the new version of the admin dashboard
          </h3>
          <span className="text-xs">Takes 4 minutes to learn</span>
          <p className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
            architecto, atque sit eius sint autem consectetur recusandae nam
            aspernatur, reprehenderit dolorem aperiam optio sapiente tenetur
            fugit? Quibusdam sequi libero voluptate.
          </p>
          <button className="p-2 flex items-center gap-2 text-white border-none rounded-sm cursor-pointer bg-[#5d57c9]">
            <MdPlayCircleFilled />
            Watch
          </button>
        </div>
      </div>
    </div>
  );
}
