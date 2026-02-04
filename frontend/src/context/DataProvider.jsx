import React, { createContext, useState } from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaLaptopCode,
  FaMobileAlt,
  FaPalette,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";
export const DataContext = createContext(null);

const initialData = {
  services: [
    {
      imageSrc: "",
      number: 1,
      icon: FaLaptopCode,
      title: "Web Development",
      description:
        "Get high-performance, scalable web solutions with modern UI/UX design and enterprise-grade security. Fast loading speeds and a business-focused, mobile-first approach ensure your online presence is robust and future-ready.",
      buttonLink: "/services/web-development",
    },
    {
      imageSrc: "https://via.placeholder.com/100/4169E1/FFFFFF?text=App",
      number: 2,
      icon: FaMobileAlt,
      title: "App Development",
      description:
        "Build cross-platform mobile apps with seamless user experiences, advanced security, and real-time synchronization. Native iOS and Android solutions guarantee high performance and optimal optimization for every device.",
      buttonLink: "/services/app-development",
    },
    {
      imageSrc: "https://via.placeholder.com/100/3CB371/FFFFFF?text=UI/UX",
      number: 3,
      icon: FaPalette,
      title: "UI/UX Design",
      description:
        "We craft engaging, intuitive interfaces using professional tools like Figma and Adobe XD. Our branding solutions and data-driven, user-centered designs deliver premium and memorable visual experiences for your audience.",
      buttonLink: "/services/ui-ux-design",
    },
  ],
  team: [
    {
      id: "t1",
      name: "Gaurav Kumar",
      role: "Full Stack Developer",
      avatar: "https://ik.imagekit.io/novacoders/Photos/Snapchat-4965591~2.jpg",
      socialLinks: [
        {
          icon: FaLinkedinIn,
          url: "https://www.linkedin.com/in/gaurav-lodhi9090/",
        },
        { icon: FaGithub, url: "https://github.com/Gauravlodhi530" },
      ],
    },
    {
      id: "t2",
      name: "Harsh Vardhan",
      role: "Python Developer",
      avatar: "https://ik.imagekit.io/novacoders/Photos/Snapchat-387145606.jpg",
      socialLinks: [
        {
          icon: FaLinkedinIn,
          url: "https://www.linkedin.com/in/harsh-vardhan-285122235/",
        },
        { icon: FaGithub, url: "https://github.com/HarshVardhanLab" },
      ],
    },
    {
      id: "t3",
      name: "Shivam Pratap Singh",
      role: "Frontend Developer",
      avatar:
        "https://ik.imagekit.io/novacoders/Photos/WhatsApp%20Image%202025-08-28%20at%2022.08.05_0ebe7733.jpg?updatedAt=1760639298405",
      socialLinks: [
        {
          icon: FaLinkedinIn,
          url: "https://www.linkedin.com/in/shivampratap2005/",
        },
        { icon: FaGithub, url: "https://github.com/2005shivam" },
      ],
    },
    {
      id: "t4",
      name: "Hritik Sharma",
      role: "Full Stack Developer",
      avatar:
        "https://ik.imagekit.io/novacoders/Photos/hack%20gear%201.0%20logo%20(1).png",
      socialLinks: [
        {
          icon: FaLinkedinIn,
          url: "https://www.linkedin.com/in/hritik-sharma-oct04/",
        },
        { icon: FaGithub, url: "https://github.com/hritik2004-cse" },
      ],
    },
  ],
  social: [
    { icon: FaWhatsapp, url:"https://chat.whatsapp.com/JVzL8OjwWlj2AsF99uXGs4" },
    { icon: FaInstagram, url: "https://www.instagram.com/nova_coders_007/" },
    { icon: FaLinkedinIn, url: "https://www.linkedin.com/company/novacoders007/" },
    { icon: FaGithub, url: "https://github.com/novacoders-edu" },
  ],


  events: [
    {
      title: "Hack Gear 1.0",
      date: "April 30, 2025",
      description: "Nova Coders' first-ever hackathon at VIT Aligarh.",
      image:
        "https://ik.imagekit.io/novacoders/Photos/image.png?updatedAt=1764434689499",
      status: "Complete",
    },
    {
      title: "TechVerse Workshop",
      date: "November 4-7, 2025",
      description: "A 3-day hands-on workshop by Nova Coders.",
      image: "https://ik.imagekit.io/novacoders/Photos/image(1).png",
      status: "Complete",
    },
    {
      title: "DevSphere",
      date: "11 Oct 2025",
      description: "India's largest open-source collaboration event.",
      image:
        "https://ik.imagekit.io/novacoders/Photos/Blue%20Purple%20and%20White%20Gradient%20Modern%20Digital%20Marketing%20Technology%20Blog%20Article%20Instagram%20Post.png?updatedAt=1764951936288",
      status: "Complete",
    },
    {
      title: "Hack Gear 2.0",
      date: "February 9, 2026",
      description: "Intensive 2-week AI/ML training program.",
      image:
        "https://ik.imagekit.io/novacoders/Photos/hack%20gear%201.0%20logo%20(2).png",
      status: "Upcoming",
    },
  ],
  timeline: [
    {
      year: "2024",
      title: "Foundation",
      description:
        "Nova Coders was founded with a vision to bridge the gap between academic learning and industry requirements.",
      icon: "🚀",
    },
    {
      year: "2024",
      title: "First Workshop",
      description:
        "Conducted our first tech workshop on Web Development fundamentals with 50+ participants.",
      icon: "📚",
    },
    {
      year: "2025",
      title: "Community Growth",
      description:
        "Reached 500+ active members and launched our mentorship program.",
      icon: "👥",
    },
    {
      year: "2025",
      title: "Hack Gear 1.0",
      description:
        "Successfully organized our first hackathon with 200+ participants and industry partnerships.",
      icon: "🏆",
    },
  ],
  whyChooseUs: [
    {
      icon: "💡",
      title: "Innovation",
      description: "Cutting-edge technologies and modern development practices",
    },
    {
      icon: "🤝",
      title: "Community",
      description: "Supportive network of like-minded developers and mentors",
    },
    {
      icon: "🎯",
      title: "Mentorship",
      description: "Guidance from industry experts and experienced developers",
    },
    {
      icon: "🛠️",
      title: "Real Projects",
      description: "Hands-on experience with actual industry projects",
    },
  ],
  projects: [
    {
      id: 1,
      title: "Nova Coders Website",
      description:
        "Modern, responsive website for Nova Coders community with advanced animations and optimized performance. Built with React, Tailwind CSS, and Framer Motion for seamless user experience.",
      image:
        "https://ik.imagekit.io/novacoders/Photos/image.png?updatedAt=1764952365478",
      technologies: [
        "React",
        "Tailwind CSS",
        "Framer Motion",
        "Node.js",
        "Context API",
      ],
      githubUrl: "https://github.com/novacoders/website",
      liveUrl: "https://novacoders.dev",
      category: "web",
      teamSize: 2,
      status: "completed",
    },
    {
      id: 2,
      title: "AI Chat Bot with Memory",
      description:
        "A real-time AI chat application that stores user context and conversation history using long-term memory. Built with a scalable MERN stack, it enables personalized responses, continuous learning, and natural interactions with persistent user data.",
      image:
        "https://ik.imagekit.io/novacoders/Photos/image.png?updatedAt=1764952895202",
      technologies: [
        "MongoDB",
        "Express",
        "React",
        "Node.js",
        "Socket.io",
        "Gemini",
      ],
      githubUrl: "https://github.com/novacoders/ai-memory-bot",
      liveUrl: "https://memorybot.novacoders.dev",
      category: "ai/ml",
      teamSize: 1,
      status: "completed",
    },
    {
      id: 3,
      title: "Blockchain Voting System",
      description:
      "Secure, transparent voting system built on blockchain technology. Ensures vote integrity and provides real-time results with complete transparency and immutable records.",
      image:
      "https://ik.imagekit.io/novacoders/Photos/maxresdefault.jpg?updatedAt=1764952814444",
      technologies: ["Solidity", "Web3.js", "React", "Ethereum", "MetaMask"],
      githubUrl: "https://github.com/novacoders/blockchain-voting",
      category: "blockchain",
      teamSize: 5,
      status: "in-progress",
    },
  ],
};

