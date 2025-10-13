'use client';

import {useState, useEffect} from 'react';
import { useRouter, useSearchParams, redirect } from 'next/navigation';
import {useProductStore} from "@/store";

export default function ProductManagement() {
	const { products } = useProductStore();
	const [searchQuery, setSearchQuery] = useState('');
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const query = searchParams.get('q') || '';
		if (!query) {
			redirect("/");
		}
		setSearchQuery(query);
	}, [searchParams]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		const params = new URLSearchParams();
		if (searchQuery.trim()) {
			params.set('q', searchQuery.trim());
		}
		router.push(`/products/search?${params.toString()}`);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-4xl mx-auto">
				{/* Cabeçalho */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Fitros de Produtos
					</h1>
					<p className="text-gray-600 mb-6">
						Gerencie todos os produtos do seu catálogo
					</p>

					{/* Input de busca */}
					<form onSubmit={handleSearch} className="mb-8" data-testid="search_form">
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<svg
									className="h-5 w-5 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</div>
							<input
								type="text"
								value={searchQuery}
								onChange={handleInputChange}
								placeholder="Pesquisar produtos por nome, categoria..."
								className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								data-testid="search_input"
								/>
						</div>
					</form>
				</div>

				{/* Lista de produtos */}
				<div className="space-y-6">
					{products.map((product, index) => (
						<div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
							{/* Categoria */}
							<div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
					product.quantity_in_stock < 1
						? 'bg-red-100 text-red-800'
						: 'bg-green-100 text-green-800'
				}`}>
                  {product.quantity_in_stock < 1 ? 'Sem estoque' : 'Em estoque'}
                </span>
								<span className="ml-2 text-sm text-gray-500">{product.category}</span>
							</div>

							{/* Nome do produto */}
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								{product.name}
							</h3>

							{/* Descrição */}
							<p className="text-gray-600 mb-4">
								{product.description}
							</p>

							{/* Preço e estoque */}
							<div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  {product.price}
                </span>
								<span className={`px-3 py-1 rounded-full text-sm font-medium ${
									product.quantity_in_stock > 0
										? 'bg-green-100 text-green-800'
										: 'bg-red-100 text-red-800'
								}`}>
                  {product.quantity_in_stock} em estoque
                </span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
