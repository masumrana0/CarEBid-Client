import { UploadFile } from "antd";

export const createFileObject = (
  url: string,
  name: string,
  uid: string = ""
): UploadFile => ({
  uid,
  name,
  status: "done",
  url,
});

// Helper function to convert file to base64
export const getBase64 = (file: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
