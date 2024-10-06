import { LinkButton } from '@/components/link-button/linkButton';
import { ProfileImage } from '@/components/profile-image/profileImage';

export default function Home() {
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
        <LinkButton
          url="https://www.youtube.com/@Retrovisionarios1986"
          icon="/images/icons/youtube.svg"
          label="YouTube"
        />
        <LinkButton
          url="https://www.instagram.com/retrovisionarios1986"
          icon="/images/icons/instagram.svg"
          label="Instagram"
        />
        <LinkButton
          url="https://www.facebook.com/profile.php?id=61558180019563"
          icon="/images/icons/facebook.svg"
          label="Facebook"
        />
      </div>
    </main>
  );
}
