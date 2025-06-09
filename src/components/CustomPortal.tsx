import { useEffect, type ReactNode } from "react";
import ReactDOM from "react-dom";

type CustomPortalProps = {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
};

const CustomPortal = ({ open, onClose, children }: CustomPortalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default CustomPortal;
