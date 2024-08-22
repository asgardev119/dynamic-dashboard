import React, { useState, useEffect } from "react";
import data from "../data.json";
import "./dashboard.css";

export const Dashboard = () => {
  const [categories, setCategories] = useState(data.categories);
  const [addWidgetModal, setAddWidgetModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredWidgets, setFilteredWidgets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newWidgetName, setNewWidgetName] = useState("");
  const [newWidgetText, setNewWidgetText] = useState("");



  // useEffect(() => {
  //   console.log("Fetching data...");
  //   const storedData = localStorage.getItem("data");
  //   if (storedData) {
  //     console.log("Using local storage data...");
  //     setCategories(JSON.parse(storedData).categories);
  //   } else {
  //     console.log("Fetching data from data.json...");
  //     fetch(data)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setCategories(data.categories);
  //       })
  //       .catch((error) => console.error("Error fetching data:", error));
  //   }
  // }, []);


  const handleAddWidget = (category, widget) => {
    const newCategories = [...categories];
    const categoryIndex = newCategories.findIndex((c) => c.id === category.id);
    newCategories[categoryIndex].widgets.push(widget);
    setCategories(newCategories);
    // localStorage.setItem("data", JSON.stringify({ categories: newCategories }));
  };

  const handleRemoveWidget = (category, widget) => {
    const newCategories = [...categories];
    const categoryIndex = newCategories.findIndex((c) => c.id === category.id);
    const widgetIndex = newCategories[categoryIndex].widgets.findIndex(
      (w) => w.id === widget.id
    );
    newCategories[categoryIndex].widgets.splice(widgetIndex, 1);
    setCategories(newCategories);
    // localStorage.setItem("data", JSON.stringify({ categories: newCategories }));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredWidgets = categories.reduce((acc, category) => {
      return acc.concat(
        category.widgets.filter((widget) =>
          widget.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, []);
    setFilteredWidgets(filteredWidgets);
  };

  const handleAddWidgetClick = (category) => {
    const newWidget = {
      id: Math.random(),
      name: newWidgetName,
      text: newWidgetText,
    };
    handleAddWidget(category, newWidget);
    setAddWidgetModal(false);
    setNewWidgetName("");
    setNewWidgetText("");
  };

  const handleWidgetNameChange = (event) => {
    setNewWidgetName(event.target.value);
  };

  const handleWidgetTextChange = (event) => {
    setNewWidgetText(event.target.value);
  };
  return (
    <div className="dashboard">
      <h3>Dashboard V2</h3>
      <div className="search">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <ul>
          {filteredWidgets.map((widget) => (
            <li key={widget.id}>{widget.name}</li>
          ))}
        </ul>
      </div>
      <div className="categories">
        {categories.map((category) => (
          <div key={category.id} className="category">
            <h3>{category.name}</h3>
            <div className="widgets">
              {category.widgets.map((widget) => (
                <div key={widget.id} className="widget">
                  <h4>{widget.name}</h4>
                  <p>{widget.text}</p>
                  <button onClick={() => handleRemoveWidget(category, widget)}>
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  setAddWidgetModal(true);
                  setSelectedCategory(category);
                }}
                className="widget"
              >
                Add Widget +
              </button>
            </div>
          </div>
        ))}
      </div>

      {addWidgetModal && (
        <div className="add-widget-modal">
          <h2>Add Widget</h2>
          <form>
            <label>Widget Name:</label>
            <input
              type="text"
              value={newWidgetName}
              onChange={handleWidgetNameChange}
            />
            <label>Widget Text:</label>
            <textarea value={newWidgetText} onChange={handleWidgetTextChange} />
            <button onClick={() => handleAddWidgetClick(selectedCategory)}>
              confirm
            </button>
            <button onClick={() => setAddWidgetModal(false)}>cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};
