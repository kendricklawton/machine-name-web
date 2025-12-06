// import Link from 'next/link';
// import styles from './page.module.css';
// import { Metadata } from "next";
// import React from 'react';

// export const metadata: Metadata = {
//   title: "Machine Name - Building AI & Automation",
//   description: "Machine Name is an applied research lab working on creating intelligent software.",
// };

// export default function Home() {
//   return (
//     <div className={styles.page}>
//       <header className={styles.header}>
//         <h1>MACHINENAME.DEV</h1>
//         <Link href="mailto:info@machinename.dev">Contact</Link>
//       </header>
//       <div className={styles.main}>
//         <p>MACHINENAME.DEV is an applied research lab working on creating intelligent software. Our approach is to build software that utilize AI in ways that make sense. Our current project is TradebookLM - a comprehensive trading journal platform that helps traders document and analyze their trades across all markets.</p><p>TradebookLM is designed to be your complete trading companion,
//           helping you track your performance,
//           identify patterns,
//           and make data-driven decisions. With powerful analytics and intuitive features,
//           it&apos;
//           s the tool every serious trader needs to improve their trading strategy.</p>

//       </div>
//     </div>
//   );
// }
// //

"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const SOCIAL_LINKS = [
  { name: "GitHub", href: "https://github.com/kendricklawton" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/kendrick-lawton-257684247/",
  },
  { name: "Twitter", href: "https://x.com/KendrickLawton" },
];

const PROJECT_DATA = [
  {
    title: "Language Model Books",
    sourceLink: "https://github.com/kendricklawton/language-model-books",
    description:
      "A unified monorepo architecture powering multiple AI-driven platforms. Engineered for scalability and code reuse, it drives distinct AI intelligence tools from a single, cohesive foundation.",
    stack: [
      "GCP",
      "Go",
      "Next.js",
      "Plaid",
      "PostgreSQL",
      "Stripe",
      "TypeScript",
      "Vercel",
      "Workos",
    ],
    liveLinks: [
      { label: "wealthbooklm.com", href: "https://wealthbooklm.com" },
      { label: "betbooklm.com", href: "https://betbooklm.com" },
    ],
  },
];

function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col gap-2 w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-fit font-bold uppercase tracking-wider opacity-50 mb-2 hover:opacity-100 transition-opacity text-left"
      >
        {title}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="flex flex-col gap-4 animate-in slide-in-from-top-2 fade-in duration-300">
          {children}
        </div>
      )}
    </div>
  );
}

function SocialLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="hover:underline hover:opacity-100"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
}

function TechBadge({ name }: { name: string }) {
  return (
    <span className="text-xs font-medium border border-neutral-300 dark:border-neutral-700 px-2 py-0.5 rounded-full opacity-70">
      {name}
    </span>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col items-center pb-8 px-[4svw] font-(family-name:--font-geist-mono)">
      <header className="flex flex-row items-center justify-between min-h-24 w-full max-w-2xl">
        <h1 className="font-bold text-2xl">MACHINENAME.DEV</h1>
        <Link href="mailto:info@machinename.dev" className="hover:underline">
          Contact
        </Link>
      </header>

      <main className="flex flex-col items-start justify-start max-w-2xl gap-8">
        <p className="leading-relaxed">
          MACHINENAME.DEV is an applied research lab working on creating
          intelligent software. Our approach is to build software that utilize
          AI in ways that make sense.
        </p>

        <CollapsibleSection title="Featured Project">
          {PROJECT_DATA.map((project, index) => (
            <div key={index} className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between">
                <h2 className="font-semibold">{project.title}</h2>
                {project.sourceLink && (
                  <Link
                    href={project.sourceLink}
                    className="opacity-50 hover:opacity-100 hover:underline"
                  >
                    Source Code
                  </Link>
                )}
              </div>

              <p className="leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>

              {project.liveLinks && project.liveLinks.length > 0 && (
                <div className="flex gap-4 mt-1">
                  {project.liveLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="underline hover:no-underline"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CollapsibleSection>

        <div className="flex flex-col gap-2 w-full">
          <h3 className="font-bold uppercase tracking-wider opacity-50 mb-2">
            Social Links
          </h3>
          <div className="flex gap-4 opacity-80">
            {SOCIAL_LINKS.map((link) => (
              <SocialLink key={link.name} href={link.href}>
                {link.name}
              </SocialLink>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
