import React, { useEffect, useState } from 'react';
import { Table, Avatar, Button, Input, Popconfirm } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { SearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MANAGER_LIST_PAGE_SIZE } from '../../../constants/pagination';
import { managerApi } from '../../../apis/admin/managerApi';
import ManagerDetails from '../Details';
import { getVietNamFormatDate } from '../../../utils/formatDate';
import apiCaller from '../../../apis/apiCaller';

const { Search } = Input;
const { Column, ColumnGroup } = Table;

export default function ListManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [keyword, setKeyword] = useState();

  const [currentPage, setCurrrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState();
  const [searching, setSearching] = useState(false);

  const [data, setData] = useState([]);
  const [height, setHeight] = useState(0);
  const errorHandler = (error) => {
    setLoading(false);
    if (searching) setSearching(false);
    if (deleteLoading) setDeleteLoading(undefined);

    toast.error(error.message, { autoClose: 3000, theme: 'colored' });
  };

  const getManagerList = async () => {
    setLoading(true);
    if (keyword) setSearching(true);

    const response = await apiCaller({
      request: managerApi.listManager({
        page: currentPage,
        limit: MANAGER_LIST_PAGE_SIZE,
        keyword,
      }),
      errorHandler,
    });

    if (response) {
      setLoading(false);
      console.log(response);
      if (keyword) setSearching(false);
      setTotalCount(response.extra.totalCount);
      setData(response.data);
    }
  };
  useEffect(() => {
    const calculateHeight = () => {
      const windowHeight = window.innerHeight;

      const heightPercentage = 0.53;

      const calculatedHeight = windowHeight * heightPercentage;

      setHeight(calculatedHeight);
    };

    calculateHeight();

    window.addEventListener('resize', calculateHeight);

    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, []);
  const handleDelete = async (id, index) => {
    toast.success(id + index, { autoClose: 3000, theme: 'colored' });
    // setDeleteLoading(index);
    // const response = await apiCaller({
    //   request: managerApi.deleteManager(id),
    //   errorHandler,
    // });
    // if (response) {
    //   toast.success(response.message, { autoClose: 3000, theme: 'colored' });
    //   setDeleteLoading(undefined);
    //   await getManagerList();
    // }
  };

  const showModalDetails = async (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getManagerList();
  }, [currentPage, keyword]);

  return (
    <div>
      <div className="text-3xl text-center font-bold uppercase mb-3">DANH SÁCH QUẢN LÝ</div>
      <div className="h-fit">
        <Search
          enterButton="Search"
          size="large"
          loading={searching}
          allowClear
          className="mt-4 mb-3 w-[45%]"
          onSearch={(e) => setKeyword(e)}
          placeholder="ID | Code | Theater (Name | Address | Email | Hotline)"
        />
        <div className="!max-h-[80%] !overflow-auto">
          <Table
            scroll={{ y: height }}
            loading={loading}
            className="!h-fit"
            bordered
            dataSource={loading ? undefined : data}
            pagination={
              data.length &&
              totalCount > MANAGER_LIST_PAGE_SIZE && {
                pageSize: MANAGER_LIST_PAGE_SIZE,
                current: currentPage,
                total: totalCount,
                onChange: (page) => setCurrrentPage(page),
              }
            }
            onRow={(row) => {
              return {
                onClick: () => showModalDetails(row._id), // click row
              };
            }}
          >
            <Column title="ID" dataIndex="_id" fixed="left" />
            <Column title="Code" dataIndex="code" fixed="left" />
            <ColumnGroup title="Theater">
              <Column title="Name" dataIndex="theater" render={(obj) => <div>{obj?.name}</div>} />
              <Column
                title="Logo"
                dataIndex="theater"
                render={(obj) => <div>{obj?.logo ? <Avatar size="large" src={obj?.logo} /> : ''}</div>}
              />
              <Column title="Address" dataIndex="theater" render={(obj) => <div>{obj?.address}</div>} />
              <Column title="Email" dataIndex="theater" render={(obj) => <div>{obj?.email}</div>} />
              <Column title="Hotline" dataIndex="theater" render={(obj) => <div>{obj?.hotline}</div>} />
            </ColumnGroup>
            <Column
              title="Created At"
              dataIndex="createdAt"
              align="center"
              fixed="right"
              render={(date) => <div>{getVietNamFormatDate(date)}</div>}
            />
            <Column
              title="Actions"
              fixed="right"
              align="center"
              render={(_text, record, index) => (
                <div className="flex gap-2">
                  {
                    <Popconfirm
                      title="Xóa quản lý"
                      description="Bạn có chắc xóa quản lý?"
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
                        icon={<FontAwesomeIcon color="white" size="xl" icon={faTrash} />}
                      />
                    </Popconfirm>
                  }
                </div>
              )}
            />
          </Table>
        </div>
      </div>
      <ToastContainer theme="colored" newestOnTop />
      <ManagerDetails
        open={isModalOpen}
        onCancel={() => {
          setSelectedId('');
          setIsModalOpen(false);
        }}
        id={selectedId}
      />
    </div>
  );
}
