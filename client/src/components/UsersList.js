import Axios from "axios";
import React, { useEffect, useState } from "react";

const UsersList = () => {
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        Axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: token },
        }).then((res) => {
          setUserList(res.data);
        });
      } else {
        const message = { message: "No Token provided" };
        throw message;
      }
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  }, [setUserList, setError]);

  return (
    <div>
      {error ? <h2>{error}</h2> : null}
      {userList
        ? userList.map((user, index) => {
            return (
              <div keys={index}>
                <p>{user.username}</p>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default UsersList;
