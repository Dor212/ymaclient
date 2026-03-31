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
const SCROLL_MAX_ATTEMPTS = 20;
const SCROLL_TOP_OFFSET = 110;

const HomePage = () => {
    const location = useLocation();

    useEffect(() => {
        let id = "";

        try {
            id = sessionStorage.getItem(SCROLL_TARGET_STORAGE_KEY)?.trim() ?? "";
        } catch {
            id = "";
        }

        if (!id) {
            id = location.hash.replace("#", "").trim();
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

        const scrollToElement = (element: HTMLElement) => {
            const top =
                window.scrollY + element.getBoundingClientRect().top - SCROLL_TOP_OFFSET;

            window.scrollTo({
                top: Math.max(top, 0),
                behavior: "smooth",
            });
        };

        const isTargetReady = (element: HTMLElement) => {
            if (id !== "portfolio") return true;
            return element.dataset.ready === "true";
        };

        const tryScrollToTarget = () => {
            const element = document.getElementById(id) as HTMLElement | null;

            if (element && isTargetReady(element)) {
                scrollToElement(element);
                clearStoredTarget();
                return;
            }

            attempts += 1;
            if (attempts >= SCROLL_MAX_ATTEMPTS) return;

            timeoutId = window.setTimeout(
                tryScrollToTarget,
                SCROLL_RETRY_INTERVAL_MS
            );
        };

        const onPortfolioReady = () => {
            if (id !== "portfolio") return;

            const element = document.getElementById("portfolio") as HTMLElement | null;
            if (!element) return;

            scrollToElement(element);
            clearStoredTarget();
        };

        window.addEventListener("yma:portfolio-ready", onPortfolioReady);

        timeoutId = window.setTimeout(tryScrollToTarget, 100);

        return () => {
            if (timeoutId) window.clearTimeout(timeoutId);
            window.removeEventListener("yma:portfolio-ready", onPortfolioReady);
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