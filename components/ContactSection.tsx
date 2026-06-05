"use client";

import Image from "next/image";
import { useState } from "react";
import { PhonePopup } from "@/components/PhonePopup";
import { site, socialLinks } from "@/lib/site-data";

type ContactSectionProps = {
  title?: string;
  texts: {
    intro: string;
    modal: {
      ariaLabel: string;
      call: string;
      close: string;
      subtitle: string;
      title: string;
    };
    phoneAlt: string;
    social: string;
  };
};

export function ContactSection({ title = "Contacto", texts }: ContactSectionProps) {
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);

  return (
    <section className="contact">
      <h2>{title}</h2>
      <p>{texts.intro}</p>
      {site.emails.map((email) => (
        <p key={email}>
          <a href={`mailto:${email}`}>{email}</a>
        </p>
      ))}
      <p>{texts.social}</p>

      <div className="social-links">
        {socialLinks.map((link) => (
          <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
            <Image src={link.iconSrc} alt={link.label} className="social-icon" width={30} height={30} />
          </a>
        ))}
        <button className="phone-button" type="button" onClick={() => setIsPhoneOpen(true)}>
          <Image src="/icons/whiteTelephone.png" alt={texts.phoneAlt} className="social-icon" width={30} height={30} />
        </button>
      </div>

      <PhonePopup isOpen={isPhoneOpen} labels={texts.modal} phone={site.phone} onClose={() => setIsPhoneOpen(false)} />
    </section>
  );
}
