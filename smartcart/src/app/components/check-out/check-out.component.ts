import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.interface';
import { Router } from '@angular/router';

interface CartItem {
  attributes: {
    product: {
      data: {
        attributes: {
          product_name: string;
          price: number;
        };
      };
    };
    quantity: number;
  };
}

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  user: User = { id: 0, email: '', username: '', mobile_number: 0 };
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  savedAmount: number = 0;
  grandTotal: number = 0;
  tax_amount: number = 0;
  GSTPercentage: number = 18;
  modalOpen: boolean = false;
  customerName: string = "";
  shippingAddress: string = "";
  mobileNumber: string = "";
  userId = localStorage.getItem('user_id');

  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token')?.replace(/"/g, '');
    if (token) {
      this.cartService.setAuthorizationHeader(token);
      this.orderService.setAuthorizationHeader(token);
      this.userService.setAuthorizationHeader(token);
    } else {
      console.error('No token found in local storage');
    }
    this.getCartProducts();
  }


  getCartProducts() {
    this.cartService.getCart_data().subscribe({
      next: (res: any) => {
        this.cartItems = res.data.map((item: any) => ({
          attributes: {
            product: {
              data: {
                attributes: {
                  product_name: item.attributes.product.data.attributes.product_name,
                  price: item.attributes.product.data.attributes.price
                }
              }
            },
            quantity: item.attributes.quantity
          }
        }));
        this.calculateTotalPrice();
      },
      error: (err: any) => {
        console.error('Error fetching user details:', err);
      }
    });
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + (item.attributes.product.data.attributes.price * item.attributes.quantity);
    }, 0);
    this.savedAmount = 10; // Example saved amount, replace with your logic
    this.grandTotal = this.totalPrice + (this.totalPrice * (this.GSTPercentage / 100));
    this.tax_amount = parseFloat((this.totalPrice * (this.GSTPercentage / 100)).toFixed(2));
  }

  openModal() {
    if (this.userId) {
      this.userService.getUserDetails().subscribe({
        next: (user: any) => {
          this.customerName = user.username;
          this.mobileNumber = user.mobile_number;
          // this.shippingAddress = user.address; // Fill the shipping address from user details
          this.modalOpen = true;
        },
        error: (error: any) => {
          console.error('Error retrieving user details:', error);
        }
      });
    } else {
      console.error('User ID not found in local storage');
    }
  }


  closeModal() {
    this.modalOpen = false;
  }

  placeOrder() {
    const orderDate = new Date().toISOString();

    const orderData = {
      data: {
        // order_id: '${userId}',
        order_status: 'Placed,',
        order_date: orderDate,
        tax_amount: this.tax_amount,
        total_amount: this.totalPrice,
        payable_amount: this.grandTotal,
        customer_name: this.customerName,
        shipping_address: this.shippingAddress,
        mobile_number: this.mobileNumber,
        order_items: this.cartItems.map(item => ({
          product_name: item.attributes.product.data.attributes.product_name,
          quantity: item.attributes.quantity,
          price: item.attributes.product.data.attributes.price
        })),
        user_detail: this.userId,
      }
    };

    this.orderService.placeOrder(orderData).subscribe({
      next: (response) => {
        console.log('Order placed successfully:', response);
        alert('Your order placed!');
        this.router.navigate(['/home']);

      },
      error: (error) => {
        console.error('Error placing order:', error);
      },
    });
  }
}
