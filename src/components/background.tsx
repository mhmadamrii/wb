export default function Background() {
  return (
    <div className="absolute z-0 h-screen">
      <div className="absolute bottom-0 left-0 z-0 h-full w-1/2 bg-background_left bg-no-repeat"></div>
      <div className="absolute bottom-0 right-0 z-0 h-full w-1/2 rotate-180 bg-background_left bg-no-repeat"></div>
    </div>
  );
}
