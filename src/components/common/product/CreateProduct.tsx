"use client";
import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Steps,
  DatePicker,
  Select,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { IProduct } from "@/Interface/product";
import ProductMedia from "./ProductMedia";
import { UploadFile } from "antd/lib/upload/interface";
import ProductDetailForm from "./ProductDetailsForm";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setProductFormStep } from "@/Redux/Slices/productSlice";
import ProductSpecification from "./ProductSpecification";

const { Step } = Steps;

const { Option } = Select;
export type IMediaState = {
  mainPhoto: UploadFile | null;
  otherPhotos: UploadFile[];
  docsPhotos: UploadFile[];
};
const CreateProductForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<IMediaState | null>(null);
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector(
    (state) => state.productReducer.setFormStep
  );

  return (
    <div className="container mx-auto shadow-lg p-5">
      <Steps
        current={currentStep}
        onChange={(step) => dispatch(setProductFormStep(step))}
      >
        <Step title="Product Details" />
        <Step title="Photos & Videos" />
        <Step title="Specifications" />
        <Step title="Additional Details" />
        <Step title="Bidding Info" />
      </Steps>

      <div style={{ marginTop: 20 }}>
        {/* product details section  */}
        {currentStep === 0 && <ProductDetailForm />}

        {/*product  Photos & vides section  */}
        {currentStep === 1 && <ProductMedia setMedia={setFileList} />}

        {/* Product Specification  */}
        {/* {currentStep === 2 && (
          <>
            <Form.Item
              name="engine"
              label="Engine"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter engine details" />
            </Form.Item>

            <Form.Item
              name="drivetrain"
              label="Drivetrain"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter drivetrain" />
            </Form.Item>

            <Form.Item
              name="transmission"
              label="Transmission"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select transmission type">
                <Option value="automatic">Automatic</Option>
                <Option value="manual">Manual</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="bodyStyle"
              label="Body Style"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select body style">
                {[
                  "coupe",
                  "convertible",
                  "hatchback",
                  "sedan",
                  "suv/crossover",
                  "truck",
                  "van/minivan",
                  "wagon",
                ].map((style) => (
                  <Option key={style} value={style}>
                    {style}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </>
        )} */}
        {currentStep === 2 && <ProductSpecification />}

        {/* product additional details  */}
        {/* {currentStep === 3 && (
          <>
            <Form.Item name="highlights" label="Highlights">
              <Select mode="tags" placeholder="Add highlights" />
            </Form.Item>

            <Form.Item name="equipment" label="Equipment">
              <Select mode="tags" placeholder="Add equipment" />
            </Form.Item>

            <Form.Item name="modification" label="Modification">
              <Select mode="tags" placeholder="Add modifications" />
            </Form.Item>

            <Form.Item
              name="recentServiceHistory"
              label="Recent Service History"
            >
              <Select mode="tags" placeholder="Add service history" />
            </Form.Item>
          </>
        )} */}

        {/* Product bidding info */}
        {/* {currentStep === 4 && (
          <>
            <Form.Item
              name={["bids", "minBid"]}
              label="Minimum Bid"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} placeholder="Enter minimum bid" />
            </Form.Item>

            <Form.Item
              name={["bids", "maxBid"]}
              label="Maximum Bid"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} placeholder="Enter maximum bid" />
            </Form.Item>

            <Form.Item
              name={["bids", "biddingDuration", "startBid"]}
              label="Start Bidding Time"
              rules={[{ required: true }]}
            >
              <DatePicker showTime />
            </Form.Item>

            <Form.Item
              name={["bids", "biddingDuration", "endBid"]}
              label="End Bidding Time"
              rules={[{ required: true }]}
            >
              <DatePicker showTime />
            </Form.Item>
          </>
        )} */}
      </div>
    </div>
  );
};

export default CreateProductForm;
