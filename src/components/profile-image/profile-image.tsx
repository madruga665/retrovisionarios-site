import Image from 'next/image';

export function ProfileImage() {
  return (
    <div
      data-testid="profile-image"
      className="flex border-4 border-cyan-600 rounded-[50%] w-52 h-52 overflow-hidden relative"
    >
      <Image
        src="/images/profile-image.jpg"
        alt="Foto da banda Retrôvisionários"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
