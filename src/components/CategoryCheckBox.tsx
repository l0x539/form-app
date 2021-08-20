import { useFormikContext } from "formik";

const CategoryCheckBox = (props: any) => {
    const {
      values: { applicable_items, categories },
      setFieldValue,
    }: any = useFormikContext();
  
    const handleCategoryCheck = (e: any) => {
  
      if (e.target.checked) {
        // Add Items by category
        setFieldValue("applicable_items", [...applicable_items, ...categories[props.name].map((v: any) => `${v.id}`)].filter((v, i, self) => self.indexOf(v) === i));
      } else {
        // Remove items by category
        const new_items: any = []
        applicable_items.forEach((v: any, i: number) => {
  
          if (categories[props.name].map((v: any) => v.id).indexOf(v * 1) < 0) {
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