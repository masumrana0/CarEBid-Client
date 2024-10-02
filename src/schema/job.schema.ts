import { IJob } from "@/Interface/job";
import * as yup from "yup";

export const createJobFirstStepsSchema = yup.object().shape({
  jobTitle: yup
    .string()
    .required("Job title is required")
    .min(3, "Job title must be at least 3 characters long")
    .max(50, "Job title must be less than 50 characters long"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long"),
});

type JobStepsSchema = {
  [key: string]: yup.StringSchema<string | undefined>;
};

// Dynamically create validation schema for job steps
export const createJobSecondStepsSchema = (taskCount: number) => {
  const stepSchemas: Record<string, yup.StringSchema> = {};

  for (let i = 1; i <= taskCount; i++) {
    stepSchemas[`step${i}`] = yup
      .string()
      .required(`Step ${i} is required`)
      .min(5, `Step ${i} must be at least 5 characters`);
  }

  return yup.object().shape({
    ...stepSchemas,
  });
};

export const getCreateJobThirdStepSchema = (minCost: number) => {
  return yup.object().shape({
    workerNeeded: yup
      .number()
      .typeError("Workers needed must be a number")
      .required("Workers needed is required")
      .positive("Workers needed must be a positive number")
      .min(1, "Workers needed must be at least 1")
      .max(1000, "Workers needed must not exceed 1000"),

    workerEarn: yup
      .number()
      .typeError("Workers will earn must be a number")
      .required("Workers will earn is required")
      .positive("Workers will earn must be a positive number")
      .min(
        minCost,
        `Workers earnings must be at least ${minCost} taka for this job.`,
      ),
  });
};
export const jobCategorySchema = yup.object().shape({
  label: yup
    .string()
    .required("Category label is required")
    .min(3, "Category label must be at least 3 characters long"),
  value: yup
    .string()
    .required("Category value is required")
    .min(3, "Category value must be at least 3 characters long"),
  subOption: yup.array().of(
    yup.object().shape({
      label: yup
        .string()
        .required("Sub-category label is required")
        .min(3, "Sub-category label must be at least 3 characters long"),
      value: yup
        .string()
        .required("Sub-category value is required")
        .min(3, "Sub-category value must be at least 3 characters long"),
      minCost: yup
        .number()
        .transform((value, originalValue) =>
          // Convert empty string to undefined
          originalValue === "" ? undefined : value,
        )
        .typeError("Minimum cost must be a number")
        .required("Minimum cost is required")
        .positive("Minimum cost must be a positive number")
        .min(1, "Minimum cost must be greater than 0"),
    }),
  ),
});

export const submitWorkValidationSchema = (proofTypes: IJob["proofType"]) => {
  return yup.object().shape({
    proofs: yup.array().of(
      yup.object().shape({
        type: yup.string().required(),
        value: yup.mixed().test("value", function (value) {
          const { type, title } = this.parent; // Access the title from this.parent
          if (type === "text proof" && !value) {
            return this.createError({
              message: `${title} is required.`, // Use the title in the error message
            });
          }
          if (
            type === "screenshot proof" &&
            (!Array.isArray(value) || value.length === 0)
          ) {
            return this.createError({
              message: `${title} is required.`, // Use the title in the error message
            });
          }
          return true;
        }),
      }),
    ),
    note: yup.string(),
    job: yup.string(),
  });
};
