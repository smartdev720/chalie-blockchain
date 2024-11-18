import React from 'react';
import "./style.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    isInstalled: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, isInstalled }) => {

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'} transition-opacity duration-300`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-80"
        onClick={handleBackdropClick}
      ></div>

      {/* Modal Content */}
      <div className={`relative w-[361px] 2xl:w-[600px] xl:w-[600px] lg:w-[600px] md:w-[600px] sm:w-[361px] ${!isInstalled ? "h-[452px] 2xl:h-[425px] xl:h-[425px] lg:h-[425px] md:h-[425px] sm:h-[452px]" : "h-[420px] 2xl:h-[398px] xl:h-[398px] lg:h-[398px] md:h-[398px] sm:h-[420px]" } modal-wrapper z-10 max-w-md p-6 bg-gradient-br shadow-lg transform transition-transform duration-300`}>
        <div className="absolute modal-wrapper inset-[1px] bg-[#1B1B1B]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
