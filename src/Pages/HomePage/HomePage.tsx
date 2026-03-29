import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageSEO from "../../components/seo/PageSEO";
import LogoHero from "../../components/Sections/LogoHero";
import AboutSection from "../../components/Sections/About";
import PortfolioSection from "../../components/Sections/PortfolioSection";
import ProcessSectionA from "../../components/Sections/ProcessSection";
import PackagesSection from "../../components/Sections/PackagesSection";
import AskClientsSection from "../../components/Sections/AskClientsSection";

const SCROLL_TARGET_STORAGE_KEY = "ymaScrollTarget";
const SCROLL_RETRY_INTERVAL_MS = 180;
const SCROLL_MAX_ATTEMPTS = 18;

const HomePage = () => {
    const location = useLocation();

    useEffect(() => {
        let id = location.hash.replace("#", "").trim();

        if (!id) {
            try {
                id = sessionStorage.getItem(SCROLL_TARGET_STORAGE_KEY)?.trim() ?? "";
            } catch {
                id = "";
            }
        }

        if (!id) return;

        let attempts = 0;
        let timeoutId: number | null = null;

        const clearStoredTarget = () => {
            try {
                sessionStorage.removeItem(SCROLL_TARGET_STORAGE_KEY);
            } catch {
                // ignore storage issues
            }
        };

        const tryScrollToTarget = () => {
            const element = document.getElementById(id);

            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
                clearStoredTarget();
                return;
            }

            attempts += 1;
            if (attempts >= SCROLL_MAX_ATTEMPTS) return;

            timeoutId = window.setTimeout(tryScrollToTarget, SCROLL_RETRY_INTERVAL_MS);
        };

        timeoutId = window.setTimeout(tryScrollToTarget, 80);

        return () => {
            if (timeoutId) window.clearTimeout(timeoutId);
        };
    }, [location.hash, location.pathname]);

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
                    <PackagesSection id="packages" />
                    <ProcessSectionA id="process" />
                    <AskClientsSection id="ask-clients" />
                </div>

                <div aria-hidden className="h-20 md:h-28" />
            </main>
        </>
    );
};

export default HomePage;
