"use client";
import React, { useEffect } from "react";
import { Form, Input, Select } from "antd";
import { IProduct } from "@/Interface/product";
import ProductFormStep from "./ProductFormStep";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setProductFormStep } from "@/Redux/Slices/productSlice";
import {
  productBodyStyle,
  productFormStepValueKeys,
  productTitleStatus,
} from "@/content/product.constant";
import {
  getFromLocalStorage,
  setToLocalStorageAsStringify,
} from "@/utils/local-storage";
import { json } from "stream/consumers";

const { Option } = Select;

const ProductDetailForm = () => {
  const [form] = Form.useForm();
  const currentStep = useAppSelector(
    (state) => state.productReducer.setFormStep
  );

  // Product details: title, make, model, vin, titleStatus, launchingYear, bodystyle
  const dispatch = useAppDispatch();

  const next = () => {
    dispatch(setProductFormStep(currentStep + 1));
  };

  const onFinish = (values: IProduct) => {
    console.log("Submitted Values:", values);
    next();
  };

  // Load initial values from localStorage if they exist
  useEffect(() => {
    const savedValues = getFromLocalStorage(productFormStepValueKeys.stepOne);
    if (savedValues) {
      form.setFieldsValue(JSON.parse(savedValues));
    }
  }, [form]);

  // Save form data to localStorage on every change
  const onValuesChange = (changedValues: any, allValues: IProduct) => {
    setToLocalStorageAsStringify(productFormStepValueKeys.stepOne, allValues);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <Form
      className="bg-white p-4 rounded"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onValuesChange={onValuesChange}
    >
      {/* product title  */}
      <Form.Item
        name="title"
        label="Title"
        rules={[
          { required: true, message: "Please enter the product title" },
          { min: 3, message: "Title must be at least 3 characters" },
        ]}
      >
        <Input placeholder="Enter product title" />
      </Form.Item>

      {/* propduct make and model */}
      <div className="md:grid grid-cols-2 items-center gap-5 w-full">
        <Form.Item
          className="w-full"
          name="make"
          label="Make"
          rules={[
            { required: true, message: "Please enter the make" },
            { min: 2, message: "Make must be at least 2 characters" },
          ]}
        >
          <Input placeholder="Enter make" />
        </Form.Item>

        <Form.Item
          className="w-full"
          name="model"
          label="Model"
          rules={[
            { required: true, message: "Please enter the model" },
            { min: 2, message: "Model must be at least 2 characters" },
          ]}
        >
          <Input placeholder="Enter model" />
        </Form.Item>
      </div>

      {/* product titleStatus and Vin */}
      <div className="md:grid grid-cols-2 items-center gap-5 w-full">
        <Form.Item
          name="titleStatus"
          label="Title Status"
          rules={[
            { required: true, message: "Please select the title status" },
          ]}
        >
          <Select
            options={productTitleStatus}
            placeholder="Select title status"
          ></Select>
        </Form.Item>

        <Form.Item
          name="vin"
          label="VIN"
          className="w-full"
          rules={[
            { required: true, message: "Please enter the VIN" },
            {
              len: 17,
              message: "VIN must be exactly 17 characters",
            },
          ]}
        >
          <Input placeholder="Enter VIN" />
        </Form.Item>
      </div>

      {/* product bodyStyle and lancing year */}
      <div className="md:grid grid-cols-2 items-center gap-5 w-full">
        <Form.Item
          name="bodystyle"
          label="Body Style"
          rules={[
            { required: true, message: "Please select the  body status" },
          ]}
        >
          <Select
            options={productBodyStyle}
            placeholder="Select body status"
          ></Select>
        </Form.Item>
        <Form.Item
          name="launchingYear"
          label="Launching Year"
          rules={[
            { required: true, message: "Please select the  body status" },
          ]}
        >
          <Select placeholder="Select Launching Year">
            {years.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <ProductFormStep />
    </Form>
  );
};

export default ProductDetailForm;