// Optimized images with WebP format and multiple sizes
const allimages = [
  {
    src: "https://ik.imagekit.io/novacoders/Photos/IMG_20250503_170636.jpg?updatedAt=1760639131433&tr=f-webp,q-80,w-800",
    srcSet:
      "https://ik.imagekit.io/novacoders/Photos/IMG_20250503_170636.jpg?updatedAt=1760639131433&tr=f-webp,q-80,w-400 400w, https://ik.imagekit.io/novacoders/Photos/IMG_20250503_170636.jpg?updatedAt=1760639131433&tr=f-webp,q-80,w-800 800w",
    alt: "Photo 1",
    loading: "lazy",
  },
  {
    src: "https://ik.imagekit.io/novacoders/Photos/IMG_20250503_172507.jpg?updatedAt=1760639131470&tr=f-webp,q-80,w-800",
    srcSet:
      "https://ik.imagekit.io/novacoders/Photos/IMG_20250503_172507.jpg?updatedAt=1760639131470&tr=f-webp,q-80,w-400 400w, https://ik.imagekit.io/novacoders/Photos/IMG_20250503_172507.jpg?updatedAt=1760639131470&tr=f-webp,q-80,w-800 800w",
    alt: "Photo 2",
    loading: "lazy",
  },
  {
    src: "https://ik.imagekit.io/novacoders/Photos/IMG_20250503_093659.jpg?updatedAt=1760639131355&tr=f-webp,q-80,w-800",
    srcSet:
      "https://ik.imagekit.io/novacoders/Photos/IMG_20250503_093659.jpg?updatedAt=1760639131355&tr=f-webp,q-80,w-400 400w, https://ik.imagekit.io/novacoders/Photos/IMG_20250503_093659.jpg?updatedAt=1760639131355&tr=f-webp,q-80,w-800 800w",
    alt: "Photo 3",
    loading: "lazy",
  },
  {
    src: "https://ik.imagekit.io/novacoders/Photos/IMG_20250503_170534.jpg?updatedAt=1760639131430&tr=f-webp,q-80,w-800",
    srcSet:
      "https://ik.imagekit.io/novacoders/Photos/IMG_20250503_170534.jpg?updatedAt=1760639131430&tr=f-webp,q-80,w-400 400w, https://ik.imagekit.io/novacoders/Photos/IMG_20250503_170534.jpg?updatedAt=1760639131430&tr=f-webp,q-80,w-800 800w",
    alt: "Photo 4",
    loading: "lazy",
  },
  {
    src: "https://ik.imagekit.io/novacoders/Photos/IMG_20250503_084932.jpg?updatedAt=1760639131475&tr=f-webp,q-80,w-800",
    srcSet:
      "https://ik.imagekit.io/novacoders/Photos/IMG_20250503_084932.jpg?updatedAt=1760639131475&tr=f-webp,q-80,w-400 400w, https://ik.imagekit.io/novacoders/Photos/IMG_20250503_084932.jpg?updatedAt=1760639131475&tr=f-webp,q-80,w-800 800w",
    alt: "Photo 5",
    loading: "lazy",
  },
  {
    src: "https://ik.imagekit.io/novacoders/Photos/IMG-20251011-WA0013.jpg?updatedAt=1760639131382&tr=f-webp,q-80,w-800",
    srcSet:
      "https://ik.imagekit.io/novacoders/Photos/IMG-20251011-WA0013.jpg?updatedAt=1760639131382&tr=f-webp,q-80,w-400 400w, https://ik.imagekit.io/novacoders/Photos/IMG-20251011-WA0013.jpg?updatedAt=1760639131382&tr=f-webp,q-80,w-800 800w",
    alt: "Photo 6",
    loading: "lazy",
  },
  {
    src: "https://ik.imagekit.io/novacoders/Photos/IMG-20251011-WA0042.jpg?updatedAt=1760639131271&tr=f-webp,q-80,w-800",
    srcSet:
      "https://ik.imagekit.io/novacoders/Photos/IMG-20251011-WA0042.jpg?updatedAt=1760639131271&tr=f-webp,q-80,w-400 400w, https://ik.imagekit.io/novacoders/Photos/IMG-20251011-WA0042.jpg?updatedAt=1760639131271&tr=f-webp,q-80,w-800 800w",
    alt: "Photo 8",
    loading: "lazy",
  },
  {
    src: "https://ik.imagekit.io/novacoders/Photos/IMG-20251011-WA0014.jpg?updatedAt=1760639131364&tr=f-webp,q-80,w-800",
    srcSet:
      "https://ik.imagekit.io/novacoders/Photos/IMG-20251011-WA0014.jpg?updatedAt=1760639131364&tr=f-webp,q-80,w-400 400w, https://ik.imagekit.io/novacoders/Photos/IMG-20251011-WA0014.jpg?updatedAt=1760639131364&tr=f-webp,q-80,w-800 800w",
    alt: "Photo 9",
    loading: "lazy",
  },
];

