const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8079";

async function ApiRequest<T>(endpoint: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, init);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export default ApiRequest;