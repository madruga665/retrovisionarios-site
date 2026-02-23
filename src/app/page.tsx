import { FeatureInfo } from '@/components/feature-info/feature-info';
import { SocialNetworkCard } from '@/components/social-network-card/social-network-card';
import { ProfileImage } from '@/components/profile-image/profile-image';
import { socialContent } from '@/social-content';

export default async function Home() {
  return (
    <main className="px-2 sm:px-10">
      <ProfileImage />
      <div className="px-6 md:px-20 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socialContent.map(({ url, icon, label, description }) => {
            return (
              <SocialNetworkCard
                key={label}
                url={url}
                icon={icon}
                label={label}
                description={description}
              />
            );
          })}
        </div>
      </div>
      <FeatureInfo />
    </main>
  );
}
