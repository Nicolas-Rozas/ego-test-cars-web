import React, { useState } from "react";
import styles from "./filter.module.css";
import { montserrat } from "@/fonts/fonts";
import { LineSeparator } from "../LineSeparator";

interface FilterProps {
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
}

const Filter = ({ onFilterChange, onSortChange }: FilterProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const filterOptions = [
    { label: "Todos", value: "Todos" },
    { label: "Autos", value: "Autos" },
    { label: "Pickups y Comerciales", value: "Pickups y Comerciales" },
    { label: "SUVs y Crossovers", value: "SUVs y Crossovers" },
  ];

  const sortOptions = [
    { label: "Nada", value: "" },
    { label: "De menor a mayor precio", value: "menor-mayor" },
    { label: "De mayor a menor precio", value: "mayor-menor" },
    { label: "Más nuevos primero", value: "nuevos-viejos" },
    { label: "Más viejos primero", value: "viejos-nuevos" },
  ];

  const boldText = (text: string) => {
    return <span className={styles.bold}>{text}</span>;
  };

  const renderSortOptionLabel = (label: string) => {
    const labelStyles: Record<string, () => JSX.Element> = {
      "De menor a mayor precio": () => (
        <>
          De {boldText("menor")} a {boldText("mayor")} precio
        </>
      ),
      "De mayor a menor precio": () => (
        <>
          De {boldText("mayor")} a {boldText("menor")} precio
        </>
      ),
      "Más nuevos primero": () => <>Más {boldText("nuevos")} primero</>,
      "Más viejos primero": () => <>Más {boldText("viejos")} primero</>,
    };

    return labelStyles[label] ? labelStyles[label]() : <>{label}</>;
  };

  const handleFilterClick = (filter: any) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  const handleSortClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSortOptionClick = (option: string) => {
    setSelectedSortOption(option);
    onSortChange(option);
    setShowDropdown(false);
  };

  const handleMobileDropdownClick = () => {
    setShowMobileDropdown(!showMobileDropdown);
  };

  return (
    <div className={styles.filterContainer}>
      {/* Desktop filter buttons (hidden in mobile) */}
      <div className={`${styles.filterButtons} ${styles.desktopOnly}`}>
        <p className={`${montserrat.className} ${styles.filterStyles}`}>
          Filtrar por
        </p>
        {filterOptions.map((option) => (
          <button
            key={option.value}
            className={`${styles.filterButton} ${
              selectedFilter === option.value ? styles.selected : ""
            } ${montserrat.className}`}
            onClick={() => handleFilterClick(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Mobile filter dropdown */}
      <div className={`${styles.mobileDropdown} ${styles.mobileOnly}`}>
        <button
          className={styles.sortButton}
          onClick={handleMobileDropdownClick}
        >
          <p className={`${montserrat.className}  ${styles.orderBy}`}>
            Filtrar por
          </p>
          <span>{showMobileDropdown ? " ▲" : " ▼"}</span>
        </button>
        {showMobileDropdown && (
          <div className={styles.filterDropdown}>
            {filterOptions.map((option, index) => (
              <React.Fragment key={option.value}>
                <p
                  className={`${styles.selectorStyles} ${montserrat.className}`}
                  onClick={() => {
                    handleFilterClick(option.value);
                    setShowMobileDropdown(false);
                  }}
                >
                  {option.label}
                </p>
                {index !== filterOptions.length - 1 && (
                  <div className={styles.lineSeparator} />
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Sort dropdown */}
      <div className={styles.sortDropdown}>
        <button className={styles.sortButton} onClick={handleSortClick}>
          <p className={`${montserrat.className} ${styles.orderBy}`}>
            Ordenar por
          </p>
          <span>{showDropdown ? " ▲" : " ▼"}</span>
        </button>
        {showDropdown && (
          <div className={`${montserrat.className} ${styles.dropdownContent}`}>
            {sortOptions.map((option, index) => (
              <React.Fragment key={option.value}>
                <p
                  className={`${styles.selectorStyles} ${montserrat.className}`}
                  onClick={() => handleSortOptionClick(option.value)}
                >
                  {renderSortOptionLabel(option.label)}
                </p>
                {index !== sortOptions.length - 1 && (
                  <div className={styles.lineSeparator} />
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
