export interface Product {
  id: number;
  name: string;
  descriptions: string;
  price: number;
  availableSince: Date; 
  isActive: boolean;
  categoryId: number;
  productImages: ProductImages[];
}

export interface ProductImages {
  id: number;
  base64Image: string;
  mime: string;
  imageName: string;
  productId: number;
}


export interface ProductWishlist extends Product {
  wishlistId:number;
}
