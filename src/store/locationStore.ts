import {create} from "zustand";
import {ICoordinateIcon, IRegisterForm} from "@type/location.types";

const INIT_REGISTER_FORM: IRegisterForm = {name: "", x: "", y: "", file: undefined, fileName: undefined, isShow: false};

interface IStates {
    registerForm: IRegisterForm;
    activeLocation: IRegisterForm | null;
    coordinateIcon: ICoordinateIcon;

    actions: {
        setRegisterForm: (args: IRegisterForm) => void;
        setActiveLocation: (args: IRegisterForm | null) => void;
        setCoordinateIcon: (args: ICoordinateIcon) => void;
        resetRegisterForm: () => void;
        modifyForm: (args: IRegisterForm) => void;
    }
}

const initialState: Omit<IStates, "actions"> = {
    registerForm: INIT_REGISTER_FORM,
    activeLocation: null,
    coordinateIcon: {isActive: false, x: "", y: ""},
}

export const useLocationStore = create<IStates>((set) => ({
    ...initialState,
    actions: {
        setRegisterForm: (args: IRegisterForm) => set({registerForm: args}),
        setActiveLocation: (args: IRegisterForm | null) => set({activeLocation: args}),
        setCoordinateIcon: (args: ICoordinateIcon) => set({coordinateIcon: args}),
        resetRegisterForm: () => set({registerForm: INIT_REGISTER_FORM, coordinateIcon: {isActive: false, x: "", y: ""}}),
        modifyForm: (args: IRegisterForm) => set((state) => ({
            ...state,
            activeLocation: {id: args.id, name: args.name, x: args.x, y: args.y, file: args.file, fileName: args.fileName, isShow: true},
            coordinateIcon: {isActive: true, x: args.x, y: args.y},
            registerForm: {id: args.id, name: args.name, x: args.x, y: args.y, file: args.file, fileName: args.fileName, isShow: true},
        })),
    },
}))

export const useLocationStoreActions = () => useLocationStore(state => state.actions);