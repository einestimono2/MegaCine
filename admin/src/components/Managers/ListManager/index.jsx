import React, { useEffect, useState } from 'react';
import { Table, Avatar, Button, Input, Popconfirm } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MANAGER_LIST_PAGE_SIZE } from '../../../constants/pagination';
import ManagerDetails from '../Details';
import { getVietNamFormatDate } from '../../../utils/formatDate';
import { managerApi } from '../../../apis/admin/managerApi';
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

  const errorHandler = (error) => {
    setLoading(false);
    setSearching(false);
    setDeleteLoading(undefined);

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

  const handleDelete = async (id, index) => {
    setDeleteLoading(index);
    const response = await apiCaller({
      request: managerApi.deleteManager(id),
      errorHandler,
    });
    if (response) {
      toast.success(response.message, { autoClose: 3000, theme: 'colored' });
      setDeleteLoading(undefined);
      await getManagerList();
    }
  };

  const showModalDetails = async (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getManagerList();
  }, [currentPage, keyword]);

  const dataTable = data?.map((e, idx) => {
    return { ...e, id: idx + 1 };
  });

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
        <Table
          loading={loading}
          className="!h-fit"
          bordered
          dataSource={loading ? undefined : dataTable}
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
          <Column title="ID" dataIndex="id" align="center" fixed="left" />
          <Column title="Code" dataIndex="code" align="center" fixed="left" />
          <ColumnGroup title="Theater">
            <Column title="Name" align="center" dataIndex="theater" render={(obj) => <div>{obj?.name}</div>} />
            <Column
              title="Logo"
              dataIndex="theater"
              align="center"
              render={(obj) => <div>{obj?.logo ? <Avatar size="large" src={obj.logo} /> : ''}</div>}
            />
            <Column title="Address" align="center" dataIndex="theater" render={(obj) => <div>{obj?.address}</div>} />
            <Column title="Email" align="center" dataIndex="theater" render={(obj) => <div>{obj?.email}</div>} />
            <Column title="Hotline" align="center" dataIndex="theater" render={(obj) => <div>{obj?.hotline}</div>} />
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
            )}
          />
        </Table>
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
