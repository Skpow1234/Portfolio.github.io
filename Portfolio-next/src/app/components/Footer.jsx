import React from "react";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[200px] lg:h-[200px] relative">
                  <Image
                    src="/images/hero-image.png"
                    alt="hero image"
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    width={300}
                    height={300}
                  />
                </div>
    </footer>
  );
};

export default Footer;
