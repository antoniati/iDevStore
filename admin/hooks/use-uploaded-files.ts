import { ChangeEvent, useState } from "react";
import { uploadFiles } from "@/actions/upload/upload-files";

const useUploadedFiles = () => {
      const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
      const [isUploadingFiles, setIsUploadingFiles] = useState<boolean>(false);
      const [errorUploadFiles, setErrorUploadFiles] = useState<string>("");

      const handleUploadFiles = async (event: ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();
            setIsUploadingFiles(true);

            if (!event.target.files) return;

            const formData = new FormData();
            const files = Array.from(event.target.files);

            const maxFiles = 4;
            const currentFileCount = uploadedFiles.length;

            if (currentFileCount + files.length > maxFiles) {
                  setIsUploadingFiles(false);
                  setErrorUploadFiles(`You can only upload up to ${maxFiles} photos. You already have ${currentFileCount}.`);
                  return;
            };

            files.forEach((file) => { formData.append("file", file); });

            try {
                  const uploadedLinks = await uploadFiles(formData);
                  setUploadedFiles((prev) => [...prev, ...uploadedLinks]);
                  setErrorUploadFiles("");
            } catch (uploadError) {
                  console.error("Error uploading files:", uploadError);
                  setErrorUploadFiles("Failed to upload files. Please try again.");
            } finally {
                  setIsUploadingFiles(false);
            };
      };

      const removeFile = (index: number) => {
            setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
      };

      return { uploadedFiles, isUploadingFiles, errorUploadFiles, handleUploadFiles, removeFile, setErrorUploadFiles, setUploadedFiles };
};

export default useUploadedFiles;