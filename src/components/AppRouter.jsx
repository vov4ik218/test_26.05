import React, {useContext} from 'react';
import { Route, Routes, useNavigate} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const navigate = useNavigate();
    
    const {isAuth, isLoading} = useContext(AuthContext);
    console.log(isAuth)
    if (isLoading) {
        return <Loader/>
    }

    return (
        <Routes>
        {isAuth ? (
          <>
            {privateRoutes.map(route => (
              <Route
                path={route.path}
                element={route.component}
                exact={route.exact}
                key={route.path}
              />
            ))}
            <Route
              path="/"
              element={() => {
                navigate('/posts');
                return null;
              }}
            />
          </>
        ) : (
          <>
            {publicRoutes.map(route => (
              <Route
                path={route.path}
                element={route.component}
                exact={route.exact}
                key={route.path}
              />
            ))}
            <Route
              path="/"
              element={() => {
                navigate('/login');
                return null;
              }}
            />
          </>
        )}
      </Routes>
    );
};

export default AppRouter;
