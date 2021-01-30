const Home = () =>
  import(/* webpackChunkName: "vsf-home" */ 'theme/pages/Home');
const ErrorPage = () =>
  import(/* webpackChunkName: "vsf-error" */ 'theme/pages/Error');
const Product = () =>
  import(/* webpackChunkName: "vsf-product" */ 'theme/pages/Product');
const Category = () =>
  import(/* webpackChunkName: "vsf-category" */ 'theme/pages/Category');
const Checkout = () =>
  import(/* webpackChunkName: "vsf-checkout" */ 'theme/pages/Checkout');
const MyAccount = () =>
  import(/* webpackChunkName: "vsf-my-account" */ 'theme/pages/MyAccount');
const Static = () =>
  import(/* webpackChunkName: "vsf-static" */ 'theme/pages/Static');

let routes = [
  { name: 'home', path: '/', component: Home, alias: '/pwa.html', meta: { breadcrumb: 'Home' } },
  { name: 'checkout', path: '/checkout', component: Checkout, meta: { breadcrumb: 'Checkout' } },
  { name: 'legal', path: '/legal', component: Static, meta: { breadcrumb: 'Legal' } },
  { name: 'privacy', path: '/privacy', component: Static, meta: { breadcrumb: 'Privacy' } },
  { name: 'my-account', path: '/my-account', component: MyAccount, meta: { breadcrumb: 'My account' } },
  { name: 'about-us', path: '/about-us', component: Static, meta: { breadcrumb: 'About us' } },
  { name: 'customer-service', path: '/customer-service', component: Static, meta: { breadcrumb: 'Customer Service' } },
  { name: 'store-locator', path: '/store-locator', component: Static, meta: { breadcrumb: 'Store locator' } },
  { name: 'size-guide', path: '/size-guide', component: Static, meta: { breadcrumb: 'Size guide' } },
  { name: 'delivery', path: '/delivery', component: Static, meta: { breadcrumb: 'Delivery' } },
  { name: 'returns', path: '/returns', component: Static, meta: { breadcrumb: 'Returns' } },
  { name: 'contact', path: '/contact', component: Static, meta: { breadcrumb: 'Contact' } },
  { name: 'page-not-found', path: '*', component: ErrorPage, meta: { breadcrumb: 'Error' } },
  { name: 'error', path: '/error', component: ErrorPage, meta: { layout: 'minimal', breadcrumb: 'Error' } },
  { name: 'virtual-product', path: '/p/:parentSku/:slug', component: Product, meta: { breadcrumb: 'Virtual product' } },
  { name: 'bundle-product', path: '/p/:parentSku/:slug', component: Product, meta: { breadcrumb: 'Bundle product' } },
  { name: 'simple-product', path: '/p/:parentSku/:slug', component: Product, meta: { breadcrumb: 'Simple product' } },
  { name: 'downloadable-product', path: '/p/:parentSku/:slug', component: Product, meta: { breadcrumb: 'Downloadable product' } },
  { name: 'grouped-product', path: '/p/:parentSku/:slug', component: Product, meta: { breadcrumb: 'Grouped product' } },
  { name: 'configurable-product', path: '/p/:parentSku/:slug/:childSku', component: Product, meta: { breadcrumb: 'Configurable product' } },
  { name: 'product', path: '/p/:parentSku/:slug/:childSku', component: Product, meta: { breadcrumb: 'Product' } },
  { name: 'category', path: '/c/:slug', component: Category, meta: { breadcrumb: 'Category' } },
  { name: 'cms-page', path: '/i/:slug', component: Static, meta: { breadcrumb: 'CMS page' } }
];

export default routes;
