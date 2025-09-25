"use client";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { HiDocumentText } from "react-icons/hi";
const Navbar = () => {
  const currentPath = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/add", label: "Add" },
  ];
  return (
    <nav className="border-b h-5rem border-gray-300 mb-5 px-5">
      <Flex gap="5" align="center" height="3rem">
        <Link href="/">
          {" "}
          <HiDocumentText size="2rem" />
        </Link>
        <ul className="flex space-x-6">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                className={classNames({
                  "text-zinc-1000": true,
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
    </nav>
  );
};

export default Navbar;
