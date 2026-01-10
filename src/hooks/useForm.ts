import { useEffect, useState, type ChangeEvent } from "react";

interface UseFormProps<T> {
    initialValue: T,
    validate: (values: T) => Record<keyof T, string> | undefined;
}

function useForm<T> ({initialValue, validate}: UseFormProps<T>) {
    const [values, setValues] = useState(initialValue);
    const [errors, setErrors] = useState<Record<string, string>>();

    //시용자가 입력값을 바꿀 때 실행되는 함수
    const handleChange = (id: keyof T, text: string) => {
        setValues({
            ...values,  //불변성 유지(기존 값 유지)
            [id]: text,
        });
    };


    const getInputProps = (id: keyof T) => {
        const value = values[id];

        const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => handleChange(id, e.target.value);


        return {value, onChange};
    };

    useEffect(() => {
        const newErrors = validate(values);
        setErrors(newErrors);
    }, [validate, values]);

    return { values, errors, getInputProps };
}

export default useForm;