export const Disconnect = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full items-center justify-center bg-[rgba(0,0,0,0.6)] z-50 flex flex-col gap-2">
      <p className="text-center uppercase text-3xl font-inter font-bold text-red-500">
        Disconnected
      </p>

      <p className="text-xl">please wait...</p>
    </div>
  );
};
