import { useEffect, useState, type ChangeEvent } from "react";

interface UseFormProps<T> {
    initialValue: T,
    validate: (values: T) => Record<keyof T, string> | undefined;
}

function useForm<T> ({initialValue, validate}: UseFormProps<T>) {
    const [values, setValues] = useState(initialValue);
    const [touched, setTouched] = useState<Record<string, boolean>>();
    const [errors, setErrors] = useState<Record<string, string>>();

    //시용자가 입력값을 바꿀 때 실행되는 함수
    const handleChange = (id: keyof T, text: string) => {
        setValues({
            ...values,
            [id]: text,
        });
    };

    const handleBlur = (name: keyof T) => {
        setTouched({
            ...touched,
            [name]: true,
        })
    }


    const getInputProps = (id: keyof T) => {
        const value = values[id];

        const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => handleChange(id, e.target.value);

        const onBlur = () => handleBlur(id);

        return {value, onChange, onBlur};
    };

    useEffect(() => {
        const newErrors = validate(values);
        setErrors(newErrors);
    }, [validate, values]);

    return { values, errors, touched, getInputProps };
}

export default useForm;