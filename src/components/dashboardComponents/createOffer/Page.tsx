"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Form from "@/components/shared/inputs/Form";
import FormInput from "@/components/shared/inputs/FormInput";
import FormSelect from "@/components/shared/inputs/FormSelect";
import SingleImageUploader from "@/components/shared/inputs/SingleImageUploader";
import LoadingSpinner from "@/components/shared/spinners/loadingSpinner";
import { useCreateOfferMutation } from "@/Redux/api/shared/offerApi";

import offerSchema from "@/schema/offer";
import { IoIosCreate } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import {
  OfferCategoryOptions,
  OperatorOpentions,
} from "@/content/selectOptions";
import ShowAllOfferTermsAndCondition from "./ShowOfferTAndC";

import { message } from "antd";
import { useRouter } from "next/navigation";

const CreateOfferComponentPage = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [operatorValidationError, setOperatorValidationError] = useState<
    string | null
  >(null);
  const [categoryValidationError, setCategoryValidationError] = useState<
    string | null
  >(null);
  const [termsAndConditionValue, setTermsAndConditionValue] =
    useState<string>("");
  const [termsAndConditionsValuesArray, setTermsAndConditionsValuesArray] =
    useState<string[]>([]);

  const [createOffer, { isLoading }] = useCreateOfferMutation();

  const router = useRouter();

  const handleAddTermsAndConditions = () => {
    if (termsAndConditionValue.trim()) {
      setTermsAndConditionsValuesArray((prev) => [
        ...prev,
        termsAndConditionValue.trim(),
      ]);
      setTermsAndConditionValue("");
    } else {
      toast.error("Please add Terms and Condition");
    }
  };

  const onSubmit = async (offerData: any) => {
    if (!operator) {
      return setOperatorValidationError("Operator is required");
    }
    if (!category) {
      return setCategoryValidationError("Category is required");
    }
    if (termsAndConditionsValuesArray.length === 0) {
      return message.error("Please add at least one Term and Condition");
    }

    const formData = new FormData();
    const data = {
      ...offerData,
      category,
      operator,
      termsAndConditions: termsAndConditionsValuesArray,
    };

    formData.append("data", JSON.stringify(data));
    if (imageFile) {
      formData.append("file", imageFile);
    }

    message.loading("createing......");

    try {
      const response = await createOffer(formData).unwrap();
      if (response?.statusCode == 200) {
        message.success("Slide create successful");
        router.push("/offer/my-offer");
      }
    } catch (error) {
      console.error("Failed to create offer:", error);
      toast.error("Failed to create offer.");
    }
  };

  return (
    <div className="w-full md:w-[90%] lg:w-[50%] mx-auto shadow-2xl bg-blue-50 p-5 md:py-10 md:px-16 rounded-lg relative mt-5">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
          <LoadingSpinner />
        </div>
      )}

      <h2 className="font-bold text-lg md:text-2xl flex items-center mb-10">
        <IoIosCreate className="text-xl lg:text-3xl" /> Create Offer
      </h2>
      <Form resolver={offerSchema} submitHandler={onSubmit}>
        <div>
          <FormSelect
            label="Select Operator"
            required
            options={OperatorOpentions}
            setValue={setOperator}
          />
          {operatorValidationError && (
            <small className="text-red-500">{operatorValidationError}</small>
          )}
        </div>
        <div className="mt-5">
          <FormSelect
            label="Select Category"
            required
            options={OfferCategoryOptions}
            setValue={setCategory}
          />
          {categoryValidationError && (
            <small className="text-red-500">{categoryValidationError}</small>
          )}
        </div>
        <div className="mt-5">
          <FormInput
            type="text"
            name="duration"
            placeholder="Enter your package duration"
            required
            label="Package Duration"
          />
        </div>
        <div className="flex items-center flex-col md:flex-row gap-5 mt-5">
          <div className="w-full">
            <FormInput
              type="text"
              name="package.internet"
              placeholder="internet package"
              required
              label="Internet Package"
            />
          </div>
          <div className="w-full">
            <FormInput
              type="text"
              name="package.voice"
              placeholder="voice package"
              required
              label="Voice Package"
            />
          </div>
        </div>
        <div className="flex items-center flex-col md:flex-row gap-5 md:gap-10 mt-5">
          <div className="w-full">
            <FormInput
              type="number"
              name="regularPrice"
              placeholder="regular price"
              required
              label="Regular Price"
            />
          </div>
          <div className="w-full">
            {(category === "special offer" ||
              category === "discount offer") && (
              <FormInput
                type="number"
                name="discountPercentage"
                placeholder="percentage"
                required
                label="Discount Percentage"
              />
            )}
          </div>
        </div>
        <div className="mt-5">
          <div className="flex items-center">
            <span className="font-[400] text-sm text-nowrap block mb-1 text-gray-800">
              Terms and Conditions
            </span>
            <span className="text-red-500">*</span>
          </div>
          <div className="flex items-center rounded overflow-hidden">
            <div className="w-full border border-gray-300 hover:border-blue-500 light-darkmode flex items-center py-[7px] px-3 bg-white overflow-hidden">
              <input
                type="text"
                value={termsAndConditionValue}
                onChange={(e) => setTermsAndConditionValue(e.target.value)}
                className="w-full bg-white outline-none overflow-hidden"
                placeholder="Enter your terms and conditions"
              />
              <button
                type="button"
                onClick={() => setTermsAndConditionValue("")}
                className="border rounded-full"
              >
                <RxCross2 />
              </button>
            </div>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleAddTermsAndConditions}
            >
              Add
            </button>
          </div>
          <ShowAllOfferTermsAndCondition
            termsConditions={termsAndConditionsValuesArray}
            setTermsAndConditions={setTermsAndConditionsValuesArray}
          />
        </div>
        <div className="mt-1">
          <SingleImageUploader
            setImageFile={setImageFile}
            className="lg:h-52 h-32 w-full"
          />
        </div>
        <div className="mt-8 flex items-end justify-end">
          <button
            type="submit"
            className="border bg-meta-3 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CreateOfferComponentPage;
