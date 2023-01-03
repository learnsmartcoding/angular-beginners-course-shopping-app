export interface EnvironmentConfiguration {
    env_name: string;
    production: boolean;
    apiUrl: string;    
    apiEndpoints: {        
        category: string,
        product: string,
        wishlist: string,
        owner: string,
        users: string
    },
    cacheTimeInMinutes: number;
}