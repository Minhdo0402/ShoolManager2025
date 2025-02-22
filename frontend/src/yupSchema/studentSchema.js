import * as yup from "yup";

export const studentSchema = yup.object({
  name: yup
    .string()
    .min(3, "Student name must contain 3 characters.")
    .required("Student name is required."),
  email: yup
    .string()
    .email("It must be an Email.")
    .required("Email is required."),
  student_class: yup.string().required("Student Class is Required field."),
  age: yup.string().required("Age is Required field."),
  gender: yup.string().required("Gender is Required field."),
  guardian: yup
    .string()
    .min(4, "Must contain 4 characters.")
    .required("Guardian is a required field."),
  guardian_phone: yup
    .string()
    .min(9, "Must contain 9 characters.")
    .max(11, "Must not exceed 11 characters.")
    .required("Guardian is a required field."),
  password: yup
    .string()
    .min(8, "Password must contain 8 characters.")
    .required("Password is a required field."),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Confirm Password Must Match With Password.")
    .required("Confirm password is required field."),
});

export const studentEditSchema = yup.object({
  name: yup
    .string()
    .min(3, "Student name must contain 3 characters.")
    .required("Student name is required."),
  email: yup
    .string()
    .email("It must be an Email.")
    .required("Email is required."),
  student_class: yup.string().required("Student Class is Required field."),
  age: yup.string().required("Age is Required field."),
  gender: yup.string().required("Gender is Required field."),
  guardian: yup
    .string()
    .min(4, "Must contain 4 characters.")
    .required("Guardian is a required field."),
  guardian_phone: yup
    .string()
    .min(9, "Must contain 9 characters.")
    .max(11, "Must not exceed 11 characters.")
    .required("Guardian is a required field."),
  password: yup.string().min(8, "Password must contain 8 characters."),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Confirm Password Must Match With Password."),
});
