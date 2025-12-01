import { useState } from "react";
import ReactModal from "react-modal";

interface ImageUploaderProps {
  onClose: () => void;
  onUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onClose,
  onUpload,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const uploadHandler = () => {
    if (file && onUpload) onUpload(file);
  };

  return (
    <ReactModal
      isOpen={true}
      onRequestClose={onClose}
      className="bg-white p-6 rounded-2xl max-w-md w-full mx-auto outline-none"
      overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
      ariaHideApp={false}
    >
      <h2 className="text-xl font-semibold text-center">Upload avatar</h2>

      <div className="mt-4 flex justify-center">
        {preview ? (
          <img
            src={preview}
            alt="avatar preview"
            className="w-32 h-32 rounded-full object-cover border border-gray-700"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
            No image
          </div>
        )}
      </div>

      <div className="mt-5">
        <label className="cursor-pointer w-full flex items-center justify-center border border-gray-400 rounded-xl py-3 hover:bg-gray-300 transition">
          <span>Select file</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <div className="flex gap-4 mt-6 justify-center">
        <button
          onClick={uploadHandler}
          disabled={!file}
          className={`px-5 py-2 rounded-xl transition font-medium cursor-pointer text-white
            ${
              file
                ? "bg-gray-700 hover:bg-gray-500"
                : "bg-gray-700 hover:bg-gray-500 cursor-not-allowed"
            }
          `}
        >
          Upload
        </button>

        <button
          onClick={onClose}
          className="text-white px-5 py-2 rounded-xl bg-red-400 hover:bg-red-600 transition font-medium cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </ReactModal>
  );
};
