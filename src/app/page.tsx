'use server';

import Image from "next/image";

export default async function Home() {
    const response = await fetch('http://localhost:8079/products')
    const products = await response.json();

    const responseImages = await fetch('https://dummyimage.com/600x400/cccccc/000000&text=')
    const images = await responseImages.json();


    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <div>
                <Image src={images} alt={""} />
                <>{JSON.stringify(products, null, 2) }</>
            </div>
        </div>
    );
}
