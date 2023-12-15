import React, { useState } from "react";
import "./style.css";
import Dashboard from "../../components/Dashboard";
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
import { useParams } from "react-router-dom";

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
  const [selectedKey, setSelectedKey] = useState("1");
  const path = useParams().id;
  const handleMenuClick = (key) => {
    setSelectedKey(key);
  };

  const renderAdminPage = (key) => {
    switch (key) {
      case "1":
        return <Dashboard />;
      case "2":
        return "ýeys";
      case "5":
        return "test";
      case "6":
        return <p onClick={() => setSelectedKey("5")}>hí</p>;
      default:
        return <></>;
    }
  };
  const renderManagerPage = (key) => {
    switch (key) {
      case "1":
        return <Dashboard />;
      case "2":
        return "hiehif";
      case "5":
        return "test";
      case "6":
        return <p onClick={() => setSelectedKey("5")}>hí</p>;
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

  return (
    <div className="grid grid-cols-5 gap-4 ">
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
        <Button type="primary" size="large" className="fixed bottom-3 left-24">
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
