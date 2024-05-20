import React from 'react';
import DOMPurify from 'dompurify';
import md from 'markdown-it';

type Props = {
  text: string;
};

const Markdown = ({ text }: Props) => {
  const safeText = typeof text === 'string' ? text : '';

  const htmlcontent = md().render(safeText);

  const sanitized = DOMPurify.sanitize(htmlcontent);

  return <div dangerouslySetInnerHTML={{ __html: sanitized }}></div>;
};

export default Markdown;
