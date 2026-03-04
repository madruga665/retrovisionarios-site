export function ProfileImage() {
  return (
    <div className="px-6 md:px-20 py-8 max-w-7xl mx-auto">
      <div className="relative group overflow-hidden rounded-2xl shadow-2xl border-4 border-white">
        <div
          data-testid="profile-image"
          className="w-full aspect-[21/9] bg-center bg-no-repeat bg-cover flex flex-col justify-end transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: "url('/images/profile-image.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-vintage-teal/80 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
          <span className="text-primary hidden md:block font-bold tracking-[0.3em] uppercase text-xs mb-2">
            Live from the past
          </span>
          <h1 className="text-white hidden md:block text-4xl md:text-6xl font-black uppercase leading-tight max-w-2xl">
            Som Vintage Moderno
          </h1>
        </div>
      </div>
      <h1 className="text-vintage-teal mt-6 text-4xl md:hidden md:text-6xl font-black uppercase leading-tight max-w-2xl">
        Som Vintage Moderno
      </h1>
    </div>
  );
}
