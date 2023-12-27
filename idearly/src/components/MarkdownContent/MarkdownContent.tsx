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
          hr() {
            return (
              <hr
                style={{
                  color: "#cccccc", // 색상
                  backgroundColor: "#cccccc", // 배경색
                  height: 1, // 높이
                  border: "none", // 테두리 없애기
                  margin: "1rem 0", // 위아래 마진
                  // 추가적인 스타일링 가능
                }}
              />
            );
          },
          ul({ node, ...props }) {
            return (
              <ul
                style={{
                  listStyleType: "circle", // 불릿 스타일 (예: 원형)
                  marginLeft: "20px", // 왼쪽 마진
                  // 다른 스타일 추가 가능
                }}
                {...props}
              />
            );
          },
          ol({ node, ...props }) {
            return (
              <ol
                style={{
                  listStyleType: "decimal", // 숫자 스타일
                  marginLeft: "20px", // 왼쪽 마진
                  // 다른 스타일 추가 가능
                }}
                {...props}
              />
            );
          },
          h1({ node, ...props }) {
            return (
              <h1
                style={{
                  margin: "0.5rem",
                  fontSize: "2em", // 예: 2em
                  fontWeight: "bold", // 더 굵게
                }}
                {...props}
              />
            );
          },
          h2({ node, ...props }) {
            return (
              <h2
                style={{
                  margin: "0.5rem",
                  fontSize: "1.5em", // 예: 1.5em
                  fontWeight: "bold",
                }}
                {...props}
              />
            );
          },
          h3({ node, ...props }) {
            return (
              <h3
                style={{
                  margin: "0.5rem",
                  fontSize: "1.17em", // 예: 1.17em
                  fontWeight: "bold",
                }}
                {...props}
              />
            );
          },
          h4({ node, ...props }) {
            return (
              <h4
                style={{
                  margin: "0.5rem",
                  fontSize: "1em", // 예: 1em
                  fontWeight: "normal", // 덜 굵게
                }}
                {...props}
              />
            );
          },
          h5({ node, ...props }) {
            return (
              <h5
                style={{
                  margin: "0.5rem",
                  fontSize: "0.83em", // 예: 0.83em
                  fontWeight: "normal",
                }}
                {...props}
              />
            );
          },
          h6({ node, ...props }) {
            return (
              <h6
                style={{
                  margin: "0.5rem",
                  fontSize: "0.67em", // 예: 0.67em
                  fontWeight: "normal",
                }}
                {...props}
              />
            );
          },
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
          th({ node, ...props }) {
            return (
              <th
                style={{
                  border: "1px solid #cccccc",
                  textAlign: "center",
                  padding: "0.2rem", // 셀에 패딩 추가
                }}
                {...props}
              />
            );
          },
          td({ node, ...props }) {
            return (
              <td
                style={{
                  border: "1px solid #cccccc",
                  textAlign: "center",
                  padding: "0.2rem", // 셀에 패딩 추가
                }}
                {...props}
              />
            );
          },
          table({ node, ...props }) {
            return (
              <table
                style={{
                  margin: "1rem",
                  border: "1px solid #cccccc",
                  borderCollapse: "collapse",
                  marginLeft: "auto", // 왼쪽 마진을 자동으로 설정
                  marginRight: "auto", // 오른쪽 마진을 자동으로 설정
                  textAlign: "center",
                  ...props.style,
                }}
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
