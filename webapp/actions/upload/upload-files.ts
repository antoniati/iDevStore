"use server";

import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { Buffer } from "buffer";
import sharp from "sharp";

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS3_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.AWS_BUCKET_NAME;

if (!region || !accessKeyId || !secretAccessKey || !bucketName) {
      throw new Error("The AWS environment variables are not set correctly.");
};

const s3Client = new S3Client({
      region,
      credentials: {
            accessKeyId,
            secretAccessKey,
      },
});

type FileUploadResponse = {
      status: string;
      message: string;
      links?: string[];
};

async function uploadFileToS3(file: Buffer, fileName: string, contentType: string) {
      // Sharp specific settings for each file type
      let processedBuffer;

      if (contentType === "image/jpeg" || contentType === "image/jpg") {
            processedBuffer =
                  await sharp(file)
                        .jpeg({ quality: 50 })
                        .resize(800, 800)
                        .toBuffer();

      } else if (contentType === "image/png") {
            processedBuffer = await sharp(file).png({ compressionLevel: 5 }).resize(800, 800).toBuffer();
      } else {
            throw new Error("Unsupported file type.");
      }

      const params: PutObjectCommandInput = {
            Bucket: bucketName,
            Key: `${fileName}`,
            Body: processedBuffer,
            ACL: "public-read",
            ContentType: contentType,
      };

      const command = new PutObjectCommand(params);

      try {
            await s3Client.send(command);
      } catch (error) {
            throw error;
      };
};

export async function uploadSingleFile(formData: FormData): Promise<string> {
      const bucketUrl = `https://${bucketName}.s3.sa-east-1.amazonaws.com/`;

      try {
            const file = formData.get("file");
            if (file instanceof File) {
                  const buffer = Buffer.from(await file.arrayBuffer());
                  const extensionFile = file.name.split(".").pop();
                  const contentType = file.type;
                  const newFileName = `${Date.now()}.${extensionFile}`;

                  await uploadFileToS3(buffer, newFileName, contentType);

                  const link = `${bucketUrl}${newFileName}`;

                  revalidatePath("/");

                  return link;
            } else {
                  throw new Error("No file found in form data.");
            }
      } catch (error) {
            console.error("Error during file upload:", error);
            throw error;
      }
}