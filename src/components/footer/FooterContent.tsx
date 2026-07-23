
import { Link } from "@tanstack/react-router";
import { MdLocalPhone, MdLocationOn } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import AnimatedContainer from "./AnimatedContainer";
import { FaFacebook, FaInstagram } from "react-icons/fa";


interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}
interface FooterLinkGroup {
  label: string;
  links: FooterLink[];
}

const FooterContent = () => {
  const footerLinkGroups: FooterLinkGroup[] = [
    {
      label: "Links",
      links: [
        { title: "Properties", href: "/properties" },
        { title: "Blog", href: "/blog" },
        { title: "About Us", href: "/about" },
        { title: "Contact Us", href: "/contact" }
      ]
    },
    {
      label: "Properties",
      links: [
        { title: "Buy", href: "/properties/buy" },
        { title: "Rent", href: "/properties/rent" },
        { title: "New Homes", href: "/properties/new-homes" },
      ]
    }

  ];

  const socialLinks = [
    { title: "Facebook", href: "#", icon: <FaFacebook /> },
    {
      title: "Instagram",
      href: "https://www.instagram.com/omegbazaar?igsh=MWdhNjc4djJ3aDdxYg==",
      icon: <FaInstagram />
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 xl:gap-12 ">

      {/* Brand column */}
      <AnimatedContainer className="sm:col-span-2 lg:col-span-1  space-y-5">
        <img src="/estate.png" alt="logo" className="h-20 w-auto"/>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Your one-stop destination for quality products. We provide the best
          shopping experience with a wide range of items to choose from.
        </p>
        <div className="flex gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.title}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white hover:text-black transition-colors duration-300"
            >
              <span className="size-4 flex items-center justify-center">
                {link.icon}
              </span>
            </a>
          ))}
        </div>
      </AnimatedContainer>

      {/* Link groups */}
      {footerLinkGroups.map((group, index) => (
        <AnimatedContainer key={group.label} delay={0.1 + index * 0.1}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
            {group.label}
          </h3>
          <ul className="space-y-3">
            {group.links.map((link) => (
              <li key={link.title}>
                <Link
                  to={link.href}
                  className="text-sm text-zinc-400 hover:text-white inline-flex items-center gap-1 transition-colors duration-300"
                >
                  {link.icon && <link.icon className="size-3.5" />}
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </AnimatedContainer>
      ))}

      {/* Contact column */}
      <AnimatedContainer delay={0.3}>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
          Contact Us
        </h3>
        <ul className="space-y-3 text-sm text-zinc-400">
          <li className="flex items-start gap-2">
            <MdLocationOn className="size-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              23-A, near Lal Chand Shoe Maker,
              Shankar Garden Colony, Prakash Nagar,
              Model Town, Jalandhar, Punjab 144003
            </span>
          </li>
          <li className="flex items-center gap-2">
            <MdLocalPhone className="size-4 shrink-0" />
            <a
              href="tel:9501755756"
              className="hover:text-white transition-colors duration-300"
            >
              9501755756
            </a>
          </li>
          <li className="flex items-center gap-2">
            <IoIosMail className="size-4 shrink-0" />
            <a
              href="mailto:omegbazaarofficial@gmail.com"
              className="hover:text-white transition-colors duration-300 break-all"
            >
              omegbazaarofficial@gmail.com
            </a>
          </li>
        </ul>
      </AnimatedContainer>

    </div>
  );
};


export default FooterContent;

