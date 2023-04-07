import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    cart: Product[] = [];
    constructor() {
        if (typeof localStorage !== 'undefined') {
            const data = localStorage.getItem('cart');

            if (data) {
                this.cart = JSON.parse(data);
            }
        } else {
            // Local storage is not supported
            console.log('Local storage is not supported');
        }
    }

    addToCart(product: Product) {
        this.cart.push(product);
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    removeFromCart(productId: number) {
        
        this.cart = this.cart.filter(f => f.id != productId);
    }

    clearCart() {
        this.cart = [];
        localStorage.removeItem('cart');
    }

    getAllFromCart(): Product[] {
        return this.cart;
    }
}