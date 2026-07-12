import React, { createContext, useContext, useEffect, useState } from 'react'
const DataContext = createContext()
import axios from "axios"

const DataProvider = ({children}) => {
    const [user, setUser] = useState([])
    const [driver, setDriver] = useState(second)
    const fetchData = async () => {
    try {
      const [productData, categoryData] = await Promise.all([
        axios.get("http://localhost:3000/api/users"),
        axios.get("http://localhost:3000/api/drivers"),
      ]);

      setData(productData.data);
      setCategory(categoryData.data);

      console.log(productData.data);
      console.log(categoryData.data);
    } catch (err) {
      console.error(err);
    } finally {
      console.log("done");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        data,
        category,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};


export default DataProvider