// Vendors
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

// Services
import foodData from "../../services/foodDataService";

// Components
import Layout from "../Layout";
import Card from "../card/Card";

// Styles
import "./home.css";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      const response = await foodData();
      const responseData = response.data;
      setFoodItem(responseData.foodItems);
      setFoodCategory(responseData.foodCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Layout>
        <div className="home">
          <div className="img">
            <div className="search-bar">
              <div className="form">
                <div className="search-icon">
                  {" "}
                  <FaSearch />
                </div>
                <input
                  className="search-input"
                  type="search"
                  placeholder="Transform your cravings..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="card-div">
            {!(foodCategory.length === 0)
              ? foodCategory.map((data) => {
                  return (
                    <div className="row">
                      {data.categoryName
                        .toLowerCase()
                        .includes(search.toLowerCase()) && (
                        <div key={data._id} className="category">
                          {data.categoryName}
                          <hr />
                        </div>
                      )}

                      <div className="items">
                        {!(foodItem.length === 0) ? (
                          foodItem
                            .filter(
                              (item) =>
                                item.categoryName === data.categoryName &&
                                (item.name
                                  .toLowerCase()
                                  .includes(search.toLowerCase()) ||
                                  item.categoryName
                                    .toLowerCase()
                                    .includes(search.toLowerCase()))
                            )
                            .map((filteredItems, index) => {
                              return (
                                <div key={filteredItems._id} className="column">
                                  <Card
                                    foodItem={filteredItems}
                                    index={index}
                                  ></Card>
                                </div>
                              );
                            })
                        ) : (
                          <div>No such data Found!</div>
                        )}
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </Layout>
    </>
  );
}
