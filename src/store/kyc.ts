
import { create } from 'zustand';


type DataType = {
    currentStep: number
}
type StoreType = {
    data: DataType,
    changeStep:(step: number)=>void;
    onPrev: ()=>void;
    onNext: ()=>void;
}

const initialValues= {
    currentStep: 0,
}

export const usekYCStore= create<StoreType>()((set, get)=>({
    data: initialValues,
    changeStep: (step)=> set((state: { data: DataType; })=>({data: {...state.data, step}})),
    onPrev: ()=>set((state)=>({data: {...state.data, currentStep: state.data.currentStep < 1 ? 0 : get().data.currentStep-1}})),
    onNext: ()=>set((state)=>({data: {...state.data, currentStep: get().data.currentStep+1}}))
}))