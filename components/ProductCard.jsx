import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { getDiscountPricePrasentage } from '@/Utils/helper';
const ProductCard = ({product}) => {
 const {name,price,original_price,slug,thumbnail} =product.attributes
    return (
        <Link className='transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer' href={`/product/${slug}`}>
           <Image 
           width={500}
           height={500}
           src={thumbnail?.data?.attributes?.url}
           alt={name}
           />
            <div className='p-4 text-black/[0.9]'>
                <h2 className='text-lg font-medium '>{name}</h2>
                <div className='flex text-black/[0.5] items-center'>
                    <p className='mr-2 text-lg font-semibold'>$ {price}</p>
                    { original_price && (
                       <>
                        <p className='text-base font-medium line-through'>${original_price}</p>
                        <p className='ml-auto text-base font-medium text-green-500'>{getDiscountPricePrasentage (original_price,price)} % off</p>
                       </>
                    )
                    }
                </div>

            </div>
        </Link>
    );
};

export default ProductCard;