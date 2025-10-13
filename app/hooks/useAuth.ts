// import { useEffect, useState } from "react";

// export const useAuth = () => {
//   const [token, setToken] = useState<string | null>(null);

//   useEffect(() => {
//     fetch("/api/me", { credentials: "include" })
//       .then((res) => {
//         if (!res.ok) throw new Error("Not authenticated");
//         return res.json();
//       })
//       .then((data) => {
//         setToken(data.token);
//       })
//       .catch(() => {
//         setToken(null);
//       });
//   }, []);

//   return { token };
// };
