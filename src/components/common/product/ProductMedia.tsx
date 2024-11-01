"use client";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  Form,
  Upload,
  Select,
  Modal,
  Button,
  Row,
  Col,
  UploadFile,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import Image from "next/image";
import { IMediaState } from "./CreateProduct";

const ProductMedia: React.FC<{
  setMedia: Dispatch<SetStateAction<IMediaState | null>>;
}> = ({ setMedia }) => {
  const [form] = Form.useForm();
  const [mainPhotoFile, setMainPhotoFile] = useState<UploadFile | null>(null);
  const [otherPhotoFiles, setOtherPhotos] = useState<UploadFile[]>([]);
  const [docsPhotoFiles, setDocsPhotos] = useState<UploadFile[]>([]);
  const [videoLinks, setVideoLinks] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewVisible, setPreviewVisible] = useState(false);

  console.log(videoLinks);

  // Helper function to convert file to base64
  const getBase64 = (file: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  // Load initial state from local storage
  useEffect(() => {
    const loadLocalStorage = () => {
      const savedMainPhoto = JSON.parse(
        localStorage.getItem("mainPhoto") || "null"
      );
      const savedOtherPhotos = JSON.parse(
        localStorage.getItem("otherPhotos") || "[]"
      );
      const savedDocsPhotos = JSON.parse(
        localStorage.getItem("docsPhotos") || "[]"
      );
      const savedVideoLinks = JSON.parse(
        localStorage.getItem("videoLinks") || "[]"
      );

      if (savedMainPhoto) {
        setMainPhotoFile(createFileObject(savedMainPhoto, "main-photo", "-1"));
      }
      setOtherPhotos(
        savedOtherPhotos.map((url: string, index: number) =>
          createFileObject(url, `other-${index}`)
        )
      );
      setDocsPhotos(
        savedDocsPhotos.map((url: string, index: number) =>
          createFileObject(url, `docs-${index}`)
        )
      );
      setVideoLinks(savedVideoLinks);
    };

    loadLocalStorage();
  }, []);

  // Save to local storage whenever there’s a change
  useEffect(() => {
    const storeFilesToLocalStorage = async () => {
      const mainPhotoUrl = await getFileUrl(mainPhotoFile);
      const otherPhotosUrls = await Promise.all(
        otherPhotoFiles.map(getFileUrl)
      );
      const docsPhotosUrls = await Promise.all(docsPhotoFiles.map(getFileUrl));

      localStorage.setItem("mainPhoto", JSON.stringify(mainPhotoUrl));
      localStorage.setItem("otherPhotos", JSON.stringify(otherPhotosUrls));
      localStorage.setItem("docsPhotos", JSON.stringify(docsPhotosUrls));
      localStorage.setItem("videoLinks", JSON.stringify(videoLinks));
    };

    storeFilesToLocalStorage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainPhotoFile, otherPhotoFiles, docsPhotoFiles, videoLinks]);

  const createFileObject = (
    url: string,
    name: string,
    uid: string = ""
  ): UploadFile => ({
    uid,
    name,
    status: "done",
    url,
  });

  const getFileUrl = async (
    file: UploadFile | null
  ): Promise<string | null> => {
    if (!file) return null;
    return (
      file.url ||
      (file.originFileObj ? await getBase64(file.originFileObj) : null)
    );
  };

  const handlePreview = (file: UploadFile) => {
    setPreviewImage(file.thumbUrl || file.url || "");
    setPreviewVisible(true);
  };

  const handleMainPhotoChange = ({ fileList }: { fileList: UploadFile[] }) => {
    const newMainPhoto = fileList[0] || null;
    setMainPhotoFile(newMainPhoto);
    setMedia((prev: any) => ({ ...prev, mainPhoto: newMainPhoto }));
  };

  const handleOtherPhotosChange = ({
    fileList,
  }: {
    fileList: UploadFile[];
  }) => {
    if (fileList.length <= 15) {
      setOtherPhotos(fileList);
      setMedia((prev: any) => ({ ...prev, otherPhotos: fileList }));
    }
  };

  const handleDocsPhotosChange = ({ fileList }: { fileList: UploadFile[] }) => {
    if (fileList.length <= 10) {
      setDocsPhotos(fileList);
      setMedia((prev: any) => ({ ...prev, docsPhotos: fileList }));
    }
  };

  const handleVideoLinksChange = (links: string[]) => {
    setVideoLinks(links);
    setMedia((prev: any) => ({ ...prev, videoLinks: links }));
  };

  const uploadButton = (
    <button
      className="border-dotted border-2 border-gray-300 p-2 rounded-lg "
      type="button"
    >
      <PlusOutlined />
      <h3>Upload</h3>
    </button>
  );
  const validateYouTubeUrl = (url: string) => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return youtubeRegex.test(url);
  };
  useEffect(() => {
    console.log("Updated Video Links:", videoLinks);
  }, [videoLinks]);

  const handleSubmit = () => {};

  return (
    <>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="mainPhoto"
          label="Main Photo"
          rules={[{ required: true, message: "Please upload the main photo!" }]}
        >
          <Upload
            listType="picture"
            fileList={mainPhotoFile ? [mainPhotoFile] : []}
            onPreview={handlePreview}
            onChange={handleMainPhotoChange}
            maxCount={1}
          >
            {!mainPhotoFile && uploadButton}
          </Upload>
        </Form.Item>

        <div className=" md:grid grid-cols-2  gap-4 ">
          {/* other photo */}
          <Form.Item
            name="otherPhotos"
            label="Other Photos"
            rules={[
              {
                required: true,
                message: "Please upload at least one other photo!",
              },
            ]}
          >
            <Upload
              listType="picture"
              fileList={otherPhotoFiles}
              onPreview={handlePreview}
              onChange={handleOtherPhotosChange}
              multiple
            >
              {otherPhotoFiles.length < 15 && uploadButton}
            </Upload>
          </Form.Item>

          {/* other docs  */}

          <Form.Item
            name="docsPhotos"
            label="Documents"
            rules={[
              {
                required: true,
                message: "Please upload at least one document photo!",
              },
            ]}
          >
            <Upload
              listType="picture"
              fileList={docsPhotoFiles}
              onPreview={handlePreview}
              onChange={handleDocsPhotosChange}
              multiple
            >
              {docsPhotoFiles.length < 10 && uploadButton}
            </Upload>
          </Form.Item>
        </div>

        <Form.Item
          name="videoLinks"
          label="Videos"
          rules={[
            {
              required: true,
              message: "Please add at least one YouTube link!",
            },
            {
              validator: (_, value) =>
                value.every(validateYouTubeUrl)
                  ? Promise.resolve()
                  : Promise.reject("Invalid YouTube URL(s)"),
            },
          ]}
        >
          <Select
            mode="tags"
            value={videoLinks} // Use value, not defaultValue
            placeholder="Add video URLs"
            tokenSeparators={[","]}
            onChange={handleVideoLinksChange}
          />
        </Form.Item>

        <Modal
          open={previewVisible}
          title="Preview"
          footer={null}
          onCancel={() => setPreviewVisible(false)}
        >
          <Image
            width={500}
            height={500}
            alt="preview"
            style={{ width: "100%" }}
            src={previewImage}
          />
        </Modal>

        <Button type="primary" htmlType="submit" style={{ marginTop: "16px" }}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default ProductMedia;
