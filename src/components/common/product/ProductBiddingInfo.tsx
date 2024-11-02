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
  UploadFile,
  message,
} from "antd";
import { IProduct } from "@/Interface/product";
import ProductFormStep from "./ProductFormStep";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setProductFormStep } from "@/Redux/Slices/productSlice";
import { productFormStepValueKeys } from "@/content/product.constant";
import { InfoCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { createFileObject } from "@/utils/file";
import {
  getFromLocalStorageAsParse,
  removeFromLocalStorage,
} from "@/utils/local-storage";
import { useCreateProductMutation } from "@/Redux/api/productApi";

const ProductBiddingInfo = () => {
  const [form] = Form.useForm();
  // essential state
  const [stepOneFormData, setStepOneFormData] = useState<IProduct | null>(null);
  const [stepThreeFormData, setStepThreeFormData] = useState<IProduct | null>(
    null
  );
  const [stepFourFormData, setStepFourFormData] = useState<IProduct | null>(
    null
  );
  // step 2 file value
  const [mainPhotoFile, setMainPhotoFile] = useState<UploadFile | null>(null);
  const [otherPhotoFiles, setOtherPhotos] = useState<UploadFile[]>([]);
  const [docsPhotoFiles, setDocsPhotos] = useState<UploadFile[]>([]);
  const [videoLinks, setVideoLinks] = useState<string[]>([]);

  // redux
  const dispatch = useAppDispatch();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  // loading all previous data
  useEffect(() => {
    const loadFormDataFromLocalStorage = () => {
      const parseJSON = (key: string, fallback: any) =>
        JSON.parse(localStorage.getItem(key) || fallback);

      // Load step-5 product bidding info
      const savedStepFiveData = parseJSON(
        productFormStepValueKeys.stepFive,
        "null"
      );
      if (savedStepFiveData) {
        // Convert date strings to moment objects
        if (savedStepFiveData.bids?.biddingDuration) {
          const { startBid, endBid } = savedStepFiveData.bids.biddingDuration;
          savedStepFiveData.bids.biddingDuration.startBid = startBid
            ? moment(startBid)
            : undefined;
          savedStepFiveData.bids.biddingDuration.endBid = endBid
            ? moment(endBid)
            : undefined;
        }
        form.setFieldsValue(savedStepFiveData);
      }

      // Load product media step-2 data
      if (parseJSON("mainPhoto", "null")) {
        setMainPhotoFile(
          createFileObject(parseJSON("mainPhoto", "null"), "main-photo", "-1")
        );
      } else {
        dispatch(setProductFormStep(1));
      }

      if (parseJSON("otherPhotos", "[]").length > 0) {
        setOtherPhotos(
          parseJSON("otherPhotos", "[]").map((url: string, index: number) =>
            createFileObject(url, `other-${index}`)
          )
        );
      } else {
        dispatch(setProductFormStep(1));
      }

      if (parseJSON("docsPhotos", "[]").length > 0) {
        setDocsPhotos(
          parseJSON("docsPhotos", "[]").map((url: string, index: number) =>
            createFileObject(url, `docs-${index}`)
          )
        );
      } else {
        dispatch(setProductFormStep(1));
      }

      if (parseJSON("videoLinks", "[]").length > 0) {
        setVideoLinks(parseJSON("videoLinks", "[]"));
      } else {
        dispatch(setProductFormStep(1));
      }

      // Load step-1, step-3, and step-4 form data
      if (getFromLocalStorageAsParse(productFormStepValueKeys.stepOne)) {
        setStepOneFormData(
          getFromLocalStorageAsParse(productFormStepValueKeys.stepOne)
        );
      } else {
        dispatch(setProductFormStep(0));
      }

      if (getFromLocalStorageAsParse(productFormStepValueKeys.stepThree)) {
        setStepThreeFormData(
          getFromLocalStorageAsParse(productFormStepValueKeys.stepThree)
        );
      } else {
        dispatch(setProductFormStep(2));
      }

      if (getFromLocalStorageAsParse(productFormStepValueKeys.stepFour)) {
        setStepFourFormData(
          getFromLocalStorageAsParse(productFormStepValueKeys.stepFour)
        );
      } else {
        dispatch(setProductFormStep(3));
      }
    };

    loadFormDataFromLocalStorage();
  }, [dispatch, form]);

  // seting Bidding value
  const onValuesChange = (_: any, allValues: IProduct) => {
    localStorage.setItem(
      productFormStepValueKeys.stepFive,
      JSON.stringify(allValues)
    );
  };

  // handle submit or finish
  const onFinish = async (values: IProduct) => {
    const data = new FormData();
    const allData = {
      ...values,
      video: videoLinks,
      ...stepOneFormData,
      ...stepThreeFormData,
      ...stepFourFormData,
    };

    // appending data
    data.append("data", JSON.stringify(allData));
    data.append("mainPhoto", JSON.stringify(mainPhotoFile) as any);
    data.append("others", JSON.stringify(otherPhotoFiles) as any);
    data.append("docs", JSON.stringify(docsPhotoFiles) as any);

    const res = await createProduct(data).unwrap();
    console.log(res);
    console.log(mainPhotoFile);

    if (res?.statusCode === 201) {
      removeFromLocalStorage(productFormStepValueKeys.stepOne);
      removeFromLocalStorage(productFormStepValueKeys.stepThree);
      removeFromLocalStorage(productFormStepValueKeys.stepFour);
      removeFromLocalStorage("mainPhoto");
      removeFromLocalStorage("others");
      removeFromLocalStorage("docs");
      removeFromLocalStorage("videoLinks");
    } else {
      if (res?.error?.message) {
        console.log(res.error.message);
      } else {
        message.error("An unexpected error occurred");
      }
    }

    console.log("Submitted Values:", data);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      className="bg-white p-4 rounded"
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
              { required: true, message: "Please enter the minimum bid." },
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
            rules={[{ required: true, message: "Please select a start time." }]}
          >
            <DatePicker
              showTime
              placeholder="Select start time"
              className="w-full"
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
            rules={[{ required: true, message: "Please select an end time." }]}
          >
            <DatePicker
              showTime
              placeholder="Select end time"
              className="w-full"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24} md={12}>
          <Form.Item
            name={["location", "city"]}
            label="City"
            rules={[{ required: true, message: "Please enter the city name." }]}
          >
            <Input placeholder="Enter city" className="w-full" />
          </Form.Item>
        </Col>

        <Col span={24} md={12}>
          <Form.Item
            name={["location", "zipCode"]}
            label="Zip Code"
            rules={[
              { required: true, message: "Please enter the zip code." },
              { type: "number", message: "Zip code must be a number." },
            ]}
          >
            <InputNumber
              min={0}
              placeholder="Enter zip code"
              className="w-full"
            />
          </Form.Item>
        </Col>
      </Row>

      <div className="mt-4">
        <ProductFormStep />
      </div>
    </Form>
  );
};

export default ProductBiddingInfo;
