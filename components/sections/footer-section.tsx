"use client";

import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  explore: [
    { label: "Activities", href: "#products" },
    { label: "What We Do", href: "#technology" },
    { label: "Gallery", href: "#gallery" },
    { label: "Events", href: "#accessories" },
  ],
  about: [
    { label: "Our Story", href: "#about" },
    { label: "Founder", href: "https://www.instagram.com/drshwetasingh97088/" },
    { label: "Join the Club", href: "#reserve" },
    { label: "Contact", href: "#about" },
  ],
  service: [
    { label: "Shiv Puri Park", href: "#" },
    { label: "Sunday 6 AM", href: "#" },
    { label: "₹149 to Join", href: "#reserve" },
    { label: "All Paces Welcome", href: "#" },
  ],
};

export function FooterSection() {
  return (
    <footer className="bg-background">
      {/* Main Footer Content */}
      <div className="border-t border-border px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="#hero" className="text-lg font-bold text-foreground">
              PATNA RUN CLUB
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Run Patna, Run Strong. Patna&apos;s most energetic running community — weekly Sunday runs at Shiv Puri Park. Founded by Dr. Shweta Singh.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Service</h4>
            <ul className="space-y-3">
              {footerLinks.service.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 Patna Run Club. All rights reserved.
          </p>

          {/* Developer Credit */}
          <Link
            href="https://www.instagram.com/the.lastglacier/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <span className="relative h-7 w-7 overflow-hidden rounded-full ring-1 ring-border">
              <Image
                src="/images/developer.jpeg"
                alt="Sunny Dev, developer"
                fill
                className="object-cover"
                style={{ objectPosition: "center 25%" }}
                sizes="28px"
              />
            </span>
            <p className="text-xs text-muted-foreground">
              Developed by{" "}
              <span className="font-medium text-foreground">Sunny Dev</span>
            </p>
          </Link>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/patnarunclub/"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              WhatsApp
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Facebook
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
