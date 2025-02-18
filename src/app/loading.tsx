"use client";

//overlay prop is used to decide whether the screen will have blur effect or not. By default loader has blur effect.
const LoaderSkeleton = ({ overlay=true }: { overlay?: boolean }) => {
  return (
    <div className={overlay ? "overlay" : ""}>
      <div className="loader"></div>
      <style jsx>
        {`
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 100;
            cursor: pointer;
          }
          .loader {
            width: 56px;
            height: 56px;
            border: 10px solid blue;
            border-bottom-color: transparent;
            border-radius: 50%;
            display: inline-block;
            box-sizing: border-box;
            animation: rotation 700ms linear infinite;
          }
          @keyframes rotation {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};
export default LoaderSkeleton;