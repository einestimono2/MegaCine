import { Button, Dropdown, Form, Modal, Select, Table } from "antd";
import Input from "antd/es/input/Input";
import React, { useEffect, useState } from "react";
import "./style.css";

export default function RoomPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [totalSeats, setTotalSeats] = useState(0);
  const [selected, setSelected] = useState([]);
  const initialRows = 5;
  const initialColumns = 5;

  const [matrix, setMatrix] = useState(() => {
    const initialMatrix = [];
    for (let i = 0; i < initialRows; i++) {
      const row = Array.from({ length: initialColumns }, (_, j) => ({
        label: String.fromCharCode(65 + i) + (j + 1),
        type: "Standard",
      }));
      initialMatrix.push(row);
    }
    return initialMatrix;
  });

  const addRow = () => {
    const newRow = Array.from(
      { length: matrix[0]?.length || initialColumns },
      (_, j) => ({
        label: String.fromCharCode(65 + matrix.length) + (j + 1),
        type: "Standard",
      })
    );
    setMatrix((prevMatrix) => [...prevMatrix, newRow]);
  };

  const addColumn = () => {
    setMatrix((prevMatrix) => {
      const newColumn = Array.from(
        { length: prevMatrix.length || initialRows },
        (_, i) => ({
          label: String.fromCharCode(65 + i) + (prevMatrix[0]?.length + 1),
          type: "Standard",
        })
      );
      const newMatrix = prevMatrix.map((row, index) => [
        ...row,
        newColumn[index],
      ]);
      return newMatrix;
    });
  };

  const deleteLastRow = () => {
    setMatrix((prevMatrix) => prevMatrix.slice(0, -1));
  };

  const deleteLastColumn = () => {
    setMatrix((prevMatrix) => prevMatrix.map((row) => row.slice(0, -1)));
  };

  const getTotalSeats = () => {
    let totalSeats = 0;

    matrix.forEach((row) => {
      totalSeats += row.length;
    });

    return totalSeats;
  };
  useEffect(() => {
    const totalSeats = getTotalSeats();
    setTotalSeats(totalSeats);
  }, [matrix]);

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
  const openModal = () => {
    setIsOpen(true);
  };
  const cancelModal = () => {
    setIsOpen(false);
  };
  const items = [
    {
      label: "VIP",
      key: "1",
    },
    {
      label: "Standard",
      key: "2",
    },
    {
      label: "Sweetbox",
      key: "3",
    },
  ];
  const itemsType = [
    {
      label: "2D",
      key: "1",
    },
    {
      label: "3D",
      key: "2",
    },
  ];
  const handleMenuClick = (e) => {
    const label = items.filter((item) => item.key === e.key)?.[0]?.label;
    if (matrix[selected[0]][selected[1]].type === label) return;
    matrix[selected[0]][selected[1]].type = label;
    setMatrix([...matrix]);
  };

  const menuProps = {
    items,
    onClick: (e, cell, rowIndex, columnIndex) =>
      handleMenuClick(e, rowIndex, columnIndex),
  };
  return (
    <div>
      <div className="flex justify-between">
        <p className="text-3xl font-bold mt-0">Room Page</p>
        <Button onClick={openModal}>Create Room</Button>
      </div>
      <div>
        <Table columns={columns} dataSource={dataTable}></Table>
      </div>

      <Modal
        className="max-w-[90%] !w-fit  !-mt-12"
        footer={null}
        title="Create Room"
        open={isOpen}
        onCancel={cancelModal}
      >
        <Form>
          <div className="">
            <div className="grid grid-cols-5 gap-4">
              <Form.Item label="Name" className="col-span-3">
                <Input />
              </Form.Item>
              <Form.Item label="Type" className="col-span-1">
                <Select placeholder="Select a type" options={itemsType} />
              </Form.Item>
              <Form.Item label="Capacity" className="col-span-1">
                {totalSeats}
              </Form.Item>
            </div>
            <div className="grid grid-cols-6 gap-5">
              <div className=" col-span-5 mt-2 flex items-center flex-col container-screen">
                <div className="bg-black h-12 w-[90%] flex items-center justify-center text-2xl font-bold shadow-xl screen">
                  <div className="bg-white h-[95%] w-[95%] flex items-center justify-around text-2xl font-bold shadow-xl screen">
                    <div className="flex items-center">
                      <div
                        className={`bg-gray-200 w-[40px]  h-[25px]  rounded-t-2xl`}
                      ></div>
                      <span className="ml-3"> Standard</span>
                    </div>
                    <div className="flex items-center ">
                      <div
                        className={`bg-red-400 w-[40px]  h-[25px]  rounded-t-2xl`}
                      ></div>
                      <span className="ml-3"> VIP</span>
                    </div>
                    <div className="flex items-center ">
                      <div
                        className={`bg-pink-300 w-[40px]  h-[25px]  rounded-t-2xl`}
                      ></div>
                      <span className="ml-3"> Sweetbox</span>
                    </div>
                  </div>
                </div>
                <div className="!max-w-[820px] overflow-auto min-w-[270px] min-h-[240px] mt-16 !max-h-[360px]">
                  <table>
                    <tbody>
                      {matrix.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, columnIndex) => (
                            <td key={columnIndex} className="p-1">
                              <Dropdown menu={menuProps} trigger={["click"]}>
                                <div
                                  onClick={() => {
                                    setSelected([rowIndex, columnIndex]);
                                  }}
                                  className={`${
                                    cell.type === "VIP"
                                      ? "bg-red-400"
                                      : cell.type === "Standard"
                                      ? "bg-gray-200"
                                      : "bg-pink-300"
                                  }  p-2 ${
                                    cell.type === "Sweetbox" ? "w-14" : "w-7"
                                  }  cursor-pointer seat text-center m-auto   rounded-t-2xl`}
                                >
                                  {cell.label}
                                </div>
                              </Dropdown>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div></div>
              </div>
              <div className="col-span-1  ">
                <div className="flex justify-between flex-col items-center">
                  <div className="grid grid-rows-5 gap-5">
                    <Button onClick={addRow}>Add Row</Button>
                    <Button onClick={addColumn}>Add Column</Button>
                    {matrix.length > 0 && (
                      <>
                        <Button onClick={deleteLastRow}>Delete Row</Button>
                        <Button onClick={deleteLastColumn}>
                          Delete Column
                        </Button>
                      </>
                    )}
                  </div>
                  <Form.Item className="mb-0">
                    <Button>Submit</Button>
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
