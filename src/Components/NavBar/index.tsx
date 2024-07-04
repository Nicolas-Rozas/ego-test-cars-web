import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./NavBar.module.css";
import Image from "next/image";
import { montserrat } from "@/fonts/fonts";
import { LineSeparator } from "../LineSeparator";

const menuItems = [
  { text: "Modelos", href: "/" },
  { text: "Servicios y accesorios", href: "" },
  { text: "Financiación", href: "" },
  { text: "Reviews y comunidad", href: "", border: true },
  { text: "Toyota Mobility Service", href: "" },
  { text: "Toyota Gazoo Racing", href: "" },
  { text: "Toyota Híbridos", href: "", border: true },
  { text: "Concesionarios", href: "" },
  { text: "Test Drive", href: "" },
  { text: "Contacto", href: "", border: true },
  { text: "Actividades", href: "" },
  { text: "Servicios al cliente", href: "" },
  { text: "Ventas especiales", href: "" },
  { text: "Innovación", href: "" },
  { text: "Prensa", href: "" },
  { text: "Acerca de...", href: "" },
];

const NavBar = () => {
  const [selectedNavItem, setSelectedNavItem] = useState("Modelos");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const selectedItem = menuItems.find((item) => {
      if (item.href === "/") {
        return item.href === currentPath;
      } else {
        return currentPath.startsWith(item.href);
      }
    });

    if (selectedItem) {
      setSelectedNavItem(selectedItem.text);
    }
  }, []);

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (
      currentPath === "/fichamodelos" ||
      currentPath.startsWith("/fichamodelos/")
    ) {
      setSelectedNavItem("Ficha de modelo");
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as any).contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (text: string) => {
    setSelectedNavItem(text);
    localStorage.setItem("selectedNavItem", text);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <nav className={styles.navbar}>
      {/* Logo and desktop navigation links */}
      <div className={styles.links}>
        <Image src="/egoLogo.png" alt="Toyota logo" width={35} height={35} />
        <Link href="/" className={styles.linkStyles}>
          <p
            className={`${montserrat.className}`}
            style={{
              fontWeight: "bold",
              color: selectedNavItem === "Modelos" ? "red" : "#191919",
              transition: "color 0.3s ease-in-out",
              fontSize: 14,
              marginLeft: 30,
            }}
            onClick={() => handleItemClick("Modelos")}
          >
            Modelos
          </p>
          <div
            className={styles.redBottom}
            style={{
              borderBottom:
                selectedNavItem === "Modelos" ? "4px solid red" : "none",
            }}
          />
        </Link>

        <Link href="/fichamodelos/1" className={styles.linkStyles}>
          <p
            className={`${montserrat.className}`}
            style={{
              fontWeight: "bold",
              color: selectedNavItem === "Ficha de modelo" ? "red" : "#191919",
              transition: "color 0.3s ease-in-out",
              fontSize: 14,
              marginLeft: 25,
            }}
            onClick={() => handleItemClick("Ficha de modelo")}
          >
            Ficha de modelo
          </p>
          <div
            style={{
              position: "absolute",
              bottom: -27,
              left: 0,
              width: 166,
              borderBottom:
                selectedNavItem === "Ficha de modelo"
                  ? "4px solid red"
                  : "none",
            }}
          />
        </Link>
      </div>

      {/* Mobile menu */}
      <div className={styles.mobileMenu} ref={menuRef}>
        <Image
          className={styles.mobileIcon}
          src="/egoLogo.png"
          alt="Toyota logo"
          width={35}
          height={35}
        />
        <div className={styles.menuIcon} onClick={toggleMobileMenu}>
          <p className={`${montserrat.className} ${styles.menuStyleWord}`}>
            Menú{" "}
          </p>
          <p className={`${montserrat.className} ${styles.menuIconText}`}>
            &#9776;
          </p>
        </div>
      </div>

      {/* Mobile menu content */}
      <div
        className={`${styles.menuContent} ${
          isMobileMenuOpen ? styles.open : ""
        }`}
      >
        <p
          className={`${montserrat.className} ${styles.closeButton}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Cerrar <span>X</span>
        </p>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href} passHref>
                <p
                  className={`${montserrat.className} ${styles.navLink}`}
                  onClick={() => {
                    handleItemClick(item.text);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.text}
                </p>
                {item.border && <LineSeparator />}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
