import React, { useEffect, useState } from 'react';
import { Button, Table, Popconfirm, Tooltip, Avatar } from 'antd';
import { QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import './style.css';
import { peopleApi } from '../../../apis/all/peopleApi';
import apiCaller from '../../../apis/apiCaller';
import CreatePerson from '../Create';
import PersonDetails from '../Details';

const { Column, ColumnGroup } = Table;

export default function People() {
  const [selectedId, setSelectedId] = useState('');
  const [selectedPerson, setSelectedPerson] = useState({});
  const [data, setData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateOrUpdate, setIsCreateOrUpdate] = useState(false);

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState();

  const errorHandler = (error) => {
    setLoading(false);
    setDeleteLoading(undefined);

    toast.error(error.message, { autoClose: 3000, theme: 'colored' });
  };

  const getPeopleList = async () => {
    setLoading(true);

    const response = await apiCaller({
      request: peopleApi.listPeople(),
      errorHandler,
    });

    if (response) {
      setLoading(false);
      setData(response.data);
    }
  };

  useEffect(() => {
    getPeopleList();
  }, []);

  const showModalDetails = async (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id, index) => {
    setDeleteLoading(index);

    const response = await apiCaller({
      request: peopleApi.deletePeople(id),
      errorHandler,
    });

    if (response) {
      toast.success(response.message, { autoClose: 3000, theme: 'colored' });
      setDeleteLoading(undefined);
      data.splice(index, 1);
      setData([...data]);
    }
  };

  const dataTable = data?.map((e, idx) => {
    return { ...e, id: idx + 1 };
  });

  return (
    <div className="w-full h-full items-center justify-center col-span-3">
      <div className="flex flex-row items-center justify-between mx-3">
        <p className="font-bold text-xl">DANH SÁCH ĐẠO DIỄN & DIỄN VIÊN</p>
        <Button type="primary" onClick={() => setIsCreateOrUpdate(true)}>
          <PlusOutlined />
          Thêm
        </Button>
      </div>
      <Table
        loading={loading}
        bordered
        scroll={{ y: data?.length > 5 ? '73vh' : undefined, scrollToFirstRowOnChange: true }}
        dataSource={loading ? undefined : dataTable}
        pagination={false}
        onRow={(row) => {
          return {
            onClick: () => showModalDetails(row._id), // click row
          };
        }}
      >
        <Column title="ID" width={50} align="center" dataIndex="id" />
        <Column
          title="Avatar"
          width={80}
          align="center"
          dataIndex="avatar"
          render={(url) => <Avatar size="large" src={url} />}
        />
        <Column title="Full Name" align="center" dataIndex="fullName" />
        <ColumnGroup title="Summary">
          <Column
            title="English"
            align="center"
            dataIndex="summary"
            render={(obj) => (
              <Tooltip title={obj?.en}>
                <div className="limit-line">{obj?.en}</div>
              </Tooltip>
            )}
          />
          <Column
            title="Vietnames"
            align="center"
            dataIndex="summary"
            render={(obj) => (
              <Tooltip title={obj?.vi}>
                <div className="limit-line">{obj?.vi}</div>
              </Tooltip>
            )}
          />
        </ColumnGroup>
        <Column
          title="Actions"
          fixed="right"
          align="center"
          width={120}
          render={(_text, record, index) => (
            <div className="flex justify-around">
              <Button
                loading={deleteLoading === index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPerson(record);
                  setIsCreateOrUpdate(true);
                }}
                shape="circle"
                color="red"
                style={{ background: 'green', opacity: 0.75 }}
                icon={<FontAwesomeIcon color="white" size="sm" icon={faPenToSquare} />}
              />
              <Popconfirm
                title="Xóa đạo diễn/diễn viên"
                description="Bạn có chắc xóa không?"
                onConfirm={(e) => {
                  e.stopPropagation();
                  handleDelete(record._id, index);
                }}
                onCancel={(e) => e.stopPropagation()}
                okText="Yes"
                cancelText="No"
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              >
                <Button
                  loading={deleteLoading === index}
                  onClick={
                    (e) => e.stopPropagation() // Tắt sự kiện click vào row
                  }
                  shape="circle"
                  color="red"
                  style={{ background: 'red', opacity: 0.75 }}
                  icon={<FontAwesomeIcon color="white" size="sm" icon={faTrash} />}
                />
              </Popconfirm>
            </div>
          )}
        />
      </Table>
      <PersonDetails
        open={isModalOpen}
        onCancel={() => {
          setSelectedId('');
          setIsModalOpen(false);
        }}
        id={selectedId}
      />
      <CreatePerson
        open={isCreateOrUpdate}
        onCancel={() => {
          setIsCreateOrUpdate(false);
          setSelectedPerson(undefined);
        }}
        person={selectedPerson}
        onCreated={(genre) => {
          setIsCreateOrUpdate(false);
          data.unshift(genre);
          setData([...data]);
        }}
        onUpdated={(genre) => {
          setIsCreateOrUpdate(false);
          setData([...data.map((e) => (e._id === genre._id ? genre : e))]);
        }}
      />
      <ToastContainer theme="colored" newestOnTop />
    </div>
  );
}
