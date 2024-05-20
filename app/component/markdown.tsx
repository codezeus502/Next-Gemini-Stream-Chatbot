import React from 'react';
import DOMPurify from 'dompurify';

interface SanitizedComponentProps {
  html: string;
}

const SanitizedComponent: React.FC<SanitizedComponentProps> = ({ html }) => {
  const cleanHtml = DOMPurify.sanitize(html, {
    ADD_ATTR: ['data-darkreader-inline-stroke', 'style'],
  });

  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }}></div>;
};

export default SanitizedComponent;
