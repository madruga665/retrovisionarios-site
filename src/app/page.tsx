import { LinkButton } from '@/components/link-button/link-button';
import { ProfileImage } from '@/components/profile-image/profile-image';
import { socialContent } from '@/social-content';

export default async function Home() {
  return (
    <main className="px-2 sm:px-10">
      <div className="w-full gap-8 p-4 mt-10 flex flex-col items-center justify-center">
        <ProfileImage />
        <div className="flex flex-col justify-start items-center">
          <h1 className="text-3xl font-bold">Retrôvisionários</h1>
          <p>Banda Autoral</p>
          <p>Guarujá - SP</p>
        </div>
      </div>

      <div className="w-full py-8 flex flex-col items-center justify-center gap-8">
        {socialContent.map(({ url, icon, label }) => {
          return <LinkButton key={label} url={url} icon={icon} label={label} />;
        })}
      </div>
    </main>
  );
}
