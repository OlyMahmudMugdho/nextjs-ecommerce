'use client'

import React, { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = {};

type FormSubmitButtonProps = {
  children?: React.ReactNode;
  classname?: String;
} & ComponentProps<"button">;

function FormSubmitButton({
  children,
  classname,
  ...props
}: FormSubmitButtonProps) {

  const { pending } = useFormStatus();



  return (
    <button 
    className="btn btn-warning w-full text-white font-bold"
    {...props}
    disabled = {pending}
    >
      {pending && <span className="loading loading-spinnder"></span>}
      { children }
    </button>
  );
}

export default FormSubmitButton;
