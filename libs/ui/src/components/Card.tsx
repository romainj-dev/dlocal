import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return <section className={`ui-card ${className}`.trim()}>{children}</section>;
}
