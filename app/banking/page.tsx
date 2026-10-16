import type { Metadata } from 'next';
import { Header as BankingHeader } from '@/components/organisms/Header';
import { Footer as BankingFooter } from '@/components/organisms/Footer';
import HeroBanner from '@/components/organisms/HeroBanner';
import CampaignVideos from '@/components/organisms/CampaignVideos';
import AboutUjjivanSection from '@/components/organisms/AboutUjjivanSection';
import ExploreSection from '@/components/organisms/ExploreSection';
import OpenOnlineSection from '@/components/organisms/OpenOnlineSection';
import SocialMediaSection from '@/components/organisms/SocialMediaSection';
import UpdatesBlogsSection from '@/components/organisms/UpdatesBlogsSection';
import FindBranchSection from '@/components/organisms/FindBranchSection';
import { APP_DESCRIPTION } from '@/constants';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Banking UI - Ujjivan Small Finance Bank',
  description: APP_DESCRIPTION,
};

export default function BankingPage() {
  return (
    <div className="flex flex-col bg-white text-gray-900 w-full min-h-screen">
      {/* Top Breadcrumb Navigation Bar - Redirects to Home */}
      <div className="w-full bg-zinc-950 text-white border-b border-zinc-800/80 py-2.5 px-4 sm:px-6 lg:px-12 z-50">
        <div className="max-w-[1440px] w-full mx-auto flex items-center">
          <Breadcrumb />
        </div>
      </div>

      {/* Template's Own Dedicated Header */}
      <BankingHeader />

      {/* Main Banking Interactive Sections */}
      <div id="banking-main" className="flex-1 flex flex-col">
        <HeroBanner />
        <CampaignVideos />
        <AboutUjjivanSection />
        <ExploreSection />
        <OpenOnlineSection />
        <SocialMediaSection />
        <UpdatesBlogsSection />
        <FindBranchSection />
      </div>

      {/* Banking Footer */}
      <BankingFooter />
    </div>
  );
}
