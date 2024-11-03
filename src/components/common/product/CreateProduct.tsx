"use client";
import React from "react";
import { Steps } from "antd";
import ProductMedia from "./ProductMedia";
import ProductDetailForm from "./ProductDetailsForm";
import { useAppSelector } from "@/Redux/hooks";
import ProductSpecification from "./ProductSpecification";
import ProductAddtionalDetails from "./ProductAdditionalDetails";
import ProductBiddingInfo from "./ProductBiddingInfo";
import CreateProductSuccessfulResult from "./CreateSuccessfulResult";

const { Step } = Steps;

const CreateProductForm = () => {
  const currentStep = useAppSelector(
    (state) => state.productReducer.setFormStep,
  );

  return (
    <div className="container mx-auto shadow-lg p-5">
      <Steps
        responsive={true}
        current={currentStep}
        // onChange={(step) => dispatch(setProductFormStep(step))}
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
        {currentStep === 1 && <ProductMedia />}
        {currentStep === 2 && <ProductSpecification />}
        {/* product additional details  */}
        {currentStep === 3 && <ProductAddtionalDetails />}
        {/* Product bidding info */}
        {currentStep === 4 && <ProductBiddingInfo />}
        {/* succesful result */}
        {currentStep === 5 && <CreateProductSuccessfulResult />}
      </div>
    </div>
  );
};

export default CreateProductForm;
