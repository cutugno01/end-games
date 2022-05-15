import React from "react";
import { motion } from "framer-motion";

const ModalOverlay = ({
  handleCloseModal,
  isModalOpen,
  children,
}: {
  handleCloseModal: any;
  isModalOpen?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
      onClick={handleCloseModal}
    >
      {children}
    </motion.div>
  );
};

export default ModalOverlay;
