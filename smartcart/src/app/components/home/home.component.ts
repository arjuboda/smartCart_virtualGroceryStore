import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products = [
    {
      name: 'Product 1',
      id: 1,
      description: 'Description of Product 1',
      imageUrl: 'product1.jpg',
      price: 19.99,
      features: ['Feature 1', 'Feature 2', 'Feature 3']
    },
    {
      name: 'Product 2',
      id: 2,
      description: 'Description of Product 2',
      imageUrl: 'product2.jpg',
      price: 24.99,
      features: ['Feature A', 'Feature B', 'Feature C']
    },
    {
      name: 'Product 3',
      id: 3,
      description: 'Description of Product 3',
      imageUrl: 'product3.jpg',
      price: 14.99,
      features: ['Feature X', 'Feature Y', 'Feature Z', 'Feature w']
    },
    {
      name: 'Product 4',
      id: 4,
      description: 'Description of Product 4',
      imageUrl: 'product4.jpg',
      price: 69.99,
      features: ['Feature i', 'Feature ii']
    },
    {
      name: 'Product 3',
      id: 3,
      description: 'Description of Product 3',
      imageUrl: 'product3.jpg',
      price: 14.99,
      features: ['Feature X', 'Feature Y', 'Feature Z', 'Feature w']
    },
    {
      name: 'Product 4',
      id: 4,
      description: 'Description of Product 4',
      imageUrl: 'product4.jpg',
      price: 69.99,
      features: ['Feature i', 'Feature ii']
    }
  ];

  addToCart(product: any) {
    console.log('Product added to cart:', product);
  }

  addToWishlist(product: any) {
    console.log('Product added to wishlist:', product);
  }
  constructor(private router: Router) { }
  viewProduct(productId: number) {
    // Navigate to ProductViewComponent and pass the product ID and products array
    this.router.navigate(['/product-view', productId], { state: { products: this.products } });
  }
}


// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent {

// }
