export const getDiscountPricePrasentage =(originalPrice, discountPrice)=>{
    const discount = originalPrice - discountPrice ;
    const discountParsentage = (discount / originalPrice) * 100;

    return discountParsentage.toFixed(2)
}