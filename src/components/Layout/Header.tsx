import React, { useState } from "react";

const Header = () => {
    const [open, setOpen] = useState(false);

    const links = [
        { href: "#about", label: "על Y.M.A" },
        { href: "#portfolio", label: "אתרים שבנינו" },
        { href: "#process", label: "איך זה עובד" },
        { href: "#packages", label: "חבילות" },
        { href: "#ask-clients", label: "לקוחות מדברים" },
    ];

    return (
        <header className="fixed inset-x-0 top-0 z-50 text-white">
            <div className="h-16 md:h-20 w-full bg-transparent backdrop-blur-[2px]">
                <div className="px-5 mx-auto max-w-7xl sm:px-6">
                    <div className="grid items-center h-16 grid-cols-3 md:h-20">
                        <div className="flex justify-start order-1 md:hidden">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-1.5 mr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/60"
                                aria-label="פתח תפריט"
                                aria-expanded={open}
                                onClick={() => setOpen((v) => !v)}
                            >
                                {!open ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <div className="flex justify-center order-2 md:justify-start md:order-1">
                            <a
                                href="/"
                                className="inline-flex items-center"
                                aria-label="YMA Home"
                            >
                                <img
                                    src="/Logo.png"
                                    alt="YMA Logo"
                                    className="w-auto h-10 md:h-12"
                                />
                            </a>
                        </div>

                        <nav
                            className="items-center justify-center order-2 hidden md:flex"
                            aria-label="Primary"
                            dir="rtl"
                        >
                            <ul className="flex gap-10 text-[1rem] font-medium">
                                {links.map((l) => (
                                    <li key={l.href}>
                                        <a
                                            href={l.href}
                                            className="transition-opacity whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-[#3A86FF] via-[#4CC9F0] to-[#00C9A7] hover:opacity-80"
                                            style={{
                                                textShadow: "0 0 14px rgba(58,134,255,0.55)",
                                            }}
                                        >
                                            {l.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            <div
                className={[
                    "md:hidden fixed inset-x-0 top-16",
                    open
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none",
                    "transition-opacity duration-200",
                ].join(" ")}
            >
                <nav
                    className="mx-3 border shadow-lg rounded-2xl bg-black/70 backdrop-blur border-white/10"
                    aria-label="Mobile"
                    dir="rtl"
                >
                    <ul className="flex flex-col items-stretch py-2">
                        {links.map((l) => (
                            <li key={l.href}>
                                <a
                                    href={l.href}
                                    className="block px-4 py-3 text-base text-center transition-colors bg-clip-text text-transparent bg-gradient-to-r from-[#3A86FF] via-[#4CC9F0] to-[#00C9A7] hover:opacity-80"
                                    style={{
                                        textShadow: "0 0 14px rgba(58,134,255,0.55)",
                                    }}
                                    onClick={() => setOpen(false)}
                                >
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
