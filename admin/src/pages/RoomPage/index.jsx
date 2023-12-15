import { Button, Form, Modal, Table } from "antd";
import Input from "antd/es/input/Input";
import React, { useState } from "react";

export default function RoomPage() {
  const [isOpen, setIsOpen] = useState(false);
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
  return (
    <div>
      <div className="text-right">
        <Button onClick={openModal}>Create Room</Button>
      </div>
      <Table columns={columns} dataSource={dataTable}></Table>
      <Modal
        width={800}
        footer={null}
        title="Create Room"
        open={isOpen}
        onCancel={cancelModal}
      >
        <Form>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <Form.Item label="Name">
                <Input />
              </Form.Item>
              <Form.Item>
                <Input />
              </Form.Item>
              <Form.Item>
                <Input />
              </Form.Item>
            </div>
            <div className="col-span-2">
              <Form.Item label="Name">
                <Input />
              </Form.Item>
              <Form.Item>
                <Input />
              </Form.Item>
              <Form.Item>
                <Input />
              </Form.Item>
            </div>
          </div>
          <Form.Item className="mb-0">
            <Button>Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
