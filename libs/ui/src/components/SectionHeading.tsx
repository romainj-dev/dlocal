import React from 'react';

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="ui-section-heading">
      <h2 className="ui-section-heading__title">{title}</h2>
      {subtitle ? <p className="ui-section-heading__subtitle">{subtitle}</p> : null}
    </div>
  );
}
