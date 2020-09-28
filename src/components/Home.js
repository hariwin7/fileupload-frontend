import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { globalContext } from "../context/globalContext";

import Upload from "../components/Upload";
import List from "../components/List";

const Home = () => {
  const {
    globalState: { user },
  } = useContext(globalContext);

  const history = useHistory();
  useEffect(() => {
    if (!Object.entries(user).length) {
      history.push("/signin");
    }
  }, [user, history]);
  return (
    <div>
      <Upload />
      <List />
    </div>
  );
};

export default Home;
