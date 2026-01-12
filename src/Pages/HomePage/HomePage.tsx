import PageSEO from "../../components/seo/PageSEO";
import LogoHero from "../../components/Sections/LogoHero";
import AboutSection from "../../components/Sections/About";
import PortfolioSection from "../../components/Sections/PortfolioSection";
import ProcessSectionA from "../../components/Sections/ProcessSection";
import PackagesSection from "../../components/Sections/PackagesSection";
import AskClientsSection from "../../components/Sections/AskClientsSection";

const HomePage = () => {
    return (
        <>
            <PageSEO path="/" />
            <h1 className="sr-only">Y.M.A – אתרים מותאמים אישית בקוד מלא</h1>

            <div aria-hidden className="h-10 md:h-14" />

            <main className="px-5 mx-auto text-center max-w-7xl sm:px-6">
                <LogoHero />

                <div className="mt-10 md:mt-14 flex flex-col gap-[4rem] md:gap-[5.5rem]">
                    <AboutSection id="about" className="w-full" />
                    <PortfolioSection id="portfolio" />
                    <ProcessSectionA id="process" />
                    <PackagesSection id="packages" />
                    <AskClientsSection id="ask-clients" />
                </div>

                <div aria-hidden className="h-20 md:h-28" />
            </main>
        </>
    );
};

export default HomePage;
