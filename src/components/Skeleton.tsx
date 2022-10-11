export default function Skeleton() {
  return (
    <div className="skeleton">
      <div className="s-banner"></div>
      <div className="s-header"></div>
      <div className="s-content"></div>
      <div className="s-content"></div>
      <div className="s-content"></div>

      <style jsx>{`
        .skeleton {
          animation: skeleton-loading 1s linear infinite alternate;
          max-width: 1200px;
          margin: 20px auto;
        }
        @keyframes skeleton-loading {
          0% {
            background-color: #ededed;
          }
          100% {
            background-color: hsl(200, 20%, 95%);
          }
        }
        .skeleton > div {
          background: #dbcc1a;
          border-radius: 4px;
          margin: 20px 0;
        }
        .s-banner {
          padding: 12% 0;
        }
        .s-header {
          padding: 15px 0;
          max-width: 500px;
        }
        .s-content {
          padding: 8px 0;
          max-width: 1000px;
        }
      `}</style>
    </div>
  );
}
