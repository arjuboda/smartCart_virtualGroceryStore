import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = []; // Add a new array for filtered products
  searchQuery: string = ''; // Variable to hold search query
  selectedCategory: string = ''; // Variable to hold selected category
  categories: string[] = []; // Array to hold unique categories

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.getProductsFromAPI();
  }

  getProductsFromAPI() {
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.products = response.data;
          // console.log(this.products);
          // Initialize filteredProducts with all products initially
          this.filteredProducts = this.products;
          this.getUniqueCategories(); // Get unique categories
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  viewProduct(productId: number) {
    this.router.navigate(['/product-view', productId]);
  }

  searchProducts() {
    console.log(this.searchQuery);
    console.log(this.filteredProducts);
    if (!this.searchQuery) {
      this.filteredProducts = this.products; // If search query is empty, display all products
    } else {
      // Filter products based on product name
      this.filteredProducts = this.products.filter(product =>
        product.attributes.product_name.toLowerCase().includes
          (this.searchQuery.toLowerCase()) || product.attributes.category.data.attributes.category_name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      if (this.filteredProducts.length < 1) {
        alert('products not found!');
        this.filteredProducts = this.products;
      }
    }
    if (this.selectedCategory) {
      this.filteredProducts = this.filteredProducts.filter(product =>
        product.attributes.category.data.attributes.category_name.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }
  }

  filterByCategory() {
    // If a category is selected, filter products by category
    if (this.selectedCategory) {
      this.filteredProducts = this.products.filter(product =>
        product.attributes.category.data.attributes.category_name.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    } else {
      // If no category is selected, display all products
      this.filteredProducts = this.products;
    }
  }

  getUniqueCategories() {
    // Extract unique categories from products
    this.categories = this.products.map(product =>
      product.attributes.category.data.attributes.category_name.toLowerCase()
    ).filter((value, index, self) => self.indexOf(value) === index);
  }
}
