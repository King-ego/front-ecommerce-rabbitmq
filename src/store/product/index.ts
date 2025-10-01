import { create } from "zustand";
import { ProductState } from "./type"
import { createProductSlice } from "./actions";

export const useProductStore = create<ProductState>()((...arg) => ({
	...createProductSlice(...arg),
}));
