import React, { useState, useEffect, useRef } from 'react';
import './EventsCSS.css'

// Css for bg in EventsCSS.css
export default function Events() {
  return (
    <div className="black-star-bg text-white font-sans antialiased">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <HeroSection />
        <Timeline />
      </main>
    </div>
  );
}


// Hero Section Component
// The main introductory section with a headline and call-to-action.
// UPDATED: Added revealing text animations on load.
const HeroSection = () => {
    // State to trigger the animation
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Set animate to true after a short delay to trigger the animation
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="text-center w-full md:w-4/5 flex items-center flex-col justify-center mx-auto pt-20 pb-10">
            <h1 className={`text-3xl sm:text-5xl lg:text-6xl text-center font-extrabold text-white leading-tight transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                We host robust <span className="text-yellow-400">events</span> that help leverage the web3 infrastructure.
            </h1>
            <p className={`mt-6 max-w-2xl mx-auto text-lg text-gray-300 transition-all duration-700 delay-200 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                WE STRIVE TO CREATE A COMMUNITY OF STUDENTS PASSIONATE ABOUT BLOCKCHAIN AND WEB3 TECHNOLOGY
            </p>
            <div className={`mt-10 transition-all duration-700 delay-400 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <a href="/collaborate" className="inline-block bg-yellow-500 text-gray-900 font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:bg-yellow-400 transform hover:-translate-y-1 transition-all duration-300">
                    🤝 Collaborate with us
                </a>
            </div>
        </div>
    );
};


// Custom hook to detect if an element is on screen
// This is used to trigger animations as the user scrolls.
const useOnScreen = (options) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return [ref, isVisible];
};


// Timeline Item Component
// Represents a single event card in the timeline.
// UPDATED: Animations are more pronounced and directions are corrected.
const TimelineItem = ({ event, index }) => {
    // An item is on the right side if its index is odd.
    const isRight = index % 2 !== 0;
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

    const cardComponent = (
        <a href={event.link} target="_blank" rel="noopener noreferrer" className="group">
             <div className="flex items-start space-x-4">
                  {/* Image on the left */}
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/300x300/1F2937/9CA3AF?text=Image'; }}
                  />
                  {/* Text content on the right */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-yellow-400">{event.title}</h3>
                    {event.subtitle && <p className="text-xs sm:text-sm text-gray-400 mt-1 font-semibold">{event.subtitle}</p>}
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed mt-2">{event.description}</p>
                  </div>
             </div>
        </a>
    );

    return (
        <div ref={ref} className="mb-12 mx-auto md:w-[80%]">
            {/* --- Desktop Layout (visible on lg screens and up) --- */}
            {/* On desktop, odd items are on the right, even on the left */}
            <div className={`hidden lg:flex justify-between items-center w-full ${isRight ? 'flex-row-reverse' : ''}`}>
                {/* The Card */}
                <div className={`w-5/12 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isRight ? 'translate-x-20' : '-translate-x-20'}`}`}>
                    <div className="p-4 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 hover:border-yellow-500">
                        {cardComponent}
                    </div>
                </div>
                {/* The Center Dot */}
                <div className="relative w-2/12 flex justify-center">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full shadow-lg z-10"></div>
                </div>
                {/* The Date */}
                <div className={`w-5/12 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isRight ? '-translate-x-20' : 'translate-x-20'}`}`}>
                    <p className={`font-bold text-lg ${isRight ? 'text-right' : 'text-left'}`}>{event.date}</p>
                </div>
            </div>

            {/* --- Mobile Layout (hidden on lg screens and up) --- */}
            <div className="lg:hidden flex">
                <div className="flex flex-col items-center mr-4">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full shadow-lg z-10 flex-shrink-0"></div>
                    <div className="w-1 mt-2 flex-grow bg-gray-600"></div>
                </div>
                {/* UPDATED: Increased slide distance for a more noticeable effect from the left */}
                <div className={`w-full transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                    <p className="font-bold text-lg mb-2 text-yellow-400">{event.date}</p>
                    <div className="p-4 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 hover:border-yellow-500">
                        {cardComponent}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Timeline Component
// This component lays out the timeline events using the JSON data.
const Timeline = () => {
    const events = [
      {
        "date": "25th SEP 2025",
        "title": "MEXC Foundation X Build3DAO - Intro Day",
        "link": "https://www.instagram.com/p/DQR4ZBiEiZT",
        "imageUrl": "https://res.cloudinary.com/duplabys5/image/upload/v1762857476/mexc_clprub.jpg",
        "subtitle": "Building the Future Together - A Web3 Collaboration",
        "description": "AssetMerkle hosted an immersive introduction day with MEXC Foundation and Build3DAO at IGDTUW, bringing together industry leaders and students to explore blockchain innovation, Web3 technologies, and building decentralized ecosystems."
      },
      {
        "date": "26th JUNE 2025",
        "title": "Chainlink Virtual Workshop",
        "link": "https://www.instagram.com/p/DQR3kQJkjCA/",
        "imageUrl": "https://res.cloudinary.com/duplabys5/image/upload/v1762857467/assetmerkle_X_ChainLink_iwxxya.png",
        "subtitle": "Mastering Decentralized Oracles & Smart Contracts",
        "description": "AssetMerkle organized an engaging virtual workshop on Chainlink's decentralized oracle network, featuring hands-on demonstrations on connecting real-world data to smart contracts and building hybrid blockchain applications."
      },
      {
        "date": "25th MAY 2025",
        "title": "KRNL Decoded Delhi Meetup",
        "link": "https://www.instagram.com/p/DQR2KGBkmFW/",
        "imageUrl": "https://res.cloudinary.com/duplabys5/image/upload/v1762857469/krnl_a8wyr8.jpg",
        "subtitle": "Exploring Kernel Network & Web3 Infrastructure",
        "description": "AssetMerkle brought together Delhi's Web3 community for the KRNL Decoded Meetup at IGDTUW, featuring expert speakers, interactive sessions on Kernel Network's infrastructure, and networking with passionate blockchain builders."
      },
      {
        "date": "4-6 APRIL 2025",
        "title": "AM Hacks",
        "link": "https://www.instagram.com/p/DHp9mHdtYz7/",
        "imageUrl": "https://res.cloudinary.com/dalgvlhes/image/upload/v1754845980/Screenshot_2025-08-10_224238_vfubi8.png",
        "subtitle": "AM Hacks 2025 – The Ultimate Web3 Hackathon",
        "description": "AM Hacks 2025 at IGDTUW brought together innovators and problem-solvers for a high-energy hackathon, with hands-on coding, expert mentoring, intense challenges, and networking over ideas, snacks, and swag"
      },
      {
        "date": "12 FEBRUARY 2025",
        "title": "The Algorand Meetup",
        "link": "https://www.instagram.com/p/DFsyeoxyLfp/",
        "imageUrl": "https://res.cloudinary.com/dalgvlhes/image/upload/v1742829285/Screenshot_2025-03-24_204331_nmf72w.png",
        "subtitle": "AlgoBharat Hack Series 2025 – Delhi Meetup!",
        "description": "The AlgoBharat Hack Series 2025 seminar at IGDTUW on February 12th introduced Web3 builders to Algorand’s tech, with expert Q&As, a challenge breakdown, and networking over snacks & swag."
      },
      {
        "date": "17 JANUARY 2025",
        "title": "She On Chain Bootcamp",
        "link": "https://www.instagram.com/p/DE71b3hyqkI//",
        "imageUrl": "https://res.cloudinary.com/dalgvlhes/image/upload/v1742918061/Screenshot_2025-03-25_212330_meoj6t.png",
        "subtitle": "ASSETMERKLE X RISEIN",
        "description": "AssetMerkle X RiseIn successfully hosted the She On Chain Bootcamp, equipping participants with hands-on experience in blockchain, dApps, and Web3 concepts while unlocking exclusive perks and building apps from scratch."
      },
      {
        "date": "9 NOVEMBER 2024",
        "title": "The Web3 Week",
        "link": "https://www.instagram.com/p/DE71b3hyqkI//",
        "imageUrl": "https://res.cloudinary.com/dalgvlhes/image/upload/v1742918572/Screenshot_2025-03-25_213237_wtmyee.png",
        "subtitle": "CAREERS IN WEB3",
        "description": "The Week of Web3 wrapped up successfully, equipping college beginners with blockchain, smart contracts, and dApps knowledge while making Web3 exciting and accessible."
      },
      {
        "date": "13 SEPTEMBER 2024",
        "title": "The Graph Workshop",
        "link": "https://www.instagram.com/p/C_fIOVIsNpc/",
        "imageUrl": "https://res.cloudinary.com/dlx9sj1pl/image/upload/v1730999849/Screenshot_2024-11-07_224113_emm0uy.png",
        "subtitle": "A BEGINNER-FRIENDLY INTRODUCTION",
        "description": "A beginner-friendly introduction to Web3 and The Graph. Dived into blockchain basics, learnt about subgraphs, and enjoyed exclusive swags, a GRT airdrop, and networking opportunities."
      },
      {
        "date": "18 FEBRUARY 2024",
        "title": "Fleek Deploy: Delhi",
        "link": "https://www.instagram.com/p/C2yxgUDS8_t/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        "imageUrl": "https://res.cloudinary.com/dlx9sj1pl/image/upload/v1712693959/Screenshot_2024-04-10_014915_nepofq.png",
        "subtitle": "A GUIDE FOR MONETIZING APPS",
        "description": "Explored the seamless integration of cutting-edge technologies, with captivating presentations and insightful discussions, we uncovered the transformative power of decentralized hosting and management for websites and web applications."
      },
      {
        "date": "5-12 FEBRUARY 2024",
        "title": "Starknet X Assetmerkle",
        "link": "https://www.instagram.com/p/C3DcogPyYN9/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        "imageUrl": "https://res.cloudinary.com/dlx9sj1pl/image/upload/v1712692992/Screenshot_2024-04-10_013236_q0xwi0.png",
        "subtitle": null,
        "description": "A hands-on session on Starknet Network will cover Starknet theory, its advantages over other Layer 2 solutions, its architecture, account abstraction and STARKs."
      },
      {
        "date": "29 JANUARY 2024",
        "title": "Careers in Web3",
        "link": "https://www.instagram.com/p/C2p11F5Sxye/",
        "imageUrl": "https://res.cloudinary.com/duptmanu9/image/upload/v1707140357/geetika-di_ktiuzk.png",
        "subtitle": null,
        "description": "Dived into \"Careers in Web3\" with Geetika Gupta, President of Assetmerkle IGDTUW, for insights into opportunities in the tech world. Participants learned to create their first crypto wallet."
      },
      {
        "date": "25 JANUARY 2024",
        "title": "Build with Tezos",
        "link": "https://www.instagram.com/p/C2aDhlkyXuh/",
        "imageUrl": "https://res.cloudinary.com/duptmanu9/image/upload/v1707140357/build-with-teszo_fj66i0.png",
        "subtitle": null,
        "description": "AssetMerkle and The Product House hosted 'Build with Tezos,' a hands-on workshop on Tezos Blockchain at IGDTUW."
      },
      {
        "date": "08 JANUARY 2024",
        "title": "Deepdive into Blockchain & Crypto",
        "link": "https://www.instagram.com/p/C1zYCVlyoLM/",
        "imageUrl": "https://res.cloudinary.com/duptmanu9/image/upload/v1707140357/blockchain_o4u0ok.png",
        "subtitle": null,
        "description": "AssetMerkle's insightful session, \"Deepdive into Blockchain & Crypto,\" with Grahil Khandelwal, Community Lead at Deepverse DAO, explored Blockchain intricacies, Crypto insights, and decentralized ecosystem futures."
      },
      {
        "date": "06 JANUARY 2024 ONWARDS",
        "title": "Chain Pe Charcha",
        "link": "https://www.instagram.com/p/C1mzhijSS22/",
        "imageUrl": "https://res.cloudinary.com/duptmanu9/image/upload/v1707140357/chainpecharcha_gm0ysz.png",
        "subtitle": null,
        "description": "AssetMerkle took a dive into the world of Web3 technologies with an exciting Twitter Spaces podcast. We unraveled the secrets of the decentralized web, featuring insights and discussions about the future of technology and cyberspace. If you were passionate about sharing your insights, we hope you joined us as a speaker."
      },
      {
        "date": "26-27 OCTOBER 2023",
        "title": "Emerging Technologies Workshop",
        "link": "https://www.instagram.com/p/Cy0XPIESUBA/",
        "imageUrl": "https://res.cloudinary.com/duptmanu9/image/upload/v1707140357/AM-GDSC_o0c14y.png",
        "subtitle": null,
        "description": "'Emerging Technologies: Pioneering the Digital Frontier' was a two-day tech extravaganza on October 26 & 27, 2023. Participants delved into the latest in web3, cloud-native architectures, blockchain, AI, and more, engaging with experts and witnessing live demos."
      },
      {
        "date": "27-29 OCTOBER 2023",
        "title": "HackHive, a 36-hour hackathon adventure",
        "link": "https://www.instagram.com/p/CyWG4_eSLHg/",
        "imageUrl": "https://res.cloudinary.com/duptmanu9/image/upload/v1707140357/hack-hive_b3tszn.png",
        "subtitle": null,
        "description": "HackHive, a 36-hour in-person hackathon in Indore by Techhunterssss, supported by MLH, was a tech extravaganza from October 27th to 29th. Tech enthusiasts made their bytes count in this inclusive event."
      },
      {
        "date": "06 OCTOBER 2023",
        "title": "Introduction to Crypto V/S Blockchain and Altcoins",
        "link": "https://www.instagram.com/p/Cx0QMPrS13G/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        "imageUrl": "https://res.cloudinary.com/djv5kc7as/image/upload/v1698598489/Asset%20Mantle%20-%20Team%202023/Events/Screenshot_317_nle6lt.png",
        "subtitle": null,
        "description": "Epic Collaboration Between DApps.co and AssetMantle IGDTUW for an Unforgettable Online Webinar and Quiz: 'Introduction to Crypto v/s Blockchain and Altcoins.'"
      },
      {
        "date": "19 AUGUST 2023",
        "title": "Web3 Cohort & Ideathon",
        "link": "https://www.instagram.com/p/CwGGYVuyqHk/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        "imageUrl": "https://res.cloudinary.com/djv5kc7as/image/upload/v1698597655/Asset%20Mantle%20-%20Team%202023/Events/Screenshot_316_ilf1ht.png",
        "subtitle": null,
        "description": "AssetMerkle IGDTUW's Web3 mentorship cohort, in collaboration with Web3Samaj, spans Javascript, ReactJs, and NodeJs. Post a brief break, we're set for Web3 sessions. Concurrently, mentees formed groups for an Ideathon, developing dApps with Web3 mentorship passionately."
      },
      {
        "date": "06 AUGUST 2023",
        "title": "FastN Session",
        "link": "https://www.instagram.com/p/CvZ9Ps1yCk_/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        "imageUrl": "https://res.cloudinary.com/djv5kc7as/image/upload/v1698596897/Asset%20Mantle%20-%20Team%202023/Events/Screenshot_315_hcwl6o.png",
        "subtitle": null,
        "description": "Assetmantle IGDTUW collaborated with FastN and conducted a Roadshow on 6th August, Sunday from 11:30-6pm The roadshow consisted of enhancing the coding skills using fastN stack to build full - stack web apps. It was a hands-on session and a quiz was conducted in which top 3 winners were awarded with awesome prizes."
      },
      {
        "date": "01-02 APRIL 2023",
        "title": "BFF Hackathon",
        "link": "https://www.instagram.com/reel/CpdLN0qMN3D/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        "imageUrl": "https://res.cloudinary.com/djv5kc7as/image/upload/v1688802646/Asset%20Mantle%20-%20Team%202023/Events/Screenshot_303_cpvgip.png",
        "subtitle": null,
        "description": "Our collaboration with DTU AUV brought you a 24 hour offline hackathon in DTU premises on 1st and 2 nd April 2023.Teams joined us to build solution to the problem statements and have it reviewed by seasoned mentors who provided them with proper guidance."
      },
      {
        "date": "13 FEBRUARY 2023",
        "title": "Intro to Web3 and its Career Scope",
        "link": "https://www.instagram.com/p/CoeHzBkSLWY/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        "imageUrl": "https://res.cloudinary.com/djv5kc7as/image/upload/v1688802647/Asset%20Mantle%20-%20Team%202023/Events/Screenshot_302_pgrxxz.png",
        "subtitle": null,
        "description": "An introductory session with Sanket Aggarwal on Web3 and its differences from Web2. Talks about blockchain technology and its differences from conventional centralized databases. The event revolved around the subject web3 and the career scope in it. Mr. Sanket Aggarwal, our esteemed speaker, talked about Web 3 and how it is being implemented, along with its differences from the current web iteration, Web2."
      },
      {
        "date": "01 FEBRUARY 2023",
        "title": "Find Global Career opp ortunities on Web3 and Metaverse",
        "link": "https://www.instagram.com/p/CoBxdCNynKB/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        "imageUrl": "https://res.cloudinary.com/djv5kc7as/image/upload/v1688802648/Asset%20Mantle%20-%20Team%202023/Events/Screenshot_301_oeeode.png",
        "subtitle": null,
        "description": "An expedition into the career scope of Web3 and Metaverse with Vas Modinos, the founder of Blockready, a Dubai based blockchain and web3 education platform With over sixty attendees both from BTech and BBA courses in attendance, Mr. Vas Modinos helmed the students through the world of Web3 - he elucidated on the blockchain technology and how it is being deployed for the development of Web3."
      },
      {
        "date": "19 JANUARY 2023",
        "title": "Orientation and Treasure Hunt",
        "link": "https://www.instagram.com/p/CnbUEn8Ss2s/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
        "imageUrl": "https://res.cloudinary.com/djv5kc7as/image/upload/v1688802647/Asset%20Mantle%20-%20Team%202023/Events/Screenshot_300_mgqx8x.png",
        "subtitle": null,
        "description": "AssetMerkle IGDTUW hosted a lively orientation with team intros and a fun treasure hunt on January 19, 2023. Focused on Blockchain, the chapter aims to support and engage students in unique events, like this thrilling treasure hunt."
      }
    ];

    return (
        <div className="relative mt-20">
            {/* The main vertical line for the DESKTOP timeline */}
            <div className="hidden lg:block absolute top-0 left-1/2 w-1 h-full bg-gray-600 transform -translate-x-1/2"></div>
            {events.map((event, index) => (
                <TimelineItem key={index} event={event} index={index} />
            ))}
        </div>
    );
};