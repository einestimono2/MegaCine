import React, { useEffect, useState } from 'react';
import { Table, Avatar, Button, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SearchOutlined } from '@ant-design/icons';
import { faUserLargeSlash, faUserLarge } from '@fortawesome/free-solid-svg-icons';
import apiCaller from '../../apis/apiCaller';
import { LIST_USER_PAGE_SIZE } from '../../constants/pagination';
import { userApi } from '../../apis/admin/userApi';

const { Search } = Input;

export default function UserPage() {
  const [currentPage, setCurrrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [data, setData] = useState([]);

  const handleSearch = async (key) => {
    await getListUser(key);
  };

  const handleBlock = async (id, index) => {
    const response = await apiCaller({
      request: userApi.toggleBlockUser(id),
      errorHandler,
    });

    if (response) {
      data[index] = response.data;
      setData([...data]);
    }
  };

  const errorHandler = (error) => {
    setLoading(false);
    if (searching) setSearching(false);
    console.log('Fail: ', error);
  };

  const getListUser = async (keyword) => {
    setLoading(true);
    if (keyword) setSearching(true);

    const response = await apiCaller({
      request: userApi.listUser({
        page: currentPage,
        limit: LIST_USER_PAGE_SIZE,
        keyword,
      }),
      errorHandler,
    });

    if (response) {
      setLoading(false);
      if (keyword) setSearching(false);
      setTotalPages(response.extra.totalPages);
      setData(response.data);
    }
  };

  useEffect(() => {
    getListUser();
  }, [currentPage]);

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      align: 'center',
      width: 100,
      render: (url) => <Avatar size="large" src={url} />,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      sorter: true,
    },
    {
      title: 'Provider',
      dataIndex: 'provider',
      align: 'center',
      width: 100,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      align: 'center',
      render: (date) => (
        <div>
          {new Date(date).toLocaleDateString(undefined, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </div>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'isBlocked',
      fixed: 'right',
      align: 'center',
      width: 100,
      // record.filed để lấy trường đó
      render: (text, record, index) => (
        <Button
          onClick={() => handleBlock(record._id, index)}
          shape="circle"
          icon={<FontAwesomeIcon size="xl" icon={text ? faUserLarge : faUserLargeSlash} />}
        />
      ),
    },
  ];

  return (
    <div className="maxh-full m-5">
      <div className="text-3xl text-center font-bold uppercase mb-3">Danh sách người dùng</div>
      <div className="h-fit">
        <Search
          enterButton="Search"
          size="large"
          loading={searching}
          allowClear
          className="mt-5 mb-3 w-[40%]"
          onSearch={(e) => handleSearch(e)}
          placeholder="Email | Name | Phone Number | Provider"
        />
        <Table
          loading={loading}
          className="!h-fit"
          bordered
          columns={columns}
          dataSource={loading ? undefined : data}
          pagination={
            data.length &&
            totalPages > 1 && {
              pageSize: LIST_USER_PAGE_SIZE,
              current: currentPage,
              total: totalPages,
              onChange: (page) => setCurrrentPage(page),
            }
          }
        />
      </div>
    </div>
  );
}
