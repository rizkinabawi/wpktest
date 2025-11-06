import { v2 as cloudinary } from "cloudinary";

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  url: string;
  publicId: string;
  format: string;
  width?: number;
  height?: number;
  bytes: number;
}

/**
 * Upload file ke Cloudinary.
 * Bisa menerima File (FormData), Buffer, atau base64 string.
 */
export async function uploadToCloudinary(
  file: File | Buffer | string,
  folder: string = "washizu-mekki",
  resourceType: "image" | "raw" | "video" | "auto" = "auto"
): Promise<UploadResult> {
  try {
    // Jika file adalah File (dari FormData)
    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const upload = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: resourceType,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      const result = upload as any;
      return {
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes,
      };
    }

    // Jika file sudah berupa string atau Buffer
    const result = await cloudinary.uploader.upload(file as string, {
      folder,
      resource_type: resourceType,
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
    };
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
}

/**
 * Hapus file dari Cloudinary
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: "image" | "raw" | "video" = "image"
): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  } catch (error: any) {
    console.error("Cloudinary delete error:", error);
    throw new Error(`Failed to delete file: ${error.message}`);
  }
}

export default cloudinary;
