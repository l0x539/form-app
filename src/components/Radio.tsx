import { useFormikContext } from "formik";

const Radio = (props: any) => {
    const {
        values: { categories, applicable_items, applied_to },
        touched,
        setFieldValue,
        setFieldTouched
    }: any = useFormikContext();

    const handleRadioChange = (e: any) => {
        if (
            touched.applicable_items
        ) {
            setFieldValue("applied_to", "some");
            setFieldTouched({ applicable_items: false })
        }
        if (
            props.value === "all"
        ) {
            setFieldValue("applied_to", "all");

            // Select all items
            setFieldValue("applicable_items", [].concat(...Object.keys(categories).map((v, i) => categories[v])).map((v: any) => `${v.id}`));
        } else {
            setFieldValue("applied_to", "some");

        }

    }


    return (
        <>
            <input {...props} onChange={handleRadioChange} />
        </>
    );
};

export default Radio;