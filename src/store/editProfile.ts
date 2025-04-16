import { create } from "zustand";

type DataType = {
    isOpen: boolean
    view: string | null
    [key: string]: unknown
}


type StoreType= {
    data: DataType;
    openDrawer: (view:string)=> void;
    closeDrawer: ()=> void;
}

export const useEditProfile= create<StoreType>(set=>({
    data: {
        isOpen: false,
        view: ""
    },
    openDrawer:(view)=>set((state)=>({data: {...state.data, view, isOpen: true}})),
closeDrawer:()=>set((state)=>({data: {...state.data, isOpen: false}})),

}))