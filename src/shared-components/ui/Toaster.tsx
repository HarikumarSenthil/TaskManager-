
"use client"
import { Icon } from "@/lib/svg";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type ToasterProps = {
  messageData: ToasterData;
  open: boolean;
};

export interface ToasterData {
  description: JSX.Element | string;
  variant?: string;
  timer?: number;
  toasterCb?: () => void;
}

const Toaster = ({ messageData, open }: ToasterProps): JSX.Element => {
    const { description, variant, toasterCb } = messageData;
  const dispatch = useDispatch();
  const timer = messageData?.timer || 6000;
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (typeof toasterCb === "function") {
          toasterCb();
        }
      }, timer);
    }
  }, [open]);

  return (
    <>
      {open && (
        <div className={`toaster flex items-center justify-center p-2`}>
          <Icon type="circle-close" className="mr-1" width="20" height="20" fill={"white"}/>
          <p className="text-sm text-bold p-1">{description}</p>
        </div>
      )}
      <style jsx>{`
        .toaster {
          position: fixed;
          top: 5%;
          left: 50%;
          transform: translate(-50%, 0);
          color: ${"white"};
          border-radius: 5px;
          background: ${variant?variant:"green"};
          animation-duration: ${timer}ms;
          width: 50%;
          max-width: unset;
          z-index: 50;
        }
        @media screen and (min-width: 768px) {
          .toaster {
            max-width: 400px;
          }
        }
        @keyframes toaster-animation {
          0% {
            visibility: visible;
            top: 0px;
          }
          10% {
            top: 20px;
          }
          90% {
            top: 20px;
          }
          100% {
            top: 0px;
            visibility: hidden;
          }
        }
      `}</style>
    </>
  );
};

export default Toaster;
