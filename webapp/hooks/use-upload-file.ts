"use client";

import { uploadSingleFile } from "@/actions/upload/upload-files";
import { useState } from "react";

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