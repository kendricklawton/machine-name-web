import Link from 'next/link';
import styles from './page.module.css';
import { Metadata } from "next";
import React from 'react';

export const metadata: Metadata = {
  title: "Machine Name - Building AI & Automation",
  description: "Machine Name is an applied research lab working on creating intelligent software.",
};

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Machine Name</h1>
        <Link href="mailto:khlawton@asu.edu">Contact</Link>
      </header>
      <div className={styles.main}>
        <p>Machine Name is an applied research lab working on creating intelligent software. Our approach is to build software that utilize AI in ways that make sense. Our current project is TradebookLM - a comprehensive trading journal platform that helps traders document and analyze their trades across all markets.</p><p>TradebookLM is designed to be your complete trading companion,
          helping you track your performance,
          identify patterns,
          and make data-driven decisions. With powerful analytics and intuitive features,
          it&apos;
          s the tool every serious trader needs to improve their trading strategy.</p>

      </div>
    </div>
  );
}
