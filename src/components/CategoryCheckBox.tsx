import { useFormikContext } from "formik";
import { Categories, isIterable } from "../utils/types";

const CategoryCheckBox = (props: any) => {
  const {
    values: { applicable_items, categories },
    setFieldValue,
  }: {
    values: {
      applicable_items: number[],
      categories: Categories
    },
    setFieldValue: Function
  } = useFormikContext<{
    applicable_items: number[],
    categories: Categories
  }>();

  const handleCategoryCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = categories[props.name]
    if (e.target.checked) {
      // Add Items by category
      if (isIterable(category)) {
        setFieldValue("applicable_items", [...applicable_items, ...category?.map((v: any) => `${v.id}`)].filter((v, i, self) => self.indexOf(v) === i));

      }
    } else {
      // Remove items by category
      const new_items: number[] = []
      applicable_items.forEach((v: number, i: number) => {
        if (isIterable(category) ? (category?.map((v: any) => v.id).indexOf(v * 1) < 0) : false) {
          new_items.push(v)
        }
      })
      setFieldValue("applicable_items", new_items);
    }
  }

  return (
    <input {...props} onChange={handleCategoryCheck} />
  );
};

export default CategoryCheckBox;