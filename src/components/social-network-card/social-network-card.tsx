import Image from 'next/image';
import Link from 'next/link';

type SocialNetworkCardProps = {
  url: string;
  label: string;
  icon: string;
  description: string;
};

export function SocialNetworkCard({
  url,
  label,
  icon,
  description,
}: SocialNetworkCardProps) {
  return (
    <Link
      className="group relative flex flex-col items-center gap-6 bg-white p-8 rounded-xl border-2 border-slate-100 hover:border-primary/50 transition-all hover:-translate-y-1 shadow-sm hover:shadow-xl"
      href={url}
      target="_blank"
    >
      <div className="rounded-full bg-slate-50 p-6 group-hover:bg-primary/10 transition-colors">
        <span className="material-symbols-outlined text-4xl text-slate-700 group-hover:text-primary">
          <Image src={icon} width={40} height={40} alt={label} />
        </span>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-bold text-vintage-teal">{label}</h3>
        <p className="text-slate-500 text-sm mt-1">{description}</p>
      </div>
    </Link>
  );
}
