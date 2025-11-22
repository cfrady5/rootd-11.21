import React from 'react';

export default function Container({ as: Component = 'div', className = '', children }) {
  return (
    <Component className={`max-w-container w-full mx-auto px-4 sm:px-6 ${className}`}>
      {children}
    </Component>
  );
}
