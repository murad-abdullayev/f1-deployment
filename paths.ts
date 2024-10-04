export const paths = {
  home: "/",
  products: "/products",
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
  },
  dashboard: {
    overview: "/dashboard",
    account: "/dashboard/account",
    categories: "/dashboard/categories",
    products: "/dashboard/products",
    integrations: "/dashboard/integrations",
    settings: "/dashboard/settings",
  },
  errors: { notFound: "/errors/not-found" },
} as const;
