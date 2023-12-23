import { useState, useCallback } from "react";
import Image from "next/image";
import TextField from "@/src/components/common/form/TextField";
import Button from "@/src/components/common/Button";
import styles from "./newsLetters.module.scss";

type NewsLettersProps = {
  className?: string;
};
export default function NewsLetters({ className = "" }: NewsLettersProps) {
  const [email, setEmail] = useState("");
  const submitHandler = useCallback((e: React.FormEvent) => {
    e.preventDefault();
  }, []);
  return (
    <div className={`${className}`}>
      <div className="p-5 bg-primary position-relative d-flex justify-content-center align-items-center overflow-hidden">
        <div className="w-100 h-100 position-absolute left-0 top-0 z-1">
          <Image
            src="/images/background/newsletter-shape1.png"
            alt="newsletters"
            width={500}
            height={500}
            className="position-absolute left-0 top-0 w-25"
            style={{
              height: "120%",
            }}
          />
          <Image
            src="/images/background/newsletter-shape2.png"
            alt="newsletters"
            width={500}
            height={500}
            className="position-absolute right-0 top-0 w-25"
            style={{
              height: "120%",
            }}
          />
        </div>
        <div className="position-relative z-2 d-flex flex-column align-items-center">
          <h3 className="fs-3 text-white fw-medium">
            Get newsletters in your email
          </h3>
          <p className="mt-3 fz16 text-white">
            Get newsletters on our FREE marketing services in your email.
          </p>
          <form className="mt-4" onSubmit={submitHandler}>
            <div className="d-flex align-items-start rounded-3 overflow-hidden">
              <TextField
                value={email}
                onChange={(newVal) => setEmail(newVal)}
                type="email"
                placeholder="Enter Email..."
                variant="filled"
                bgColor="white"
                className={`flex-grow-1 ${styles.input}`}
              />
              <Button
                type="submit"
                variant="filled"
                color="#ff8c32"
                dark
                hover={false}
                style={{
                  height: "50px",
                  marginLeft: "-10px",
                }}
                className="flex-shrink-0"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
