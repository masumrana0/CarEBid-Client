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
import ProductAddtionalDetails from "./ProductAdditionalDetails";
import ProductBiddingInfo from "./ProductBiddingInfo";

const { Step } = Steps;

export type IMediaState = {
  mainPhoto: UploadFile | null;
  otherPhotos: UploadFile[];
  docsPhotos: UploadFile[];
};
const CreateProductForm = () => {
  const [fileList, setFileList] = useState<IMediaState | null>(null);
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector(
    (state) => state.productReducer.setFormStep
  );

  return (
    <div className="container mx-auto shadow-lg p-5">
      <Steps
        responsive
        current={currentStep}
        onChange={(step) => dispatch(setProductFormStep(step))}
      >
        <Step title="Product Details" />
        <Step title="Photos & Videos" />
        <Step title="Specifications" />
        <Step title="Additional Details" />
        <Step title="Bidding Info" />
      </Steps>

      <div className="mt-5">
        {/* product details section  */}
        {currentStep === 0 && <ProductDetailForm />}
        {/*product  Photos & vides section  */}
        {currentStep === 1 && <ProductMedia setMedia={setFileList} />}
        {currentStep === 2 && <ProductSpecification />}
        {/* product additional details  */}
        {currentStep === 3 && <ProductAddtionalDetails />}
        {/* Product bidding info */} 
        {currentStep === 4 && <ProductBiddingInfo />}
      </div>
    </div>
  );
};

export default CreateProductForm;
