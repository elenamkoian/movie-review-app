import ReactModal from "react-modal";

interface ModalProps {
  text: string;
  isReviewCard?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
}

export const ConfirmationModal: React.FC<ModalProps> = ({
  text,
  isReviewCard,
  onConfirm,
  onClose,
}) => {
  return (
    <ReactModal
      isOpen={true}
      onRequestClose={onClose}
      className="w-[90%] max-w-md bg-gray-800 text-white rounded-2xl shadow-xl p-6 border border-white/10 animate-[fadeIn_0.2s_ease] "
      overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.2s_ease] z-20"
      ariaHideApp={false}
    >
      <h2 className="text-xl font-semibold mb-4 text-center">
        Are you sure you want to delete {isReviewCard ? "your Review for " : "your Save of "}
        <span className="font-bold text-red-600">{text}</span>?
      </h2>

      <div className="flex gap-4 mt-6 justify-center">
        <button
          onClick={onConfirm}
          className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-400 transition font-medium cursor-pointer transform hover:scale-110 ease-in-out"
        >
          Yes
        </button>

        <button
          onClick={onClose}
          className="px-5 py-2 rounded-xl bg-gray-500 hover:bg-zinc-400 transition font-medium cursor-pointer transform hover:scale-110 ease-in-out"
        >
          No
        </button>
      </div>
    </ReactModal>
  );
};
