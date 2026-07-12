import React, { createContext, useContext, useEffect, useState } from 'react'
const DataContext = createContext()
import axios from "axios"

const DataProvider = ({children}) => {
    const [user, setUser] = useState([])
    const [driver, setDriver] = useState([])
    const fetchData = async () => {
    try {
      const [UserData, DriverData] = await Promise.all([
        axios.get("http://localhost:3000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        axios.get("http://localhost:3000/api/drivers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      setUser(UserData.data);
      setDriver(DriverData.data);

      console.log(UserData.data);
      console.log(DriverData.data);
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