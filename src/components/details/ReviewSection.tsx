import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@/src/components/common/form/TextField";
import Rating from "@/src/components/common/Rating";
import Button from "@/src/components/common/Button";

type ReviewSectionProps = {
  className?: string;
};
type ReviewForm = {
  name: string;
  email: string;
  comment: string;
  rate: number;
};
export default function ReviewSection({ className = "" }: ReviewSectionProps) {
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
    onSubmit: ({ name, email, comment, rate }, { resetForm }) => {},
  });
  return (
    <div className={`${className}`}>
      <form onSubmit={reviewForm.handleSubmit}>
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
        <Button type="submit" size="lg" className="fw-semibold mt-4">
          Submit Your Review
        </Button>
      </form>
    </div>
  );
}
