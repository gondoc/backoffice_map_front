import {create} from "zustand";
import {IDialogStatus, ILabelValueStatus, ToastState} from "@type/common.types";

const INIT_DIALOG_STATUS: IDialogStatus = {isOpen: false, status: "none", title: "", msg: "", isJustConfirm: false}
export const INIT_NAV: ILabelValueStatus = {value: 0, label: "요약", status: "none"}

interface IStates {
    currentNav: ILabelValueStatus;
    toastStatus: ToastState,
    dialogStatus: IDialogStatus,
    searchWord: string;

    actions: {
        setCurrentNav: (args: ILabelValueStatus) => void;
        setToastStatus: (arg: ToastState) => void;
        setDialogStatus: (arg: IDialogStatus) => void;
        initDialogStatus: () => void;
        setSearchWord: (arg: string) => void;
    }
}

const initialState: Omit<IStates, "actions"> = {
    currentNav: INIT_NAV,
    toastStatus: {status: "none", msg: ""},
    dialogStatus: INIT_DIALOG_STATUS,
    searchWord: "",
}

const useViewStore = create<IStates>((set) => ({
    ...initialState,
    actions: {
        setCurrentNav: (args: ILabelValueStatus) => set({currentNav: args}),
        setToastStatus: (arg: ToastState) => set(() => ({toastStatus: arg})),
        setDialogStatus: (arg: IDialogStatus) => set(() => ({dialogStatus: arg})),
        initDialogStatus: () => set((state) => ({dialogStatus: {...state.dialogStatus, isOpen: false}})),
        setSearchWord: (arg: string) => set(() => ({searchWord: arg})),
    },
}))

export default useViewStore

export const useViewStoreActions = () => useViewStore(state => state.actions);