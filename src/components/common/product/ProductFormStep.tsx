import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setProductFormStep } from "@/Redux/Slices/productSlice";
import { Button, Form } from "antd";
import React, { Dispatch, SetStateAction } from "react";

const ProductFormStep = () => {
  const currentStep = useAppSelector(
    (state) => state.productReducer.setFormStep
  );

  const dispatch = useAppDispatch();

  const next = () => {
    dispatch(setProductFormStep(currentStep + 1));
  };
  const prev = () => {
    dispatch(setProductFormStep(currentStep - 1));
  };

  return (
    <div style={{ marginTop: 20 }}>
      {currentStep < 4 && (
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Next
          </Button>
        </Form.Item>
      )}
      {currentStep > 0 && (
        <Button style={{ margin: "0 8px" }} onClick={prev}>
          Previous
        </Button>
      )}
      {currentStep === 4 && (
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      )}
    </div>
  );
};

export default ProductFormStep;
