export const environment = {
    baseUrl: 'http://localhost:1337/',
    login: 'api/auth/local',
    register: 'api/auth/local/register',
    user_detail: 'api/users/me?populate[0]=user_addresses&populate[1]=user_addresses.city',
    update_user: 'api/users',
    product_detail: 'api/products?pagination[page]=1&pagination[pageSize]=100&populate[category][fields][0]=category_name&populate[product_image][fields][1]=url&populate[wish_lists][fields][2]=id&filters[product_name][$containsi][0]=',
    product_by_id: 'api/products/id',
    product_to_cart: 'api/carts',
    add_product_to_wishlist: 'api/wish-lists',
    get_wishlist_products: 'api/wish-lists?populate=product,user_detail',
    get_cart_products: 'api/carts?populate=product,user_detail',
    order_url: 'api/orders'
};
