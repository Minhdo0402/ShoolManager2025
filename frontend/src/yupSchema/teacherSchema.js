import * as yup from "yup";

// email:{type:String, required:true},
// name:{type:String, required:true},
// qualification:{type:String, required:true},
// age:{type:String, required:true},
// gender:{type:String, required:true},
// teacher_image:{type:String, required:true},
// password:{type:String, required:true},

export const teacherSchema = yup.object({
  name: yup
    .string()
    .min(3, "Teacher name must contain 3 characters.")
    .required("Teacher name is required."),
  email: yup
    .string()
    .email("It must be an Email.")
    .required("Email is required."),
  age: yup.string().required("Age is Required field."),
  gender: yup.string().required("Gender is Required field."),
  qualification: yup
    .string()
    .min(4, "Must contain 4 characters.")
    .required("Qualification is a required field."),
  password: yup
    .string()
    .min(8, "Password must contain 8 characters.")
    .required("Password is a required field."),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Confirm Password Must Match With Password.")
    .required("Confirm password is required field."),
});

export const teacherEditSchema = yup.object({
    name: yup
    .string()
    .min(3, "Teacher name must contain 3 characters.")
    .required("Teacher name is required."),
  email: yup
    .string()
    .email("It must be an Email.")
    .required("Email is required."),
  age: yup.string().required("Age is Required field."),
  gender: yup.string().required("Gender is Required field."),
  qualification: yup
    .string()
    .min(4, "Must contain 4 characters.")
    .required("Qualification is a required field."),
  password: yup.string().min(8, "Password must contain 8 characters."),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Confirm Password Must Match With Password."),
});
