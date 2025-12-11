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
            <main id="main">
                <h1 className="sr-only">Y.M.A – אתרים מותאמים אישית בקוד מלא</h1>

                <div
                    className="w-full min-h-screen bg-fixed bg-center bg-no-repeat bg-cover"
                    style={{ backgroundImage: "url('/background4.png')" }}
                >
                    <div aria-hidden className="h-24 md:h-28" />

                    <div className="px-5 mx-auto text-center max-w-7xl sm:px-6">
                        <section className="grid place-items-center">
                            <LogoHero />
                        </section>

                        <div className="mt-20 md:mt-28 flex flex-col gap-[8rem] md:gap-[11rem]">
                            <AboutSection id="about" className="w-full" />
                            <PortfolioSection id="portfolio" />
                            <ProcessSectionA id="process"/>
                            <PackagesSection id="packages" />
                            <AskClientsSection id="ask-clients" />
                        </div>
                    </div>

                    <div aria-hidden className="pb-28" />
                </div>
            </main>
        </>
    );
};

export default HomePage;
