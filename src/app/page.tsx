'use client';

import Image from "next/image";
import clsx from "clsx";
import { ProductHttpService } from "@/requests/http/services/ProductHttpService";
import { Suspense, useEffect, useRef, useState } from "react";
import { redirect } from "next/navigation";
import {useProductStore} from "@/store";

export default function Home() {
	const { products, setProducts } = useProductStore();
	const [ loading, setLoading ] = useState(false);
	const ref = useRef<HTMLInputElement | null>(null);

	useEffect(()=> {
		setLoading((state) => !state);
		ProductHttpService.getProducts()
			.then(resp=> {
				setProducts(resp)
			})
			.finally(()=>setLoading(state => !state))
	},[setProducts])

	const handleSearch = () => {
		if (ref.current?.value) {
			redirect(`/products/search?q=${ref.current.value || ''}`);
		}
	}

	const formatPrice = ((price: number) => {
		const value = Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(price)

		const [integer, decimal] = value.split(',');
		return (
			<span>
				<span className="text-2xl font-bold text-gray-900">{integer}</span>
				{decimal && <span className="text-sm text-gray-500">,{decimal}</span>}
			</span>
		)
	})

	if(!loading && !products.length) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gray-100">
				<div className="text-gray-500">Nenhum Produto Encontrado</div>
			</div>
		)
	}

	return (
		<></>
	);
}
