import React from 'react';
import DOMPurify from 'dompurify';
// import md from 'markdown-it';
import markdownIt from 'markdown-it';

type Props = {
  text: string;
};

const md = markdownIt({});

const Markdown = ({ text }: Props) => {
  console.log('first' + text);
  const safeText = typeof text === 'string' ? text : '';
  const htmlcontent = md.render(safeText);
  const sanitized = DOMPurify.sanitize(htmlcontent);
  console.log('mar' + sanitized);

  return <div dangerouslySetInnerHTML={{ __html: sanitized }}></div>;
};

export default Markdown;
