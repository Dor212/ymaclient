import React from "react";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";

const SocialFloatingBar = () => {
    const whatsappUrl = "https://wa.me/9742306608";
    const instagramUrl = "https://www.instagram.com/ymawebsites1/";
    const facebookUrl = "https://www.facebook.com/profile.php?id=61578574384114&locale=he_IL";

    return (
        <div className="fixed z-40 flex flex-col gap-3 left-3 md:left-6 top-24 md:top-24">
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Whatsapp"
                className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-[#3A86FF] bg-black/70 flex items-center justify-center shadow-[0_0_16px_rgba(58,134,255,0.55)] hover:shadow-[0_0_24px_rgba(76,201,240,0.9)] hover:border-[#4CC9F0] transition-all"
            >
                <FaWhatsapp className="text-[1.3rem] text-[#25D366]" />
            </a>
            <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-[#3A86FF] bg-black/70 flex items-center justify-center shadow-[0_0_16px_rgba(58,134,255,0.55)] hover:shadow-[0_0_24px_rgba(76,201,240,0.9)] hover:border-[#4CC9F0] transition-all"
            >
                <FaInstagram className="text-[1.3rem] text-[#FF2E7E]" />
            </a>
            <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-[#3A86FF] bg-black/70 flex items-center justify-center shadow-[0_0_16px_rgba(58,134,255,0.55)] hover:shadow-[0_0_24px_rgba(76,201,240,0.9)] hover:border-[#4CC9F0] transition-all"
            >
                <FaFacebookF className="text-[1.2rem] text-[#4CC9F0]" />
            </a>
        </div>
    );
};

export default SocialFloatingBar;
