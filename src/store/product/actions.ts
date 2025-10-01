import { StateCreator } from "zustand";
import { ProductState } from "./type";

export const createProductSlice: StateCreator<ProductState> = (set) => ({
	products: [],
	addProduct: (product) =>
		set((state) => ({
			products: [...state.products, product],
		})),
	deleteProduct: (productId) =>
		set((state) => ({
			products: state.products.filter((p) => p.id !== productId),
		})),
});
