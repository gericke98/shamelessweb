export const Banner = ({ text }: { text: string }) => {
  const repeatCount = 5;
  const repeatedTexts = Array(repeatCount)
    .fill(null)
    .map((_, index) => (
      <p key={index} className="text-lg uppercase m-0 p-0 font-weight-500">
        {text}
      </p>
    ));

  return (
    <div className="flex overflow-hidden select-none p-0 m-0 h-[1.5vw]">
      <div className="flex-shrink-0 flex justify-around items-center min-w-full gap-4 animate-infinite-scroll bg-black text-white border-transparent">
        {repeatedTexts}
      </div>
      <div
        className="flex-shrink-0 flex justify-around items-center min-w-full gap-4 animate-infinite-scroll bg-black text-white border-transparent"
        aria-hidden="true"
      >
        {repeatedTexts}
      </div>
    </div>
  );
};

export default Banner;
