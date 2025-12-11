const Footer = () => {
    return (
        <footer className="bg-transparent backdrop-blur-[2px] text-white py-6 mt-10 text-center border border-[#3A86FF]/40 rounded-2xl">
            <div className="px-3 mx-auto max-w-7xl sm:px-4">
                <p className="mb-2 text-sm">
                    © {new Date().getFullYear()} YMA – אתרים מותאמים אישית. כל הזכויות שמורות.
                </p>
                <a href="/legal" className="text-sm transition hover:opacity-80">
                    הצהרת נגישות · פרטיות · תנאי שימוש · קוקיז
                </a>
            </div>
        </footer>
    );
};

export default Footer;