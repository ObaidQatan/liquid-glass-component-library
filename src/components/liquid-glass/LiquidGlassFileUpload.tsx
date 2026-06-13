import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image, FileText, Music, Video } from "lucide-react";
import { useState, useCallback } from "react";

interface LiquidGlassFileUploadProps {
  onFilesSelected?: (files: File[]) => void;
  className?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
}

function getFileIcon(type: string) {
  if (type.startsWith("image/")) return <Image size={16} className="text-liquid-purple" />;
  if (type.startsWith("video/")) return <Video size={16} className="text-liquid-rose" />;
  if (type.startsWith("audio/")) return <Music size={16} className="text-liquid-cyan" />;
  return <FileText size={16} className="text-liquid-blue" />;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function LiquidGlassFileUpload({
  onFilesSelected,
  className,
  accept,
  multiple = false,
  maxSize = 10,
}: LiquidGlassFileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;
      setError(null);
      const fileArray = Array.from(newFiles);
      const oversized = fileArray.filter((f) => f.size > maxSize * 1024 * 1024);
      if (oversized.length > 0) {
        setError(`Some files exceed ${maxSize}MB limit`);
        return;
      }
      const updated = multiple ? [...files, ...fileArray] : fileArray;
      setFiles(updated);
      onFilesSelected?.(updated);
    },
    [files, multiple, maxSize, onFilesSelected]
  );

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onFilesSelected?.(updated);
  };

  return (
    <div className={cn("w-full", className)}>
      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        animate={{
          scale: isDragOver ? 1.02 : 1,
          borderColor: isDragOver ? "rgba(59, 130, 246, 0.4)" : undefined,
        }}
        className={cn(
          "relative flex flex-col items-center justify-center gap-3 p-8 rounded-2xl",
          "glass-blur-sm glass-surface glass-border border-dashed",
          "transition-colors cursor-pointer",
          isDragOver && "bg-liquid-blue/5"
        )}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--lg-border-subtle)]">
          <Upload size={20} className="text-[var(--lg-text-muted)]" />
        </div>
        <div className="text-center">
          <p className="text-sm text-[var(--lg-text-secondary)]">
            <span className="text-liquid-blue">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-[var(--lg-text-muted)] mt-1">
            Max file size: {maxSize}MB
          </p>
        </div>
      </motion.div>

      {error && (
        <p className="mt-2 text-xs text-liquid-rose">{error}</p>
      )}

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 space-y-2"
          >
            {files.map((file, i) => (
              <motion.div
                key={`${file.name}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl",
                  "glass-blur-sm glass-surface glass-border"
                )}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--lg-border-subtle)]">
                  {getFileIcon(file.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[var(--lg-text-secondary)] truncate">{file.name}</p>
                  <p className="text-[10px] text-[var(--lg-text-muted)]">{formatSize(file.size)}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeFile(i)}
                  className="text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors"
                >
                  <X size={14} />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
