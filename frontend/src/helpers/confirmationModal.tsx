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
      className="w-[90%] max-w-md bg-gray-800 text-white rounded-2xl shadow-xl p-6 border border-white/10 animate-[fadeIn_0.2s_ease]"
      overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.2s_ease]"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">
        Are you sure you want to delete {isReviewCard ? "your Review for " : "your Save of "}
        <span className="font-bold text-red-400">{text}</span>?
      </h2>

      <div className="flex gap-4 mt-6 justify-center">
        <button
          onClick={onConfirm}
          className="px-5 py-2 rounded-xl bg-red-400 hover:bg-red-500 transition font-medium cursor-pointer"
        >
          Yes
        </button>

        <button
          onClick={onClose}
          className="px-5 py-2 rounded-xl bg-zinc-600 hover:bg-zinc-700 transition font-medium cursor-pointer"
        >
          No
        </button>
      </div>
    </ReactModal>
  );
};
