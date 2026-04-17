import React from 'react';

const NAV_LINKS = {
    Platform: ['Home', 'Shop', 'PC Builder', 'Sell', 'Contact'],
    Support: ['Help Center', 'Warranty Policy', 'Return Policy', 'Privacy Policy', 'Terms & Conditions'],
    Company: ['About Anam Tech', 'Careers', 'Press Kit', 'Blog', 'Sitemap'],
};

const ArrowIcon = () => (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <path d="M2 10L10 2M10 2H4M10 2v6" stroke="#555" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
);

const Footer = () => {
    return (
        <footer className="bg-[#080808] w-full">

            {/* ── Top bar ── */}
            <div className="max-w-[1200px] mx-auto px-10 py-[3.5rem] flex items-center justify-between border-b border-[#161616]">

                {/* Brand */}
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-white rounded-[8px] flex items-center justify-center flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="2" y="2" width="5" height="5" rx="1" fill="#080808"/>
                            <rect x="9" y="2" width="5" height="5" rx="1" fill="#080808"/>
                            <rect x="2" y="9" width="5" height="5" rx="1" fill="#080808"/>
                            <rect x="9" y="9" width="5" height="5" rx="1" fill="#080808" opacity="0.25"/>
                        </svg>
                    </div>
                    <span className="text-[16px] font-semibold text-white tracking-tight">
                        Explore <span className="text-[#4f8ef7]">Techify</span>
                    </span>
                </div>

                <span className="text-[12px] text-[#333] tracking-[0.04em]">
                    Bangladesh's smartest PC platform
                </span>

                <button className="inline-flex items-center gap-1.5 bg-white text-[#080808] text-[13px] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#e5e5e5] active:scale-[0.97] transition-all">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2v12M2 8h12" stroke="#080808" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                    Become a vendor
                </button>
            </div>

            {/* ── Main grid ── */}
            <div className="max-w-[1200px] mx-auto px-10 py-12 grid grid-cols-[1.8fr_1fr_1fr_1fr] gap-10 border-b border-[#161616]">

                {/* Brand column */}
                <div>
                    {/* Live badge */}
                    <div className="inline-flex items-center gap-1.5 bg-[#111] border border-[#1e1e1e] rounded-md px-2.5 py-1.5 mb-5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-[11px] text-[#3a3a3a] tracking-[0.04em]">Live & operational</span>
                    </div>

                    <p className="text-[13px] text-[#444] leading-[1.8] max-w-[220px]">
                        Build your perfect PC with confidence. Smart compatibility checks, best vendor pricing, and a fully transparent buying experience — from spec to doorstep.
                    </p>

                    {/* Stats */}
                    {/* <div className="flex gap-8 mt-8">
                        {[
                            { num: '2,400+', lbl: 'Products listed' },
                            { num: '180+',   lbl: 'Verified vendors' },
                            { num: '99%',    lbl: 'Compat. accuracy' },
                        ].map(({ num, lbl }) => (
                            <div key={lbl}>
                                <div className="text-[20px] font-semibold text-white leading-none">{num}</div>
                                <div className="text-[11px] text-[#3a3a3a] mt-1 tracking-[0.03em]">{lbl}</div>
                            </div>
                        ))}
                    </div> */}
                </div>

                {/* Nav columns */}
                {Object.entries(NAV_LINKS).map(([heading, links]) => (
                    <div key={heading}>
                        <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#333] mb-5">
                            {heading}
                        </p>
                        <ul className="flex flex-col gap-[11px]">
                            {links.map(link => (
                                <li key={link}>
                                    <a href="#"
                                        className="group text-[13.5px] text-[#4a4a4a] hover:text-white transition-colors flex items-center gap-1.5">
                                        {link}
                                        <ArrowIcon />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* ── Bottom bar ── */}
            <div className="max-w-[1200px] mx-auto px-10 py-7 flex items-center justify-between gap-4">

                <p className="text-[12px] text-[#2e2e2e]">
                    © {new Date().getFullYear()} Anam Tech Ltd. All rights reserved.
                </p>

                <div className="flex items-center gap-6">
                    {['Privacy', 'Terms', 'Cookies', 'Sitemap'].map(link => (
                        <a key={link} href="#"
                            className="text-[12px] text-[#2e2e2e] hover:text-[#666] transition-colors">
                            {link}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-1.5">
                    {[
                        { label: 'Facebook', icon: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="#444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/> },
                        { label: 'YouTube',  icon: <><rect x="2" y="6" width="20" height="13" rx="3" stroke="#444" strokeWidth="1.6"/><path d="M10 9.5l5 2.5-5 2.5V9.5z" fill="#444"/></> },
                        { label: 'LinkedIn', icon: <><rect x="2" y="2" width="20" height="20" rx="4" stroke="#444" strokeWidth="1.6"/><path d="M7 10v7M7 7v.01M12 10v7M12 13a3 3 0 016 0v4" stroke="#444" strokeWidth="1.6" strokeLinecap="round"/></> },
                        { label: 'X',        icon: <path d="M4 4l16 16M4 20L20 4" stroke="#444" strokeWidth="1.6" strokeLinecap="round"/> },
                    ].map(({ label, icon }) => (
                        <a key={label} href="#" title={label}
                            className="w-8 h-8 flex items-center justify-center rounded-[7px] border border-[#1a1a1a] hover:border-[#2e2e2e] hover:bg-[#141414] transition-all">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">{icon}</svg>
                        </a>
                    ))}
                </div>
            </div>

        </footer>
    );
};

export default Footer;