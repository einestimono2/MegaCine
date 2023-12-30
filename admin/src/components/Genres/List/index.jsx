import React, { useEffect, useState } from 'react';
import { Button, Table, Popconfirm } from 'antd';
import { QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { genreApi } from '../../../apis/all/genreApi';
import apiCaller from '../../../apis/apiCaller';
import GenreDetails from '../Details';
import CreateGenre from '../Create';

const { Column, ColumnGroup } = Table;

export default function Genres() {
  const [selectedId, setSelectedId] = useState('');
  const [selectedGenre, setSelectedGenre] = useState({});
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

  const getGenreList = async () => {
    setLoading(true);

    const response = await apiCaller({
      request: genreApi.listGenre(),
      errorHandler,
    });

    if (response) {
      setLoading(false);
      setData(response.data);
    }
  };

  useEffect(() => {
    getGenreList();
  }, []);

  const showModalDetails = async (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id, index) => {
    setDeleteLoading(index);

    const response = await apiCaller({
      request: genreApi.deleteGenre(id),
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
    <div className="w-full h-full items-center justify-center col-span-2">
      <div className="flex flex-row items-center justify-between mx-3">
        <p className="font-bold text-xl">DANH SÁCH THỂ LOẠI</p>
        <Button type="primary" onClick={() => setIsCreateOrUpdate(true)}>
          <PlusOutlined />
          Thêm
        </Button>
      </div>
      <Table
        loading={loading}
        bordered
        scroll={{ y: data?.length > 8 ? '75vh' : undefined, scrollToFirstRowOnChange: true }}
        dataSource={loading ? undefined : dataTable}
        pagination={false}
        onRow={(row) => {
          return {
            onClick: () => showModalDetails(row._id), // click row
          };
        }}
      >
        <Column title="ID" align="center" dataIndex="id" />
        <ColumnGroup title="Name">
          <Column title="English" align="center" dataIndex="name" render={(obj) => <div>{obj.en}</div>} />
          <Column title="Vietnames" align="center" dataIndex="name" render={(obj) => <div>{obj.vi}</div>} />
        </ColumnGroup>
        <Column
          title="Actions"
          fixed="right"
          width={120}
          align="center"
          render={(_text, record, index) => (
            <div className="flex justify-around">
              <Button
                loading={deleteLoading === index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedGenre(record);
                  setIsCreateOrUpdate(true);
                }}
                shape="circle"
                color="red"
                style={{ background: 'green', opacity: 0.75 }}
                icon={<FontAwesomeIcon color="white" size="sm" icon={faPenToSquare} />}
              />
              <Popconfirm
                title="Xóa thể loại"
                description="Bạn có chắc xóa thể loại?"
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
      <GenreDetails
        open={isModalOpen}
        onCancel={() => {
          setSelectedId('');
          setIsModalOpen(false);
        }}
        id={selectedId}
      />
      <CreateGenre
        open={isCreateOrUpdate}
        onCancel={() => {
          setIsCreateOrUpdate(false);
          setSelectedGenre(undefined);
        }}
        genre={selectedGenre}
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
