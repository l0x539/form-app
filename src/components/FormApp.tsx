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
                  <div className="radio-select">
                    <label className="b-contain">
                      <span>{'Apply to all items in collection'}</span>
                      <Radio
                        name="applied_to"
                        type="radio"
                        value="all"
                      />
                      <div className="b-input radio"></div>
                    </label>
                  </div>
                  <div className="radio-select">
                    <label className="b-contain">
                      <span>{'Apply to specific items'}</span>
                      <Radio
                        name="applied_to"
                        type="radio"
                        value="some"
                      />
                      <div className="b-input radio"></div>
                    </label>
                  </div>
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
                      <div className="all-items">
                        {values.applied_to !== 'some' ? null : Object.keys(values.search.trim() !== '' ? values.searched : categories).map((category, index) => {
                          const items = values.search.trim() !== '' ? values.searched : categories

                          return (<div key={index}>
                            <div className="category">
                              <label className="b-contain">
                                <span className="item-name">
                                  {category === 'empty' ? null : category}
                                </span>
                                <CategoryCheckBox
                                  name={`${category}`}
                                  type="checkbox"
                                />
                                <div className="b-input"></div>
                              </label>
                            </div>
                            <div className="items-list">
                              {items[category] ? items[category].map((item: any, index: number) => {
                                return (
                                  <div key={index} className="item">
                                    <label className="b-contain">
                                      <span className="item-name">
                                        {item.name}
                                      </span>
                                      <Field
                                        name={`applicable_items`}
                                        type="checkbox"
                                        value={`${item.id}`}
                                      />
                                      <div className="b-input"></div>
                                    </label>

                                  </div>
                                )
                              }) : null}
                            </div>
                          </div>)
                        })}

                      </div>
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