import React, { useState } from "react";
import "./style.css";
import Dashboard from "../../components/Dashboard/Admin";
import { Button, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faFilm,
  faUserGear,
  faChartLine,
  faListUl,
  faShapes,
  faCheck,
  faPlus,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import RoomPage from "../RoomPage";
import MoviePage from "../MoviePage";
import ProductPage from "../ProductPage";
import DashboardAdmin from "../../components/Dashboard/Admin";
import DashboardManager from "../../components/Dashboard/Manager";
import { useDispatch, useSelector } from "react-redux";
import apiCaller from "../../apis/apiCaller";
import { authApi } from "../../apis/authApi";
import { ROUTE } from "../../constants/router";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
export default function AdminPage() {
  const dispatch = useDispatch();
  const selectedKey = useSelector((state) => state.admin.selectedKey);
  const path = useParams().id;
  const handleMenuClick = (key) => {
    dispatch({ type: "admin/addSelectedKey", payload: { selectedKey: key } });
  };
  const access_token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const renderAdminPage = (key) => {
    switch (key) {
      case "1":
        return <DashboardAdmin />;
      case "2":
        return "ýeys";
      case "5":
        return <MoviePage mode="create" />;
      case "6":
        return <MoviePage mode="list" />;
      default:
        return <></>;
    }
  };
  const itemsAdmin = [
    getItem("Dashboard", "1", <FontAwesomeIcon icon={faChartLine} />),
    getItem("Users", "2", <FontAwesomeIcon icon={faUser} />),
    getItem("Managers", "sub1", <FontAwesomeIcon icon={faUserGear} />, [
      getItem("Approval", "3", <FontAwesomeIcon icon={faCheck} />),
      getItem("List Manager", "4", <FontAwesomeIcon icon={faListUl} />),
    ]),
    getItem("Movies", "sub2", <FontAwesomeIcon icon={faFilm} />, [
      getItem("Create Movie", "5", <FontAwesomeIcon icon={faPlus} />),
      getItem("List Movie", "6", <FontAwesomeIcon icon={faListUl} />),
    ]),
    getItem("Categories", "7", <FontAwesomeIcon icon={faShapes} />),
  ];
  const renderManagerPage = (key) => {
    switch (key) {
      case "1":
        return <DashboardManager />;
      case "2":
        return <RoomPage />;
      case "3":
        return "test";
      case "4":
        return "test";
      case "5":
        return <ProductPage />;
      case "6":
        return "test";
      case "7":
        return "test";
      default:
        return <></>;
    }
  };
  const itemsManager = [
    getItem("Dashboard", "1", <FontAwesomeIcon icon={faChartLine} />),
    getItem("Rooms", "2", <FontAwesomeIcon icon={faUser} />),
    getItem("Categories", "3", <FontAwesomeIcon icon={faShapes} />),
    getItem("Promotions", "4", <FontAwesomeIcon icon={faTags} />),
    getItem("Products", "5", <FontAwesomeIcon icon={faFilm} />),
    getItem("Showtime", "6", <FontAwesomeIcon icon={faUserGear} />),
    getItem("Reviews", "7", <FontAwesomeIcon icon={faUser} />),
  ];
  const logOut = async () => {
    const errorHandler = (error) => {
      console.log("Fail: ", error);
    };
    const response = await apiCaller({
      request: authApi.logout(access_token),
      errorHandler,
    });
    if (response) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      navigate(ROUTE.SIGNIN, { replace: true });
    }
  };
  return (
    <div className="grid grid-cols-5 ">
      <div className="col-span-1 menu  h-[100vh]">
        <p className="text-3xl p-5 font-bold text-blue-500">
          # {path === "admin" ? "ADMIN" : "MANAGER"}
        </p>
        {path === "manager" ? <div></div> : null}
        <Menu
          className="custom-menu"
          mode="inline"
          items={path === "admin" ? itemsAdmin : itemsManager}
          selectedKeys={[selectedKey]}
          onClick={({ key }) => handleMenuClick(key)}
        />
        <Button
          type="primary"
          size="large"
          onClick={logOut}
          className="fixed bottom-3 left-24"
        >
          Logout
        </Button>
      </div>
      <div className="col-span-4 p-5">
        {path === "admin"
          ? renderAdminPage(selectedKey)
          : renderManagerPage(selectedKey)}
      </div>
    </div>
  );
}
