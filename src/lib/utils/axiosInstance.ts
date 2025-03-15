import axios from "axios";


export const http = axios.create({baseURL: "http://127.0.0.1:8000"})

http.interceptors.request.use((req) => {
    // Get the token dynamically on each request
    const session = localStorage.getItem('paysit-auth-session');
    const token = session ? JSON.parse(session)?.state?.userData?.token : null;
  
    req.headers['token'] = token || '';
    req.headers['Content-type'] = 'application/json';
    req.headers['Accept'] = 'application/json';
    return req;
  });