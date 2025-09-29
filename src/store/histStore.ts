import {create} from "zustand";
import {IHistory, IHistRegisterForm} from "@type/hist.types";

const INIT_REGISTER_FORM: IHistRegisterForm = {
    histNm: "",
    siteId: "",
    siteNm: "",
    cateId: "",
    cateNm: "",
    staffCnt: "",
    isShow: false,
    status: "add",
};

interface IStates {
    registerForm: IHistRegisterForm;

    actions: {
        setRegisterForm: (args: IHistRegisterForm) => void;
        resetRegisterForm: () => void;
        modRegisterForm: (args: { item: IHistory, cateId: string }) => void;
    }
}

const initialState: Omit<IStates, "actions"> = {
    registerForm: INIT_REGISTER_FORM,
}

export const useHistStore = create<IStates>((set) => ({
    ...initialState,
    actions: {
        setRegisterForm: (args: IHistRegisterForm) => set({registerForm: args}),
        resetRegisterForm: () => set({registerForm: INIT_REGISTER_FORM}),
        modRegisterForm: ({item, cateId}) => set({
            registerForm: {
                id: item.id,
                histNm: item.histNm,
                siteId: item.siteId,
                siteNm: item.siteNm,
                cateId: cateId,
                cateNm: item.categoryNm,
                staffCnt: item.staffCnt,
                isShow: true,
                status: "mod",
                startDtm: item.startDtm,
                endDtm: item.endDtm,
            }
        })
    },
}))

export const useHistStoreActions = () => useHistStore(state => state.actions);