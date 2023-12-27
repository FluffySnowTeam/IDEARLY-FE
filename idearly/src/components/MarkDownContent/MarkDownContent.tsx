import { PropsWithChildren } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import * as S from "./MarkDownContent.styles";

type IContentProp = {
  content: string;
};

export const MarkDownContent = ({
  content,
}: PropsWithChildren<IContentProp>) => {
  return (
    <S.MarkdownContainerImage>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                language={match[1]}
                PreTag="div"
                // {...props}
                style={materialDark}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code {...props}>{children}</code>
            );
          },
          img: (image) => (
            <img
              src={image.src || ""}
              alt={image.alt || ""}
              width={500}
              height={300}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </S.MarkdownContainerImage>
  );
};
