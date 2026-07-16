"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site-data";
import type { NavItem } from "@/lib/types";

type HeaderProps = {
  labels: {
    home: string;
    main: string;
    openMenu: string;
  };
  navItems: NavItem[];
};

export function Header({ labels, navItems }: HeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
      <Link className="logo" href="/" aria-label={labels.home}>
        <Image src={site.logoSrc} alt={`${site.name} logo`} className="logo-img" width={250} height={86} priority />
      </Link>

      <nav className={`nav-menu ${isOpen ? "active" : ""}`} aria-label={labels.main}>
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link className={pathname === item.href ? "active-link" : ""} href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className={`burger-menu ${isOpen ? "active" : ""}`}
        type="button"
        aria-label={labels.openMenu}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>
    </header>
  );
}
