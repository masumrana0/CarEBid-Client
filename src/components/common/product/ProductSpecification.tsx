"use client";
import React, { useEffect } from "react";
import { Form, Select } from "antd";
import { IProduct } from "@/Interface/product";
import ProductFormStep from "./ProductFormStep";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setProductFormStep } from "@/Redux/Slices/productSlice";
import {
  productDrivetrain,
  productEngineTypes,
  productExteriorColorOptions,
  productFormStepValueKeys,
  productInteriorColorOptions,
  productMileageOptions,
  productTransmission,
} from "@/content/product.constant";
import {
  getFromLocalStorage,
  setToLocalStorageAsStringify,
} from "@/utils/local-storage";

const { Option } = Select;

const ProductSpecification = () => {
  const [form] = Form.useForm();
  const currentStep = useAppSelector(
    (state) => state.productReducer.setFormStep,
  );
  const dispatch = useAppDispatch();

  // Navigate to the next step
  const nextStep = () => {
    dispatch(setProductFormStep(currentStep + 1));
  };

  // Handle form submission
  const onFinish = (values: IProduct) => {
    console.log("Submitted Values:", values);
    nextStep();
  };

  // Load initial values from localStorage if they exist
  useEffect(() => {
    const savedValues = getFromLocalStorage(productFormStepValueKeys.stepThree);
    if (savedValues) {
      form.setFieldsValue(JSON.parse(savedValues));
    }
  }, [form]);

  // Save form data to localStorage on every change
  const onValuesChange = (changedValues: any, allValues: IProduct) => {
    setToLocalStorageAsStringify(productFormStepValueKeys.stepThree, allValues);
  };

  return (
    <Form
      className="bg-white p-4 rounded"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onValuesChange={onValuesChange}
    >
      {/* Product Transmission and Drivetrain */}
      <div className="md:grid grid-cols-2 items-center gap-5 w-full">
        <Form.Item
          name="transmission"
          label="Transmission"
          rules={[
            { required: true, message: "Please select the transmission" },
          ]}
        >
          <Select placeholder="Select transmission">
            {productTransmission.map(({ value, label }) => (
              <Option key={value} value={value}>
                {label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="drivetrain"
          label="Drivetrain"
          rules={[{ required: true, message: "Please select the drivetrain" }]}
        >
          <Select placeholder="Select drivetrain">
            {productDrivetrain.map(({ value, label }) => (
              <Option key={value} value={value}>
                {label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      {/* Product Engine and Mileage */}
      <div className="md:grid grid-cols-2 items-center gap-5 w-full">
        <Form.Item
          name="engine"
          label="Engine Type"
          rules={[{ required: true, message: "Please select the engine type" }]}
        >
          <Select placeholder="Select engine type">
            {productEngineTypes.map(({ value, label }) => (
              <Option key={value} value={value}>
                {label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="mileage"
          label="Mileage"
          rules={[{ required: true, message: "Please select the mileage" }]}
        >
          <Select placeholder="Select mileage">
            {productMileageOptions.map(({ value, label }) => (
              <Option key={value} value={value}>
                {label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      {/* Product Exterior and Interior Color */}
      <div className="md:grid grid-cols-2 items-center gap-5 w-full">
        <Form.Item
          name="exteriorColor"
          label="Exterior Color"
          rules={[
            { required: true, message: "Please select the exterior color" },
          ]}
        >
          <Select placeholder="Select exterior color">
            {productExteriorColorOptions.map(({ value, label }) => (
              <Option key={value} value={value}>
                {label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="interiorColor"
          label="Interior Color"
          rules={[
            { required: true, message: "Please select the interior color" },
          ]}
        >
          <Select placeholder="Select interior color">
            {productInteriorColorOptions.map(({ value, label }) => (
              <Option key={value} value={value}>
                {label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <ProductFormStep />
    </Form>
  );
};

export default ProductSpecification;
