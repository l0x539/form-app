import { Field } from "formik"
import { Categories, FormValues, isIterable } from "../utils/types"
import CategoryCheckBox from "./CategoryCheckBox"

const CategoryItemSelect = ({ values, categories }: { values: FormValues, categories: Categories }) => {
    return (
        <div className="all-items">
            {values.applied_to !== 'some' ? null : Object.keys(values.search.trim() !== '' ? values.searched : categories).map((category, index) => {
                const items = values.search.trim() !== '' ? values.searched : categories
                const _category = items[category]
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
                        {isIterable(_category) ? _category.map((item: any, index: number) => {
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
}


export default CategoryItemSelect;