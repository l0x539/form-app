import { Component } from "react";
import {
  Formik,
  Field,
  Form,
  FieldArray
} from "formik";
import * as yup from "yup";

import Radio from "./Radio";
import SimpleSearch from "./SimpleSearch";
import CategoryCheckBox from "./CategoryCheckBox";
import { Categories, Payload } from "../utils/types";
import RadioSelect from "./RadioSelect";
import CategoryItemSelect from "./CategoryItemSelect";

const validationSchema = yup.object({
  name: yup
    .string()
    .required()
    .max(64),
  rate: yup
    .number()
    .required()
    .min(0)
    .max(100)
  ,
  applicable_items: yup.array().min(1, "Please Chose atleast one Item."),
});

interface Props {
  categories: Categories,
  toggleForm: () => void,
  handleSubmit: (payload: Payload) => void,
}

export default class FormApp extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.state = {

    }
  }
  render() {
    const { categories, toggleForm, handleSubmit }: Props = this.props;
    return (
      <div className="form">
        <Formik
          validateOnChange={true}
          initialValues={{
            name: "",
            applied_to: "",
            rate: 0.0,
            applicable_items: [],
            search: '',
            categories
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            const payload = {
              name: data.name,
              applied_to: data.applied_to,
              rate: data.rate,
              applicable_items: data.applicable_items.map((v: string) => parseInt(v))
            }
            alert(JSON.stringify({ "mockRestHook": payload }, null, 2))
            handleSubmit(payload)
            // create({}, new FormData(payload))
            setSubmitting(false);
          }}
        >
          {({ values, errors, isSubmitting, touched }: any) => (
            <Form>
              <div className="form-head">
                <div className="form-header">
                  <h2 className="form-title">Add Tax</h2>
                  <div className="form-close" onClick={toggleForm}>{'✕'}</div>
                </div>
                <div className="row">
                  <Field
                    placeholder="Tax Name"
                    name="name"
                    type="input"
                    className={`form-text ${errors.name && touched.name ? 'error' : ""}`}
                  />
                  <label className="form-number">
                    <Field
                      placeholder="Rate"
                      name="rate"
                      type="number"
                      min={0}
                      max={100}
                      step={0.1}
                      className={`form-number ${errors.rate && touched.rate ? 'error' : ""}`}
                    />
                  </label>
                </div>
                {(errors.name && touched.name) || (errors.rate && touched.rate) ?
                  <>
                    <div className="error-text">
                      {errors.name}
                    </div>
                    <div className="error-text">
                      {errors.rate}
                    </div>
                  </>
                  : null
                }
                <div className="row radio">
                  <RadioSelect selections={[
                    {title: 'Apply to all items in collection',name: "applied_to", value: "all"},
                    {title: 'Apply to specific items', name: "applied_to", value: "some"},
                  ]} />
                  {(errors.applied_to && touched.applied_to) ?
                    <>
                      <div className="error-text">
                        {errors.applied_to}
                      </div>
                    </>
                    : null
                  }
                </div>
              </div>
              <div className="divider"></div>
              <div className="form-body">
                <div className="row">
                  {values.applied_to !== 'some' ? null : <SimpleSearch
                    placeholder="Search Items"
                    name="search"
                    type="input"
                    className="search-items"
                  />}
                </div>
                <FieldArray name="categories">
                  {({ arrayHelpers }: any) => {

                    return (
                      <CategoryItemSelect values={values} categories={categories}  />
                    )
                  }}
                </FieldArray>
                {(errors.applicable_items && touched.applicable_items) ?
                  <>
                    <div className="error-text">
                      {errors.applicable_items}
                    </div>
                  </>
                  : null
                }
              </div>
              <div className="divider"></div>
              <div className="form-footer">
                <button className="button" disabled={isSubmitting || values.applicable_items.length === 0 || Object.keys(errors).length} type="submit">
                  {`Apply tax to ${values.applicable_items.length} item(s)`}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    )
  }
}