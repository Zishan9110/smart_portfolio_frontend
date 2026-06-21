import { useRef, useState } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';

export default function ImageUploader({ label, currentImageUrl, onFileSelect, accept = 'image/*', shape = 'square' }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleFile = (file) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onFileSelect(file);
  };

  const handleChange = (e) => {
    handleFile(e.target.files?.[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files?.[0]);
  };

  const displayUrl = preview || currentImageUrl;
  const shapeClass = shape === 'circle' ? 'rounded-full' : shape === 'banner' ? 'rounded-xl aspect-[3/1]' : 'rounded-xl aspect-square';

  return (
    <div>
      {label && <label className="text-sm text-ink-muted mb-2 block">{label}</label>}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className={`relative cursor-pointer border-2 border-dashed border-white/15 hover:border-accent-indigo/50 transition-colors overflow-hidden bg-white/[0.02] ${shapeClass} ${
          shape === 'banner' ? 'w-full' : 'w-32'
        }`}
      >
        {displayUrl ? (
          <>
            <img src={displayUrl} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
              <FiUpload className="text-white" size={20} />
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-ink-faint">
            <FiUpload size={20} />
            <span className="text-[10px]">Upload</span>
          </div>
        )}
        {preview && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPreview(null);
              onFileSelect(null);
            }}
            className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/60 text-white flex items-center justify-center"
          >
            <FiX size={12} />
          </button>
        )}
      </div>
      <input ref={inputRef} type="file" accept={accept} onChange={handleChange} className="hidden" />
    </div>
  );
}
