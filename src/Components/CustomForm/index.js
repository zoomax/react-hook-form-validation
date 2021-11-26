import React, { useEffect, useState } from "react";
import { Col, Row, Container, FormGroup, Button, Label } from "reactstrap";
import Select from "react-select";
import {
  Controller,
  useArrayField,
  useForm,
  useWatch,
  useFromContext,
  useFieldArray,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const validationSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup
    .string()
    .matches(/^0(\d{2}\s)?\(?\d{3}\)?\d{3}\d{4}$/)
    .required(),
  date: yup.date().required("this field is required"),
  message: yup.string().required("this field is required"),
  address: yup.string().required("this field is required"),
  skills: yup
    .array(
      yup.object().shape({
        skill: yup.string().required(),
      }),
    )
    .required(),
  gender: yup.string().required("please select your gender"),
});
function CustomForm() {
  const {
    handleSubmit,
    formState: { errors, values },
    register,
    control,
    getValues,
    setValue,
    watch,
    reset,
  } = useForm({
    // defaultValues: {},
    resolver: yupResolver(validationSchema),
  });
  const { fields, append, remove } = useFieldArray({
    name: "skills",
    control,
  });
  // console.log(watch());
  console.log(errors);
  const handleFormsubmition = (data) => console.log(data);
  const initialValues = {
    // name: "hazem tarek",
    // email: "hazem.hemaily@gmail.com",
    // address: "123 main street",
    // message: "hello from Hell",
    // phone: "01014466503",
    // date: "2000-12-11",
    // skills: [
    //   {
    //     skill: "html",
    //   },
    //   {
    //     skill: "css",
    //   },
    // ],
    // gender: "male",
  };
  useEffect(() => {
    reset(initialValues);
    console.log(getValues(), "from getValues function");
  }, []);
  const onSelectChange = (option, fieldName) => {
    reset({ ...getValues(), gender: "male" });
  };
  const [genderOptions, setGenderOptions] = useState([
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Other",
      value: "other",
    },
  ]);
  return (
    <Container fluid>
      <form onSubmit={handleSubmit(handleFormsubmition)}>
        <Row className='justify-content-center '>
          <h3 className='mt-5 fw-bold font-size-24 text-primary text-center'>
            React Strap Form Demo
          </h3>
        </Row>
        <Row className='justify-content-center '>
          <Col md={4} sm={12}>
            <FormGroup>
              <Label>Name</Label>
              <input
                {...register("name")}
                name='name'
                type='text'
                className={`form-control ${errors.date && "border-danger"}`}
              />
              {errors.date && (
                <ErrorMessage message={"This Field is required..."} />
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row className='justify-content-center '>
          <Col md={4} sm={12}>
            <FormGroup>
              <Label>Email</Label>

              <input
                {...register("email")}
                name='email'
                type='email'
                className={`form-control ${errors.email && "border-danger"}`}
              />
              {errors.email && (
                <ErrorMessage message={"This Field is required..."} />
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row className='justify-content-center '>
          <Col md={4} sm={12}>
            <FormGroup>
              <Label>Phone</Label>
              <input
                {...register("phone")}
                name='phone'
                type='text'
                className={`form-control ${errors.phone && "border-danger"}`}
              />
              {errors.phone && (
                <ErrorMessage message={"This Field is required..."} />
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row className='justify-content-center '>
          <Col md={4} sm={12}>
            <FormGroup>
              <Label>Date</Label>
              <input
                {...register("date")}
                name='date'
                type='date'
                className={`form-control ${errors.date && "border-danger"}`}
              />
              {errors.date && (
                <ErrorMessage message={"This Field is required..."} />
              )}
            </FormGroup>
          </Col>
        </Row>

        <Row className='justify-content-center '>
          <Col md={4} sm={12}>
            <FormGroup>
              <Label>Address</Label>
              <input
                {...register("address")}
                name='address'
                type='text'
                className={`form-control ${errors.address && "border-danger"}`}
              />
              {errors.address && (
                <ErrorMessage message={"This Field is required..."} />
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row className='justify-content-center '>
          <Col md={4} sm={12}>
            <FormGroup>
              <Label>Message</Label>
              <textarea
                cols='30'
                rows='6'
                {...register("message")}
                name='message'
                className={`form-control ${
                  errors.message && "border-danger"
                }`}></textarea>
              {errors.message && (
                <ErrorMessage message={"This Field is required..."} />
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row className='justify-content-center '>
          <Col md={4} sm={12}>
            <FormGroup>
              <Label>Gender</Label>
              <Controller
                control={control}
                name='gender'
                render={({ field: { name, value, onChange, onBlur } }) => (
                  <Select
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={genderOptions.find(
                      (option) => option.value === value,
                    )}
                    options={genderOptions}
                  />
                )}
              />
            </FormGroup>
          </Col>
        </Row>
        {fields.map(({ id }, index) => (
          <Row key={index} className='justify-content-center '>
            <Col md={4} sm={12}>
              <FormGroup>
                <Label>skill {index}</Label>
                <textarea
                  cols='30'
                  rows='6'
                  {...register(`skills.${index}.skill`)}
                  className='form-control'></textarea>
              </FormGroup>
            </Col>
          </Row>
        ))}
        <Row className='justify-content-center '>
          <Col md={8} sm={12} className='text-center'>
            <Button
              type='button'
              onClick={() => {
                append({ skill: "" });
              }}
              className='bg-primmary'>
              Add Skill
            </Button>
            <Button
              type='button'
              onClick={() => {
                onSelectChange();
              }}
              className='bg-primmary'>
              make it male
            </Button>
            <Button type='submit' className='bg-primmary'>
              Submit
            </Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
}

export default CustomForm;

const ErrorMessage = ({ message }) => {
  return (
    <p className='text-danger fw-light mt-2' style={{ fontSize: "12px" }}>
      <i className='bx bxs-danger'></i>
      {message}
    </p>
  );
};
