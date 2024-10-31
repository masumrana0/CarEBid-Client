"use client";
import React, { useEffect } from "react";
import { Form, Input, Select } from "antd";
import { IProduct } from "@/Interface/product";
import ProductFormStep from "./ProductFormStep";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setProductFormStep } from "@/Redux/Slices/productSlice";

const { Option } = Select;

const ProductDetailForm = () => {
  const [form] = Form.useForm();
  const currentStep = useAppSelector(
    (state) => state.productReducer.setFormStep
  );

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
    const savedValues = localStorage.getItem("productForm");
    if (savedValues) {
      form.setFieldsValue(JSON.parse(savedValues));
    }
  }, [form]);

  // Save form data to localStorage on every change
  const onValuesChange = (changedValues: any, allValues: IProduct) => {
    localStorage.setItem("productForm", JSON.stringify(allValues));
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      initialValues={{
        title: "",
        titleStatus: "",
        make: "",
        model: "",
        mileage: "",
        vin: "",
      }}
    >
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

      <Form.Item
        name="titleStatus"
        label="Title Status"
        rules={[{ required: true, message: "Please select the title status" }]}
      >
        <Select placeholder="Select title status">
          {[
            "clean (CT)",
            "salvage",
            "rebuilt/reconstructed",
            "junk",
            "buyback",
            "bonded",
            "export only",
            "odometer rollback",
            "flood",
            "non-repairable",
          ].map((status) => (
            <Option key={status} value={status}>
              {status}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <div className="md:flex items-center gap-5 w-full">
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

      <div className="md:flex items-center gap-5 w-full">
        <Form.Item
          name="mileage"
          label="Mileage"
          className="w-full"
          rules={[
            { required: true, message: "Please enter the mileage" },
            {
              pattern: /^\d+$/,
              message: "Mileage must be a numeric value",
            },
          ]}
        >
          <Input placeholder="Enter mileage" />
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

      <ProductFormStep />
    </Form>
  );
};

export default ProductDetailForm;
