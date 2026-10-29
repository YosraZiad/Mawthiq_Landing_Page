import React from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { VisionSection } from './components/sections/VisionSection';
import { OpportunitySection } from './components/sections/OpportunitySection';
import { ValuesSection } from './components/sections/ValuesSection';
import { PartnerProfileSection } from './components/sections/PartnerProfileSection';
import { ExpectationsSection } from './components/sections/ExpectationsSection';
import { SelfAssessmentSection } from './components/sections/SelfAssessmentSection';
import { JoiningProcessSection } from './components/sections/JoiningProcessSection';
import { FAQSection } from './components/sections/FAQSection';
import { ApplicationSection } from './components/sections/ApplicationSection';
import { ReviewerAdminDrawer } from './components/ui/ReviewerAdminDrawer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-mawthiq-500/30 selection:text-white" dir="rtl" lang="ar">
      {/* Section 1: Header */}
      <Header />

      <main className="flex-1">
        {/* Section 2: Hero */}
        <HeroSection />

        {/* Section 3: What Are We Building? */}
        <VisionSection />

        {/* Section 4: More Than a Traditional Team */}
        <OpportunitySection />

        {/* Section 5: How We Work */}
        <ValuesSection />

        {/* Section 6: The Right Partner */}
        <PartnerProfileSection />

        {/* Section 7: Mutual Expectations */}
        <ExpectationsSection />

        {/* Section 8: Self-Assessment */}
        <SelfAssessmentSection />

        {/* Section 9: Joining Process */}
        <JoiningProcessSection />

        {/* Section 10: Frequently Asked Questions */}
        <FAQSection />

        {/* Section 11: Final CTA & Application Form */}
        <ApplicationSection />
      </main>

      {/* Section 12: Footer */}
      <Footer />

      {/* Development & Reviewer Demo Inspection Drawer */}
      <ReviewerAdminDrawer />
    </div>
  );
};

export default App;
