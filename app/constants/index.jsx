import pizza1 from "../../public/assets/pizza/pizza-1.png";
import pizza2 from "../../public/assets/pizza/pizza-2.png";
import rice1 from "../../public/assets/biriyani/r1.png";
import burger from "../../public/assets/images/burger.png";

export const menu = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/menu",
    label: "Menu",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

export const adminLinks = [
  {
    href: "/dashboard",
    label: "Overview",
  },
  {
    href: "/dashboard/header",
    label: "header",
  },
  {
    href: "/dashboard/categories",
    label: "categories",
  },
  {
    href: "/dashboard/menu",
    label: "menu",
  },
  {
    href: "/dashboard/orders",
    label: "orders",
  },
  {
    href: "/dashboard/users",
    label: "users",
  },
];

export const headerPizza = [
  {
    name: "lazania",
    image: pizza1,
  },
  {
    name: "Arabic",
    image: burger,
  },
  {
    name: "rajistani",
    image: rice1,
  },
];

export const products = [
  {
    name: "pizza deal",
    description: "2 medium pizza , 1 chicken shuwarma , 1 half ltr cold drink",
    deal: true,
    featured: false,
    image: pizza1,
    qty: 10,
    price: 1600,
    category: "deal",
  },
  {
    name: "pizza deal",
    description: "2 medium pizza , 1 chicken shuwarma , 1 half ltr cold drink",
    deal: true,
    featured: false,
    image: pizza2,
    qty: 10,
    price: 1600,
    category: "deal",
  },
  {
    name: "pizza deal",
    description: "2 medium pizza , 1 chicken shuwarma , 1 half ltr cold drink",
    deal: true,
    featured: false,
    image: pizza1,
    qty: 10,
    price: 1600,
    category: "deal",
  },
  {
    name: "pizza ",
    description: "2 medium pizza , 1 chicken shuwarma , 1 half ltr cold drink",
    deal: true,
    featured: false,
    image: pizza2,
    qty: 10,
    price: 1600,
    category: "deal",
  },
  {
    name: "burger",
    description: "2 medium pizza , 1 chicken shuwarma , 1 half ltr cold drink",
    deal: true,
    featured: false,
    image: pizza2,
    qty: 10,
    price: 1600,
    category: "deal",
  },
  {
    name: "pizza deal",
    description: "2 medium pizza , 1 chicken shuwarma , 1 half ltr cold drink",
    deal: true,
    featured: false,
    image: pizza2,
    qty: 10,
    price: 1600,
    category: "deal",
  },
  {
    name: "pizza deal",
    description: "2 medium pizza , 1 chicken shuwarma , 1 half ltr cold drink",
    deal: false,
    featured: true,
    image: pizza2,
    qty: 10,
    price: 1600,
    category: "deal",
  },
  {
    name: "pizza deal",
    description: "2 medium pizza , 1 chicken shuwarma , 1 half ltr cold drink",
    deal: false,
    featured: true,
    image: pizza2,
    qty: 10,
    price: 1600,
    category: "shuwarma",
  },
];
