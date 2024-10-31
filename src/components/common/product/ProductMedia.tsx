"use client";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Form, Upload, Select, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";
import { IProduct } from "@/Interface/product"; // Ensure this path is correct
import Image from "next/image";
import { IMediaState } from "./CreateProduct";

const ProductMedia: React.FC<{
  setMedia: Dispatch<SetStateAction<IMediaState | null>>;
}> = ({ setMedia }) => {
  const [mainPhotoFile, setMainPhotoFile] = useState<UploadFile | null>(null);
  const [otherPhotoFiles, setOtherPhotos] = useState<UploadFile[]>([]);
  const [docsPhotoFiles, setDocsPhotos] = useState<UploadFile[]>([]);

  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewVisible, setPreviewVisible] = useState(false);

  // Load initial state from local storage
  useEffect(() => {
    const savedMainPhoto = JSON.parse(
      localStorage.getItem("mainPhoto") || "null"
    );
    const savedOtherPhotos = JSON.parse(
      localStorage.getItem("otherPhotos") || "[]"
    );
    const savedDocsPhotos = JSON.parse(
      localStorage.getItem("docsPhotos") || "[]"
    );

    // Reconstruct the UploadFile objects
    setMainPhotoFile(savedMainPhoto ? { ...savedMainPhoto, uid: "-1" } : null);
    setOtherPhotos(
      savedOtherPhotos.map((url: string, index: number) => ({
        uid: `other-${index}`,
        name: `other-${index}`,
        status: "done",
        url,
      }))
    );
    setDocsPhotos(
      savedDocsPhotos.map((url: string, index: number) => ({
        uid: `docs-${index}`,
        name: `docs-${index}`,
        status: "done",
        url,
      }))
    );
  }, []);

  // Save to local storage whenever there’s a change
  useEffect(() => {
    localStorage.setItem(
      "mainPhoto",
      JSON.stringify(mainPhotoFile?.url || null)
    );
    localStorage.setItem(
      "otherPhotos",
      JSON.stringify(otherPhotoFiles.map((file) => file.url))
    );
    localStorage.setItem(
      "docsPhotos",
      JSON.stringify(docsPhotoFiles.map((file) => file.url))
    );
  }, [mainPhotoFile, otherPhotoFiles, docsPhotoFiles]);

  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.thumbUrl || file.url || "");
    setPreviewVisible(true);
  };

  const handleMainPhotoChange = ({ fileList }: { fileList: UploadFile[] }) => {
    const newMainPhoto = fileList[0] || null; // Only allow one main photo
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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Form.Item
        name="mainPhoto"
        label="Main Photo"
        rules={[{ required: true, message: "Please upload the main photo!" }]}
      >
        <Upload
          listType="picture-card"
          fileList={mainPhotoFile ? [mainPhotoFile] : []}
          onPreview={handlePreview}
          onChange={handleMainPhotoChange}
          maxCount={1}
        >
          {!mainPhotoFile && uploadButton}
        </Upload>
      </Form.Item>

      <Form.Item name="others" label="Other Photos">
        <Upload
          listType="picture-card"
          fileList={otherPhotoFiles}
          onPreview={handlePreview}
          onChange={handleOtherPhotosChange}
          multiple
        >
          {otherPhotoFiles.length < 15 && uploadButton}
        </Upload>
      </Form.Item>

      <Form.Item name="docs" label="Documents">
        <Upload
          listType="picture-card"
          fileList={docsPhotoFiles}
          onPreview={handlePreview}
          onChange={handleDocsPhotosChange}
          multiple
        >
          {docsPhotoFiles.length < 10 && uploadButton}
        </Upload>
      </Form.Item>

      <Form.Item name="videos" label="Videos">
        <Select
          mode="tags"
          placeholder="Add video URLs"
          tokenSeparators={[","]}
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
    </>
  );
};

export default ProductMedia;
