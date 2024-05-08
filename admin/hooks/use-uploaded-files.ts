import { ChangeEvent, useState } from "react";
import { uploadFiles, uploadSingleFile } from "@/actions/upload/upload-files";

export const useUploadedFiles = () => {
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

export const useUploadSingleFile = () => {
      const [uploadedFile, setUploadedFile] = useState<string | null>(null);
      const [isUploading, setIsUploading] = useState<boolean>(false);
      const [error, setError] = useState<string>("");

      const handleUploadSingleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();
            setIsUploading(true);

            if (!event.target.files || event.target.files.length !== 1) {
                  setError("Please select one file to upload.");
                  setIsUploading(false);
                  return;
            }

            const formData = new FormData();
            formData.append("file", event.target.files[0]);

            try {
                  const uploadedLink = await uploadSingleFile(formData);
                  setUploadedFile(uploadedLink);
                  setError("");
            } catch (uploadError) {
                  console.error("Error uploading file:", uploadError);
                  setError("Failed to upload file. Please try again.");
            } finally {
                  setIsUploading(false);
            }
      };

      const removeFile = () => {
            setUploadedFile(null);
      };

      return {
            uploadedFile,
            isUploading,
            error,
            handleUploadSingleFile,
            removeFile,
      };
};