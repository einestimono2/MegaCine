import { Button, Table } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

export default function ListMovie() {
  const dispatch = useDispatch();
  const createMovie = () => {
    dispatch({ type: "admin/addSelectedKey", payload: { selectedKey: "5" } });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];
  const dataTable = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];
  return (
    <div>
      <div className="flex justify-between">
        <p className="text-3xl font-bold mt-0">Movie Page</p>
        <Button onClick={createMovie}>Create Movie</Button>
      </div>
      <Table columns={columns} dataSource={dataTable}></Table>
    </div>
  );
}
