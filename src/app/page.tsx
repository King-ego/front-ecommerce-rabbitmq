'use server';

import Image from "next/image";
import ApiRequest from "@/requests/api";

export default async function Home() {
    const products = await ApiRequest<{id: string, name: string}[]>('/products', {
        cache: 'force-cache',
        next: { revalidate: 600 },
        headers: {
            'Content-Type': 'application/json'
        },
    })


    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
           <main>
               {products?.map((product) =>
                   <div key={product.id}>
                     <Image src={`https://dummyimage.com/600x400/cccccc/000000&text=`} alt={`Product`} width={300} height={200} />
                     <p>{product.name}</p>
                   </div>
               )}
           </main>

            {/*<div>
                <Image src='https://dummyimage.com/600x400/cccccc/000000&text=' alt={""} width={300} height={300} />
                <>{JSON.stringify(products, null, 2) }</>
            </div>*/}
        </div>
    );
}
