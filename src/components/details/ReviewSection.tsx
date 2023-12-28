//this component can be used for Submit comment for both Emoji,Company

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import TextField from "@/src/components/common/form/TextField";
import Rating from "@/src/components/common/Rating";
import Button from "@/src/components/common/Button";
import Alert from "@/src/components/common/Alert";
import ContentWrapper from "@/src/components/common/ContentWrapper";
import { addComment as addEmojiComment } from "@/src/services/emoji";
import { addComment as addCompanyComment } from "@/src/services/company";
import type { CommentReqBody as EmojiCommentReqBody } from "@/src/types/Emoji";
import type { CommentReqBody as CompanyCommentReqBody } from "@/src/types/Company";

type Type = "emoji" | "logo";
type ReviewSectionProps = {
  targetId: number;
  type: Type;
  className?: string;
};
type ReviewForm = {
  name: string;
  email: string;
  comment: string;
  rate: number;
};
export default function ReviewSection({
  type,
  targetId,
  className = "",
}: ReviewSectionProps) {
  const [showAlert, setShowAlert] = useState(false);
  const reviewForm = useFormik<ReviewForm>({
    validateOnMount: false,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues: {
      name: "",
      email: "",
      comment: "",
      rate: 5,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is Required"),
      email: Yup.string()
        .required("Email is Required")
        .email("Enter Valid Email"),
      comment: Yup.string()
        .required("Comment is Required")
        .min(3, "Comment Should have at least 3 characters"),
      rate: Yup.number().required("Enter Rating"),
    }),
    onSubmit: async (
      { name, email, comment, rate },
      { resetForm, setFieldValue }
    ) => {
      if (type === "emoji") {
        await emojiCommentMutate({
          emojiId: targetId,
          userName: name,
          userEmail: email,
          body: comment,
          rate,
        });
      } else if (type === "logo") {
        await companyCommentMutate({
          companyId: targetId,
          userName: name,
          userEmail: email,
          body: comment,
          rate,
        });
      }
      resetForm();
      setFieldValue("rate", 5);
    },
  });
  const {
    mutateAsync: emojiCommentMutate,
    isPending: emojiCommentIsLoading,
    isSuccess: emojiCommentIsSuccess,
    isError: emojiCommentIsError,
  } = useMutation<any, any, EmojiCommentReqBody>({
    mutationKey: ["add-emoji-comment"],
    mutationFn: async ({ emojiId, userName, userEmail, body, rate }) => {
      await addEmojiComment({ emojiId, userName, userEmail, body, rate });
    },
    onSettled: () => {
      setShowAlert(true);
    },
  });
  const {
    mutateAsync: companyCommentMutate,
    isPending: companyCommentIsLoading,
    isSuccess: companyCommentIsSuccess,
    isError: companyCommentIsError,
  } = useMutation<any, any, CompanyCommentReqBody>({
    mutationKey: ["add-company-comment"],
    mutationFn: async ({ companyId, userName, userEmail, body, rate }) => {
      await addCompanyComment({ companyId, userName, userEmail, body, rate });
    },
    onSettled: () => {
      setShowAlert(true);
    },
  });
  return (
    <ContentWrapper
      header="H5"
      title="Write a Review"
      className={`${className}`}
    >
      <div>
        <form noValidate onSubmit={reviewForm.handleSubmit}>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <TextField
                {...reviewForm.getFieldProps("name")}
                error={reviewForm.touched.name && reviewForm.errors.name}
                label="Name"
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                {...reviewForm.getFieldProps("email")}
                error={reviewForm.touched.email && reviewForm.errors.email}
                label="Email"
                type="email"
              />
            </div>
            <div className="col-12">
              <TextField
                as="textarea"
                {...reviewForm.getFieldProps("comment")}
                error={reviewForm.touched.comment && reviewForm.errors.comment}
                label="Review"
              />
            </div>
            <div className="col-12">
              <Rating
                value={reviewForm.values.rate}
                onChange={(newValue) =>
                  reviewForm.setFieldValue("rate", newValue)
                }
                size={25}
              />
            </div>
          </div>
          <Button
            type="submit"
            size="lg"
            className="fw-semibold mt-4"
            loading={emojiCommentIsLoading || companyCommentIsLoading}
          >
            Submit Your Review
          </Button>
        </form>
        <Alert
          show={showAlert}
          onChange={(newValue) => setShowAlert(newValue)}
          type={
            emojiCommentIsSuccess || companyCommentIsSuccess
              ? "success"
              : "danger"
          }
          closeable={false}
          timeout={4000}
          className="mt-4"
        >
          <p className="text-white">
            {emojiCommentIsSuccess || companyCommentIsSuccess
              ? "Your Comment Added successfully"
              : "Error happens when adding comment!"}
          </p>
        </Alert>
      </div>
    </ContentWrapper>
  );
}
