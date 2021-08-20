import { useFormikContext, useField } from "formik";

const searchItems = (categories: any, search: string, searched: any): any => {

    let results: any = {};
    Object.keys(categories).forEach((category) => {
      categories[category]?.forEach((item: any) => {
  
        if (item.name?.toLowerCase().includes(search) && !(results[category]?.reduce((v: any) => v.id === item.id).length > 0))
          results[item.category ? item.category.name : "empty"] = results[item.category ? item.category.name : "empty"] ? [...results[item.category ? item.category.name : "empty"], item] : [item]
      })
      if (category.toLowerCase().includes(search.toLowerCase())) {
  
        results[category] = categories[category];
      }
  
    })
  
  
    return results;
  }
  
  const SimpleSearch = (props: any) => {
    const {
      values: { categories, searched },
      setFieldValue
    }: any = useFormikContext();
    const [field, meta] = useField(props);
    const handleSearch = (e: any) => {
      setFieldValue("search", e.target.value);
      setFieldValue("searched", searchItems(categories, e.target.value, searched));
    }
  
    return (
      <label className="search">
        <input {...props} {...field} onChange={handleSearch} />
      </label>
    );
  };

export default SimpleSearch;