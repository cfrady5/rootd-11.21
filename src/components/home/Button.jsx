import React from 'react';

const baseStyles = 'inline-flex items-center justify-center rounded-2xl text-sm font-semibold tracking-tight transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

const variants = {
  primary: 'bg-rootd-green text-white px-6 py-3 shadow-rootd-soft hover:bg-rootd-green/90 focus-visible:outline-rootd-green',
  ghost: 'bg-white text-rootd-charcoal px-5 py-2 border border-black/10 hover:border-black/30 focus-visible:outline-rootd-green'
};

export default function Button({ as: Component = 'button', variant = 'primary', className = '', children, ...props }) {
  return (
    <Component className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Component>
  );
}
