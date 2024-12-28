"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4 xs:justify-center">
      {/* ESQUERDA */}
      <div className="flex items-center gap-10 xs:flex-col xs:items-center xs:gap-4">
        <Image src="/logo.svg" width={173} height={39} alt="Finance AI" />
        <Link
          href="/"
          className={
            pathname === "/"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Dashboard
        </Link>
        <Link
          href="/transactions"
          className={
            pathname === "/transactions"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Transações
        </Link>
        {/* <Link
          href="/subscription"
          className={
            "hidden" + pathname === "/subscription"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Assinatura
        </Link> */}
      </div>
      {/* DIREITA */}
      <div className="xs:hidden">
        <UserButton showName />
      </div>
    </nav>
  );
};

export default Navbar;
