import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Container from './Container.jsx';
import Button from './Button.jsx';

const links = [
  { label: 'Demo', href: '/demo' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'NIL Director Portal', href: '/director/dashboard' },
  { label: 'About', href: '/about' },
  { label: 'Login', href: '/login' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-black/5">
      <Container className="py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rootd-green/15 text-rootd-green font-semibold flex items-center justify-center">
            R
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-600">Rootd NIL</p>
            <p className="text-lg font-semibold text-rootd-charcoal">Community Platform</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-600">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-rootd-charcoal transition-colors">
              {link.label}
            </a>
          ))}
          <Button as="a" href="/quiz" className="ml-2">
            Take the Quiz
          </Button>
        </nav>

        <button className="lg:hidden text-rootd-charcoal" onClick={() => setOpen((prev) => !prev)} aria-label="Toggle navigation">
          <Menu size={24} />
        </button>
      </Container>

      {open && (
        <div className="lg:hidden border-t border-black/5 bg-white">
          <Container className="py-4 flex flex-col gap-3 text-sm text-neutral-700">
            {links.map((link) => (
              <a key={link.label} href={link.href} className="py-1">
                {link.label}
              </a>
            ))}
            <Button as="a" href="/quiz" className="w-full text-center">
              Take the Quiz
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
