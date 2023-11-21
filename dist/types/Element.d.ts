export type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
export type FormElementProps<K extends string = string, V extends any = any> = {
    name?: K;
    onChange?: (value: V) => Promise<void> | void;
};
