"use client";
import { Box, Flex } from "@radix-ui/themes";
import Link from "next/link";
import classNames from "classnames";
import { usePathname, useRouter } from "next/navigation";
import { HiDocumentText } from "react-icons/hi";
import { useAuth } from "./AuthContext";
import apiClient from "./services/api-client";

const Navbar = () => {
  const { isAuthenticated, setAuthenticated } = useAuth();
  const currentPath = usePathname();
  const router = useRouter();
  const links = [
    { href: "/", label: "Home" },
    { href: "/add", label: "Add" },
  ];
  const handleLogout = async () => {
    try {
      const res = await apiClient("/auth/logout", {
        method: "POST",
      });
      if (res.status === 200) {
        setAuthenticated(false);
        router.push("/signin");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
    <nav className="border-b border-gray-300 mb-5 px-5 h-20">
      <Flex justify="between" align="center" className="h-full">
        {/* Left side */}
        <Flex align="center" gap="3">
          <Link href="/">
            <HiDocumentText size="2rem" />
          </Link>
          <ul className="flex space-x-6">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  className={classNames({
                    "text-white bg-zinc-500 py-1 px-2 rounded":
                      link.href === currentPath,
                    "nav-link": link.href !== currentPath,
                  })}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Flex>

        {/* Right side */}
        <Box>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="nav-link text-red-500 hover:text-red-700"
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/signin"
              className={
                currentPath === "/signin"
                  ? "text-white bg-zinc-500 py-1 px-2 rounded"
                  : "nav-link"
              }
            >
              Sign in
            </Link>
          )}
        </Box>
      </Flex>
    </nav>
  );
};

export default Navbar;

// import { useState } from "react";
// import { Menu, X } from "lucide-react"; // icons

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
//       {/* Logo */}
//       <h1 className="text-xl font-bold">MySite</h1>

//       {/* Desktop menu */}
//       <ul className="hidden md:flex space-x-6">
//         <li>
//           <a href="#" className="hover:text-gray-300">
//             Home
//           </a>
//         </li>
//         <li>
//           <a href="#" className="hover:text-gray-300">
//             About
//           </a>
//         </li>
//         <li>
//           <a href="#" className="hover:text-gray-300">
//             Contact
//           </a>
//         </li>
//       </ul>

//       {/* Mobile icon */}
//       <button
//         className="md:hidden"
//         onClick={() => setIsOpen(!isOpen)}
//         aria-label="Toggle Menu"
//       >
//         {isOpen ? <X size={28} /> : <Menu size={28} />}
//       </button>

//       {/* Mobile dropdown menu */}
//       <ul
//         className={`absolute top-15 left-0 w-full bg-gray-800 flex flex-col items-center space-y-4 py-4 transform transition-all duration-300 ${
//           isOpen
//             ? "translate-y-0 opacity-100 visible"
//             : "-translate-y-10 opacity-0 invisible"
//         } md:hidden`}
//       >
//         <li>
//           <a href="#" className="hover:text-gray-300">
//             Home
//           </a>
//         </li>
//         <li>
//           <a href="#" className="hover:text-gray-300">
//             About
//           </a>
//         </li>
//         <li>
//           <a href="#" className="hover:text-gray-300">
//             Contact
//           </a>
//         </li>
//       </ul>
//     </nav>
//   );
// }
