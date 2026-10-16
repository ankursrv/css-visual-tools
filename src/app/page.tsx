import type { Metadata } from 'next';
import Link from 'next/link';
import { APP_DESCRIPTION } from '@/constants';
import HeroBanner from '@/components/organisms/HeroBanner';
import ExploreSection from '@/components/organisms/ExploreSection';
import UpdatesBlogsSection from '@/components/organisms/UpdatesBlogsSection';
import OpenOnlineSection from '@/components/organisms/OpenOnlineSection';
import SocialMediaSection from '@/components/organisms/SocialMediaSection';
import CampaignVideos from '@/components/organisms/CampaignVideos';
import AboutUjjivanSection from '@/components/organisms/AboutUjjivanSection';
import FindBranchSection from '@/components/organisms/FindBranchSection';

export const metadata: Metadata = {
  title: 'Home',
  description: APP_DESCRIPTION,
};

/**
 * Home page — Server Component.
 * Displays a hero section introducing the banking platform.
 */
export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroBanner />
      <CampaignVideos />
      <AboutUjjivanSection />
      <ExploreSection />
      <OpenOnlineSection />
      <SocialMediaSection />
      <UpdatesBlogsSection />
      <FindBranchSection />
    </div>
  );
}
