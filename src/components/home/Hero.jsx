import React from 'react';
import Container from './Container.jsx';
import Button from './Button.jsx';

export default function Hero() {
  return (
    <section className="bg-neutral-50 py-20">
      <Container className="flex flex-col items-center text-center gap-6">
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-600">NIL Matching</p>
        <h1 className="text-4xl sm:text-5xl font-semibold text-rootd-charcoal leading-tight max-w-3xl">
          Rootd in Community. Driven by Athletes.
        </h1>
        <p className="text-xl text-neutral-600 max-w-2xl">
          The smarter way to match athletes with local businesses.
        </p>
        <p className="text-base text-neutral-500 max-w-2xl">
          Our intelligent quiz connects your personal brand with authentic local opportunities in just a few minutes.
        </p>
        <Button className="mt-4">Start Matching Quiz</Button>
      </Container>
    </section>
  );
}
