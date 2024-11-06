import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import ProductTemplate from "./ProductTemplate";
import "./Autocomplete.css";

export default function Autocomplete({ data = [], placeholder = "Type to search...", multiSelect = false, apiEndpoints = [], isProductTemplate = false }) {
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    if (apiEndpoints.length > 0) {
      Promise.all(
        apiEndpoints.map(endpoint =>
          fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ terms: [] }),
          }).then(response => response.json())
        )
      )
        .then(results => {
          const mergedData = results.flatMap(result => result.data || []);
          setCombinedData(mergedData);
        })
        .catch(error => console.error("Error fetching data:", error));
    } else {
      setCombinedData(data);
    }
  }, [apiEndpoints, data]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const sourceData = apiEndpoints.length > 0 ? combinedData : data;
    if (value) {
      const filtered = sourceData.filter((item) => {
        const itemName = typeof item === "string" ? item : item.name || `${item.firstName} ${item.lastName}`;
        return itemName.toLowerCase().includes(value.toLowerCase());
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(sourceData);
    }

    setIsListOpen(true);
  };

  const handleFocus = () => {
    setFilteredData(apiEndpoints.length > 0 ? combinedData : data);
    setIsListOpen(true);
  };

  const handleItemClick = (item) => {
    if (multiSelect) {
      if (!selectedItems.includes(item)) {
        setSelectedItems([...selectedItems, item]);
      }
    } else {
      setInputValue(
        typeof item === "string"
          ? item
          : item.name || `${item.firstName || ""} ${item.lastName || ""}`
      );
      setFilteredData([]);
    }
    setIsListOpen(false);
  };

  const handleRemoveItem = (itemToRemove) => {
    if (multiSelect) {
      setSelectedItems(selectedItems.filter((item) => item !== itemToRemove));
    } else {
      setInputValue("");
    }
  };

  const handleBlur = () => {
    setIsListOpen(false);
  };
        return (
          <div className="auto-complete">
            <div className="selected-items">
        {multiSelect && selectedItems.map((item, index) => (
          <span key={index} className="selected-item">
            {item.name || `${item.firstName} ${item.lastName}`}
            <FontAwesomeIcon icon={faTimes} onClick={() => handleRemoveItem(item)} className="remove-icon" />
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
        />
        {!multiSelect && inputValue && (
          <FontAwesomeIcon icon={faTimes} onClick={handleRemoveItem} className="clear-icon" />
        )}
      </div>
      <button className="icon">
        <FontAwesomeIcon icon={faSearch} />
      </button>
      {isListOpen && (
        <div className="autobox">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <div
                key={index}
                className="auto-item"
                onMouseDown={() => handleItemClick(item)}
              >
                {isProductTemplate ? (
                  <ProductTemplate product={item} />
                ) : (
                  typeof item === "string" ? item : item.name || `${item.firstName} ${item.lastName}`
                )}
              </div>
            ))
          ) : (
            <div className="auto-item">No matches found</div>
          )}
        </div>
      )}
    </div>
  );
}
