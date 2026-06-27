export const authFetch = async (url: string, options: any = {}) => {
    const token = localStorage.getItem('lumenary_token');
    const headers = { ...options.headers, 'Authorization': `Bearer ${token}` };
    
    const res = await fetch(url, { ...options, headers });

    if (res.status === 401) {
        localStorage.clear();
        window.location.href = '/login'; // Force reload ke login
    }
    
    return res;
};