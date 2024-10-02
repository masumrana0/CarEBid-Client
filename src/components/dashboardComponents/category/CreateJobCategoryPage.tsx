"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { jobCategorySchema } from "@/schema/job.schema";
import ReUseAbleInput from "@/components/shared/inputs/ReUseableInput";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { useCreateJobCategoryMutation } from "@/Redux/api/jobCategoryApi";
import { Button, message } from "antd";
import { LuMinusCircle, LuPlusCircle } from "react-icons/lu";
import { IJobCategory } from "@/Interface/job";

// Define constants for sub-category limits
const MAX_SUB_CATEGORIES = 15;
const MIN_SUB_CATEGORIES = 1;

const CreateJobCategoryComponentPage: React.FC = () => {
  // Initialize the form with validation schema using React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IJobCategory>({
    resolver: yupResolver(jobCategorySchema),
  });

  // State for managing the number of sub-categories
  const [subCategoryCount, setSubCategoryCount] = useState<number>(1);

  // Mutation hook to create a new job category
  const [createCategory, { isLoading }] = useCreateJobCategoryMutation();

  // Handle form submission
  const onSubmit: SubmitHandler<IJobCategory> = async (data) => {
    try {
      const response = await createCategory(data).unwrap();

      if (response?.statusCode === 201) {
        // Show success message and reset the form
        message.success("Job Category created successfully!");
        reset();
        setSubCategoryCount(1);
      } else {
        // Handle unsuccessful category creation
        message.error("Failed to create Job Category. Please try again.");
      }
    } catch {
      // Handle API errors
      message.error("Failed to create Job Category. Please try again.");
    }
  };

  // Helper function to get nested error messages for sub-category fields
  const getNestedErrorMessage = (
    index: number,
    label = false,
    value = false,
    minCost = false,
  ): string | undefined => {
    if (errors.subOption && errors.subOption[index]) {
      const subOption = errors.subOption[index];

      if (label && subOption.label) {
        return subOption.label.message;
      } else if (value && subOption.value) {
        return subOption.value.message;
      } else if (minCost && subOption.minCost) {
        return subOption.minCost.message;
      }
    }
    return undefined;
  };

  // Function to render sub-category input fields
  const renderSubCategories = () => {
    return Array.from({ length: subCategoryCount }).map((_, index) => (
      <div
        key={index}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
      >
        <ReUseAbleInput
          label={`Sub Category Label ${index + 1}`}
          name={`subOption[${index}].label`}
          placeholder="Enter sub-category label"
          register={register}
          required
          validationError={getNestedErrorMessage(index, true)}
          className="mt-1 block w-full border rounded-md shadow-sm"
        />

        <ReUseAbleInput
          label={`Sub Category Value ${index + 1}`}
          name={`subOption[${index}].value`}
          placeholder="Enter sub-category value"
          register={register}
          required
          validationError={getNestedErrorMessage(index, false, true)}
          className="mt-1 block w-full border rounded-md shadow-sm"
        />

        <ReUseAbleInput
          type="number"
          label={`Sub Category Min Cost ${index + 1}`}
          name={`subOption[${index}].minCost`}
          placeholder="Enter minimum cost"
          register={register}
          required
          validationError={getNestedErrorMessage(index, false, false, true)}
          className="mt-1 block w-full border rounded-md shadow-sm"
        />
      </div>
    ));
  };

  return (
    <div className="container w-full xl:w-[70%] mx-auto shadow-2xl bg-white p-5 md:py-10 md:px-16 rounded-lg relative md:mt-5">
      {/* Page Header */}
      <h1 className="text-xl font-bold mb-4 flex items-center gap-1">
        <FaWpforms /> Job Category Form
      </h1>

      {/* Form Element */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Main Category Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ReUseAbleInput
            label="Category Label"
            name="label"
            placeholder="Enter category label"
            register={register}
            required
            validation={errors}
            className="mt-1 block w-full border rounded-md shadow-sm"
          />
          <ReUseAbleInput
            label="Category Value"
            name="value"
            placeholder="Enter category value"
            register={register}
            required
            validation={errors}
            className="mt-1 block w-full border rounded-md shadow-sm"
          />
        </div>

        {/* Sub Category Section */}
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-1">
            <MdOutlineSubdirectoryArrowRight /> Sub Categories
          </h2>
          <div className="space-y-2">{renderSubCategories()}</div>

          {/* Buttons to Add/Remove Sub Categories */}
          <div className="flex justify-start gap-2 mt-5">
            <Button
              type="dashed"
              disabled={subCategoryCount >= MAX_SUB_CATEGORIES}
              onClick={() => setSubCategoryCount((prev) => prev + 1)}
              icon={<LuPlusCircle />}
              title="Add SubCategory"
            >
              Add SubCategory
            </Button>
            {subCategoryCount > MIN_SUB_CATEGORIES && (
              <Button
                type="dashed"
                onClick={() => setSubCategoryCount((prev) => prev - 1)}
                icon={<LuMinusCircle />}
                title="Remove SubCategory"
              >
                Remove SubCategory
              </Button>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-between">
          <Button
            onClick={() => {
              reset();
              setSubCategoryCount(1); // Reset the sub-category count
            }}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Reset
          </Button>
          <Button
            type="primary"
            loading={isLoading}
            htmlType="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobCategoryComponentPage;
