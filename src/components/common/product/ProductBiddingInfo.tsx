"use client";
import React, { useEffect, useState } from "react";
import {
  DatePicker,
  Form,
  InputNumber,
  Input,
  Row,
  Col,
  Tooltip,
  message,
} from "antd";
import { IProduct } from "@/Interface/product";
import ProductFormStep from "./ProductFormStep";
import { useAppDispatch } from "@/Redux/hooks";
import { setProductFormStep } from "@/Redux/Slices/productSlice";
import { productFormStepValueKeys } from "@/content/product.constant";
import { InfoCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { base64ToFile } from "@/utils/file";
import {
  getFromLocalStorageAsParse,
  removeFromLocalStorage,
  setToLocalStorageAsStringify,
} from "@/utils/local-storage";
import { useCreateProductMutation } from "@/Redux/api/productApi";

// File validation constants
const FILE_LIMITS = {
  MAIN_PHOTO: 1,
  OTHER_PHOTOS: 20,
  DOC_PHOTOS: 10,
};

// Validation function for files
const validateFiles = (
  files: File[],
  maxCount: number,
  fieldName: string
): boolean => {
  if (!files.length) {
    message.error(`${fieldName} is required`);
    return false;
  }
  if (files.length > maxCount) {
    message.error(`Maximum ${maxCount} files are allowed for ${fieldName}`);
    return false;
  }
  return true;
};

const ProductBiddingInfo = () => {
  const [form] = Form.useForm();

  // Essential state
  const [stepOneFormData, setStepOneFormData] = useState<IProduct | null>(null);
  const [stepThreeFormData, setStepThreeFormData] = useState<IProduct | null>(
    null
  );
  const [stepFourFormData, setStepFourFormData] = useState<IProduct | null>(
    null
  );

  // Media files state
  const [mainPhotoFile, setMainPhotoFile] = useState<File | null>(null);
  const [otherPhotoFiles, setOtherPhotoFiles] = useState<File[]>([]);
  const [docsPhotoFiles, setDocsPhotoFiles] = useState<File[]>([]);
  const [videoLinks, setVideoLinks] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  useEffect(() => {
    const loadFormDataFromLocalStorage = () => {
      try {
        // Helper function to safely parse JSON
        const parseJSON = <T,>(key: string, fallback: T): T => {
          const item = localStorage.getItem(key);
          if (!item) return fallback;
          try {
            return JSON.parse(item);
          } catch {
            return fallback;
          }
        };

        // Load step-5 product bidding info
        const savedStepFiveData = parseJSON(
          productFormStepValueKeys.stepFive,
          null
        ) as any;

        if (savedStepFiveData) {
          if (savedStepFiveData.bids?.biddingDuration) {
            const { startBid, endBid } = savedStepFiveData.bids.biddingDuration;
            savedStepFiveData.bids.biddingDuration = {
              startBid: startBid && moment(startBid),
              endBid: endBid && moment(endBid),
            };
          }
          form.setFieldsValue(savedStepFiveData);
        }

        const stepOne = getFromLocalStorageAsParse(
          productFormStepValueKeys.stepOne
        );
        if (!stepOne) {
          dispatch(setProductFormStep(0));
          return;
        }

        // Load main photo
        const mainPhoto = parseJSON<string | null>("mainPhoto", null);
        if (mainPhoto) {
          setMainPhotoFile(base64ToFile(mainPhoto, "mainProductImg"));
        } else {
          dispatch(setProductFormStep(1));
          return;
        }

        // Load other photos
        const otherPhotos = parseJSON<string[]>("otherPhotos", []);
        if (otherPhotos.length > 0) {
          const files = otherPhotos.map((url, index) =>
            base64ToFile(url, `productPhoto-${index}`)
          );
          if (!validateFiles(files, FILE_LIMITS.OTHER_PHOTOS, "Other Photos")) {
            dispatch(setProductFormStep(1));
            return;
          }
          setOtherPhotoFiles(files);
        }

        // Load docs photos
        const docsPhotos = parseJSON<string[]>("docsPhotos", []);
        if (docsPhotos.length > 0) {
          const files = docsPhotos.map((url, index) =>
            base64ToFile(url, `productDocPhoto-${index}`)
          );
          if (
            !validateFiles(files, FILE_LIMITS.DOC_PHOTOS, "Document Photos")
          ) {
            dispatch(setProductFormStep(1));
            return;
          }
          setDocsPhotoFiles(files);
        }

        // Load video links
        setVideoLinks(parseJSON<string[]>("videoLinks", []));

        // Load form steps data

        const stepThree = getFromLocalStorageAsParse(
          productFormStepValueKeys.stepThree
        );

        const stepFour = getFromLocalStorageAsParse(
          productFormStepValueKeys.stepFour
        );

        if (!stepThree) {
          dispatch(setProductFormStep(2));
          return;
        }
        if (!stepFour) {
          dispatch(setProductFormStep(3));
          return;
        }

        setStepOneFormData(stepOne);
        setStepThreeFormData(stepThree);
        setStepFourFormData(stepFour);
      } catch (error) {
        message.error("Failed to load form data");
        dispatch(setProductFormStep(0));
      }
    };

    loadFormDataFromLocalStorage();
  }, [dispatch, form]);

  // storing data in this page form data in localstorage for user better experience
  const onValuesChange = (_: any, allValues: IProduct) => {
    setToLocalStorageAsStringify(
      productFormStepValueKeys.stepFive,
      JSON.stringify(allValues)
    );
  };

  const onFinish = async (values: IProduct) => {
    try {
      // Validate required files
      if (
        !validateFiles([mainPhotoFile!], FILE_LIMITS.MAIN_PHOTO, "Main Photo")
      )
        return;
      if (
        !validateFiles(
          otherPhotoFiles,
          FILE_LIMITS.OTHER_PHOTOS,
          "Other Photos"
        )
      )
        return;
      if (
        !validateFiles(
          docsPhotoFiles,
          FILE_LIMITS.DOC_PHOTOS,
          "Document Photos"
        )
      )
        return;

      const formData = new FormData();

      // Append main photo
      formData.append("mainPhoto", mainPhotoFile!);

      // Append other photos
      otherPhotoFiles.forEach((file) => {
        formData.append("others", file);
      });

      // Append document photos
      docsPhotoFiles.forEach((file) => {
        formData.append("docs", file);
      });

      // Combine all form data
      const productData = {
        ...values,
        video: videoLinks,
        ...stepOneFormData,
        ...stepThreeFormData,
        ...stepFourFormData,
      };

      // Append the JSON data
      formData.append("data", JSON.stringify(productData));

      const response = await createProduct(formData).unwrap();

      if (response?.statusCode === 201) {
        message.success("Product created successfully");
        // Clear all form data from localStorage
        dispatch(setProductFormStep(5));

        [
          productFormStepValueKeys.stepOne,
          productFormStepValueKeys.stepThree,
          // productFormStepValueKeys.stepFour,
          productFormStepValueKeys.stepFive,
          "mainPhoto",
          "otherPhotos",
          "docsPhotos",
          "videoLinks",
        ].forEach((key) => removeFromLocalStorage(key));
      }
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      className="bg-white p-4 rounded"
      disabled={isLoading}
    >
      <Row gutter={[16, 16]}>
        <Col span={24} md={12}>
          <Form.Item
            name={["bids", "minBid"]}
            label={
              <span>
                Minimum Bid{" "}
                <Tooltip title="The starting bid amount for the product">
                  <InfoCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              { required: true, message: "Please enter the minimum bid" },
              {
                type: "number",
                min: 0,
                message: "Minimum bid must be greater than 0",
              },
            ]}
          >
            <InputNumber
              min={0}
              placeholder="Enter minimum bid"
              className="w-full"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24} md={12}>
          <Form.Item
            name={["bids", "biddingDuration", "startBid"]}
            label={
              <span>
                Start Bidding Time{" "}
                <Tooltip title="The date and time when bidding starts">
                  <InfoCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              { required: true, message: "Please select a start time" },
              {
                validator: (_, value) => {
                  if (value && value.isBefore(moment())) {
                    return Promise.reject("Start time cannot be in the past");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <DatePicker
              showTime
              placeholder="Select start time"
              className="w-full"
              disabledDate={(current) =>
                current && current < moment().startOf("day")
              }
            />
          </Form.Item>
        </Col>

        <Col span={24} md={12}>
          <Form.Item
            name={["bids", "biddingDuration", "endBid"]}
            label={
              <span>
                End Bidding Time{" "}
                <Tooltip title="The date and time when bidding ends">
                  <InfoCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              { required: true, message: "Please select an end time" },
              // ({ getFieldValue }) => ({
              //   validator(_, value) {
              //     const startBid = getFieldValue([
              //       "bids",
              //       "biddingDuration",
              //       "startBid",
              //     ]);
              //     if (!value || !startBid) {
              //       return Promise.resolve();
              //     }
              //     if (value.isSameOrBefore(startBid)) {
              //       return Promise.reject("End time must be after start time");
              //     }
              //     return Promise.resolve();
              //   },
              // }),
            ]}
          >
            <DatePicker
              showTime
              placeholder="Select end time"
              className="w-full"
              disabledDate={(current) => {
                const startDate = form.getFieldValue([
                  "bids",
                  "biddingDuration",
                  "startBid",
                ]);
                return (
                  current &&
                  (current < moment().startOf("day") ||
                    (startDate && current < startDate))
                );
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24} md={12}>
          <Form.Item
            name={["location", "city"]}
            label="City"
            rules={[
              { required: true, message: "Please enter the city name" },
              {
                pattern: /^[a-zA-Z\s-]+$/,
                message: "Please enter a valid city name",
              },
            ]}
          >
            <Input placeholder="Enter city" className="w-full" />
          </Form.Item>
        </Col>

        <Col span={24} md={12}>
          <Form.Item
            name={["location", "zipCode"]}
            label="Zip Code"
            rules={[{ required: true, message: "Please enter the zip code" }]}
          >
            <Input placeholder="Enter zip code" className="w-full" />
          </Form.Item>
        </Col>
      </Row>

      <div className="mt-4">
        <ProductFormStep isLoading={isLoading} />
      </div>
    </Form>
  );
};

export default ProductBiddingInfo;
