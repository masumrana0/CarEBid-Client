"use client";
import React, { useEffect } from "react";
import { Form, Input, Select } from "antd";
import ProductFormStep from "./ProductFormStep";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setProductFormStep } from "@/Redux/Slices/productSlice";

const { Option } = Select;

const ProductSpecification = () => {
  const [form] = Form.useForm();
  const currentStep = useAppSelector(
    (state) => state.productReducer.setFormStep
  );

  const dispatch = useAppDispatch();

  const next = () => {
    dispatch(setProductFormStep(currentStep + 1));
  };

  const onFinish = (values: any) => {
    console.log("Submitted Specification Values:", values);
    next();
  };

  // Load initial values from localStorage if they exist
  useEffect(() => {
    const savedValues = localStorage.getItem("productSpecificationForm");
    if (savedValues) {
      form.setFieldsValue(JSON.parse(savedValues));
    }
  }, [form]);

  // Save form data to localStorage on every change
  const onValuesChange = (changedValues: any, allValues: any) => {
    localStorage.setItem("productSpecificationForm", JSON.stringify(allValues));
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      initialValues={{
        dimensions: "",
        weight: "",
        color: "",
        material: "",
        origin: "",
      }}
    >
      <Form.Item
        name="dimensions"
        label="Dimensions"
        rules={[{ required: true, message: "Please enter the dimensions" }]}
      >
        <Input placeholder="Enter product dimensions (e.g., 10x20x15 cm)" />
      </Form.Item>

      <Form.Item
        name="weight"
        label="Weight"
        rules={[{ required: true, message: "Please enter the weight" }]}
      >
        <Input placeholder="Enter weight (e.g., 1.5 kg)" />
      </Form.Item>

      <Form.Item
        name="color"
        label="Color"
        rules={[{ required: true, message: "Please specify the color" }]}
      >
        <Select placeholder="Select color">
          {["Red", "Blue", "Green", "Black", "White"].map((color) => (
            <Option key={color} value={color}>
              {color}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="material"
        label="Material"
        rules={[{ required: true, message: "Please specify the material" }]}
      >
        <Input placeholder="Enter material (e.g., Plastic, Metal)" />
      </Form.Item>

      <Form.Item
        name="origin"
        label="Country of Origin"
        rules={[{ required: true, message: "Please specify the origin" }]}
      >
        <Input placeholder="Enter country of origin (e.g., China)" />
      </Form.Item>

      <ProductFormStep />
    </Form>
  );
};

export default ProductSpecification;



/**
 *  Product details
 * title
 * make 
 * model
 * vin
 * titleStatus
 * launchingYear
 *
*/


/**
 * Specification
 * transmission
 * bodystyle
 * mileage
 * drivetrain
 * exteriorColor
 * interiorColor
 * 
 *
*/
