"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronUp, Header } from "@machine-name/ui";

const SOCIAL_LINKS = [
  { name: "GitHub", href: "https://github.com/kendricklawton" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/kendrick-lawton-ba4085374/",
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
      { label: "betbooklm.com", href: "https://betbooklm.com" },
      { label: "tradebooklm.com", href: "https://tradebooklm.com" },
      { label: "wealthbooklm.com", href: "https://wealthbooklm.com" },
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
      <Header logo={<h1 className="font-bold text-2xl">MACHINENAME.DEV</h1>}>
        <Link href="mailto:info@machinename.dev" className="hover:underline">
          Contact
        </Link>
      </Header>

      <main className="flex flex-col items-start justify-start max-w-2xl gap-8 w-full">
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
