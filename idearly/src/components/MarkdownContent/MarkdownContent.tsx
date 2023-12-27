import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type postType = {
  post: string;
};

export default function MarkDownPost({ post }: postType) {
  return (
    <div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, className, children, ...props }) {
            // `code` 태그로 간단하게 코드 블록을 표시합니다.
            return (
              <code className={className} {...props}>
                {children}
              </code>
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
          table({ node, ...props }) {
            return (
              <table
                style={{ border: "1px solid black", ...props.style }}
                {...props}
              />
            );
          },
          br() {
            return <br />;
          },
        }}
      >
        {post}
      </ReactMarkdown>
    </div>
  );
}
