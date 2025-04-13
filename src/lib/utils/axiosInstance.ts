import axios from "axios";


// const baseURL = process.env.NEXT_PUBLIC_PAYSIT_SERVER_BASE_URL
const baseURL = "https://paysitng.onrender.com/"


// export const http = axios.create({baseURL: "https://p4clf7zf-8000.uks1.devtunnels.ms/"})
export const http = axios.create({baseURL})

http.interceptors.request.use((req) => {
    // Get the token dynamically on each request
    const session:string |null = localStorage.getItem("paysit-auth-session");
    const token = session ? JSON.parse(session)?.state?.token?.access : null;

    if (token) {
      req.headers["Authorization"] = `Bearer ${token}`|| "";
    }
    // req.headers['Content-type'] = 'application/json';
    // req.headers['Accept'] = 'application/json';
    return req;
  });