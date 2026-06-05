import Image from "next/image";
import Link from "next/link";
import { site, socialLinks } from "@/lib/site-data";
import type { NavItem } from "@/lib/types";

type FooterProps = {
  navItems: NavItem[];
  rightsText: string;
  socialLabel: string;
};

export function Footer({ navItems, rightsText, socialLabel }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <Link href="/" className="footer-logo">
          {site.name}
        </Link>
        <p>&copy; 2025 {site.name}. {rightsText}</p>

        <ul className="footer-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>

        <div className="social-links" aria-label={socialLabel}>
          {socialLinks.map((link) => (
            <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
              <Image src={link.iconSrc} alt={link.label} className="social-icon" width={30} height={30} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
