import Image from 'next/image';
import Link from 'next/link';

type LinkButtonProps = {
  url: string;
  label: string;
  icon: string;
};

export function LinkButton({ url, label, icon }: LinkButtonProps) {
  return (
    <Link
      className="w-56 px-4 py-2 gap-4 font-bold border-2 flex items-center justify-center border-cyan-600 rounded-md"
      href={url}
      target="_blank"
    >
      <Image src={icon} width={40} height={40} alt={label} />
      {label}
    </Link>
  );
}