// Optimized partner logos
const imageLogos = [
  {
    src: "https://ik.imagekit.io/novacoders/Photos/image.avif?updatedAt=1760639131274&tr=f-webp,q-90,w-200",
    alt: "cyberfort tech",
    href: "https://www.cyberfort.tech/",
    loading: "lazy",
  },
  {
    src: "https://ik.imagekit.io/novacoders/Photos/primary_logo.webp?updatedAt=1760639131302&tr=f-webp,q-90,w-200",
    alt: "where u elevate",
    href: "https://whereuelevate.com/",
    loading: "lazy",
  },
  {
    src: "https://ik.imagekit.io/novacoders/Photos/logo-B44AG4cU.png?updatedAt=1760639131348&tr=f-webp,q-90,w-200",
    alt: "techiehelp",
    href: "https://www.techiehelp.in/",
    loading: "lazy",
  },
  {
    src: "https://ik.imagekit.io/novacoders/Photos/551101046_17857560783510599_1229464419472107943_n.jpg?updatedAt=1760639131249&tr=f-webp,q-90,w-200",
    alt: "nerdsroom",
    href: "https://www.linkedin.com/company/nerds-room/",
    loading: "lazy",
  },
  {
    src: "https://ik.imagekit.io/novacoders/Photos/527571807_17865813603429598_6175066066889160637_n.jpg?updatedAt=1760639131255&tr=f-webp,q-90,w-200",
    alt: "devsphereindia",
    href: "https://www.linkedin.com/company/devsphereindia-community/",
    loading: "lazy",
  },
  {
    src: "https://ik.imagekit.io/novacoders/Photos/image.png?updatedAt=1765008123146",
    alt: "Devantra",
    href: "https://www.linkedin.com/company/devantra-community/?originalSubdomain=in",
    loading: "lazy",
  },
];
const DataProvider = ({ children }) => {
  const [services] = useState(initialData.services);
  const [team] = useState(initialData.team);
  const [social] = useState(initialData.social);
  const [events] = useState(initialData.events);
  const [timeline] = useState(initialData.timeline);
  const [whyChooseUs] = useState(initialData.whyChooseUs);
  const [projects] = useState(initialData.projects);
  const [images] = useState(allimages);
  const [partners] = useState(imageLogos);

  return (
    <DataContext.Provider
      value={{
        services,
        team,
        social,
        events,
        timeline,
        whyChooseUs,
        projects,
        images,
        partners,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
