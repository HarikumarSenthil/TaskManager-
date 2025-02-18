import { useState } from "react";

const Popup = ({
  children,
  closePopup,
  className,
}: {
  children: React.ReactNode;
  closePopup: any;
  className?: string;
}): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);

  const togglePopup = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div
        role="presentation"
        className={`popup-wrapper justify-center items-start  flex fixed inset-0 z-50 outline-none focus:outline-none `}
        onClick={() => {
          togglePopup();
          closePopup && closePopup();
        }}
      >
        <div
          role="presentation"
          className={`relative popup popup-container ${className}`}
          onClick={(e): void => e.stopPropagation()}
          onKeyDown={(e): void => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
      <style>{`
        .popup-wrapper {
          background-color: rgba(0, 0, 0, 0.5);
        }
        .popup-container {
          max-height: 500px;
          overflow-y: scroll;
          -ms-overflow-style: none; /* Internet Explorer 10+ */
          scrollbar-width: none; /* Firefox */
        }
        .popup-container::-webkit-scrollbar {
          display: none;
        }
        .popup {
          border-radius: 10px;
        }
        .flex-child {
          flex: 1;
        }
        .flex-child:first-child {
          margin-right: 20px;
        }
        
        @media screen and (max-width: 768px) {
          .popup-container {
            max-height: 700px;
          }
        }
      `}</style>
    </>
  );
};

export default Popup;
