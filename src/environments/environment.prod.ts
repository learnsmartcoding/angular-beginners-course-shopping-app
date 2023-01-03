import { EnvironmentConfiguration } from "src/app/models/environment-configuration";

// The list of file replacements can be found in `angular.json`.
export const environment: EnvironmentConfiguration = {
  env_name: 'dev',
  production: true,
  apiUrl: 'https://essentialproducts-api.azurewebsites.net/api', //'https://localhost:5001/api',
  apiEndpoints: {
    category: 'category',
    product: 'product',
    wishlist: 'Wishlist',
    owner: 'owner',
    users:'users'
  },
  cacheTimeInMinutes: 30,
};