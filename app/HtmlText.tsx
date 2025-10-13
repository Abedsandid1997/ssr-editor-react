import React from "react";

const HtmlText = ({ children }: { children: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: children }} />;
};

export default HtmlText;
