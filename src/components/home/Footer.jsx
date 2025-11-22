import React from 'react';
import Container from './Container.jsx';

export default function Footer() {
  return (
    <footer className="bg-rootd-charcoal text-white py-10 mt-16">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p className="text-white/70">© {new Date().getFullYear()} Rootd NIL · Built for community</p>
        <div className="flex gap-4 text-white/80">
          <a href="/privacy" className="hover:text-white">Privacy</a>
          <a href="/terms" className="hover:text-white">Terms</a>
          <a href="mailto:team@rootd.com" className="hover:text-white">Contact</a>
        </div>
      </Container>
    </footer>
  );
}
