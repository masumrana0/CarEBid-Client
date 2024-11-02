"use client";
import React, { useEffect } from "react";
import { DatePicker, Form, InputNumber, Input, Row, Col, Tooltip } from "antd";
import { IProduct } from "@/Interface/product";
import ProductFormStep from "./ProductFormStep";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setProductFormStep } from "@/Redux/Slices/productSlice";
import { productFormStepValueKeys } from "@/content/product.constant";
import { InfoCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const ProductBiddingInfo = () => {
  const [form] = Form.useForm();
  const currentStep = useAppSelector(
    (state) => state.productReducer.setFormStep
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
    const savedValues = localStorage.getItem(productFormStepValueKeys.stepFive);
    if (savedValues) {
      const parsedValues = JSON.parse(savedValues);

      // Convert the date strings to moment objects
      if (parsedValues.bids?.biddingDuration) {
        if (parsedValues.bids.biddingDuration.startBid) {
          parsedValues.bids.biddingDuration.startBid = moment(
            parsedValues.bids.biddingDuration.startBid
          );
        }
        if (parsedValues.bids.biddingDuration.endBid) {
          parsedValues.bids.biddingDuration.endBid = moment(
            parsedValues.bids.biddingDuration.endBid
          );
        }
      }

      form.setFieldsValue(parsedValues);
    }
  }, [form]);
  
  // Save form data to localStorage on every change
  const onValuesChange = (changedValues: any, allValues: IProduct) => {
    localStorage.setItem(
      productFormStepValueKeys.stepFive,
      JSON.stringify(allValues)
    );
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
            className="w-full"
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
