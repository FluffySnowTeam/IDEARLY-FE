import classes from "./MarkDownPost.module.css";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";

type postType = {
  post: string;
};

export default function MarkDownPost({ post }: postType) {
  return (
    <div className={classes.markdown_container}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                language={match[1]}
                PreTag="div"
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
              className={classes.markdown_container_img}
            />
          ),
        }}
      >
        {post}
      </ReactMarkdown>
    </div>
  );
}
