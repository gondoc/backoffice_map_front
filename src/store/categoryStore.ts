import {create} from "zustand";
import {ICategory} from "@type/categories.types";

const INIT_REGISTER_FORM: ICategory = {isShow: false, nm: "", content: ""};

interface IStates {
    registerForm: ICategory;

    actions: {
        setRegisterForm: (args: ICategory) => void;
        initRegisterForm: () => void;
    }
}

const initialState: Omit<IStates, "actions"> = {
    registerForm: INIT_REGISTER_FORM,
}

export const useCategoryStore = create<IStates>((set) => ({
    ...initialState,
    actions: {
        setRegisterForm: (args: ICategory) => set({registerForm: args}),
        initRegisterForm: () => set({registerForm: INIT_REGISTER_FORM}),
    },
}))

export const useCategoryStoreActions = () => useCategoryStore(state => state.actions);