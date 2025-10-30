const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

class ApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            throw new ApiError(response.status, `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(0, `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export const api = {
    // Product endpoints
    products: {
        getAll: () => apiRequest<any[]>('/products'),
        seed: () => apiRequest<any[]>('/products/seed'),
    },

    // Cart endpoints
    cart: {
        get: () => apiRequest<any[]>('/cart'),
        add: (productId: string, quantity: number = 1) =>
            apiRequest('/cart', {
                method: 'POST',
                body: JSON.stringify({ productId, quantity }),
            }),
        remove: (productId: string) =>
            apiRequest(`/cart/${productId}`, {
                method: 'DELETE',
            }),
    },

    // Checkout endpoints
    checkout: {
        process: (orderData: any) =>
            apiRequest('/checkout', {
                method: 'POST',
                body: JSON.stringify(orderData),
            }),
    },
};

export { ApiError };