import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Search from 'antd/es/input/Search';
import 'react-toastify/dist/ReactToastify.css';
import apiCaller from '../../../apis/apiCaller';
import { movieApi } from '../../../apis/admin/movieApi';

export default function ListMovie() {
  const [lists, setLists] = useState();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const dispatch = useDispatch();
  const access_token = localStorage.getItem('access_token');
  const createMovie = () => {
    dispatch({ type: 'admin/addSelectedKey', payload: { selectedKey: '5' } });
  };
  const handleGetListMovie = async () => {
    const data = {
      keyword: search,
    };
    const errorHandler = (error) => {
      console.log('Fail: ', error);
      toast.error(error.message, { autoClose: 3000, theme: 'colored' });
    };
    const response = await apiCaller({
      request: movieApi.listMovie(data, access_token),
      errorHandler,
    });
    if (response) {
      setLists(response.data);
      setLoading(false);
      console.log(response);
    }
  };
  useEffect(() => {
    handleGetListMovie();
    setLoading(true);
  }, [search]);
  const columns = [
    {
      title: 'Tên phim',
      dataIndex: 'title',
    },
    {
      title: 'Tên phim (gốc)',
      dataIndex: 'originalTitle',
    },
    {
      title: 'Tổng quan',
      children: [
        {
          title: 'Tiếng việt',
          dataIndex: 'overview',
          render: (text) => text.vi,
        },

        {
          title: 'Tiếng anh',
          dataIndex: 'overview',
          render: (text) => text.en,
        },
      ],
    },
    {
      title: 'Định dạng',
      dataIndex: 'formats',
      render: (text) => text.map((val) => val).join(', '),
    },
    // {
    //   title: 'Tác giả',
    //   dataIndex: 'directors',
    //   render: (text) => text.map((val) => val.fullName).join(', '),
    // },
    // {
    //   title: 'Diễn viên',
    //   dataIndex: 'actors',
    //   render: (text) => text[0].fullName,
    // },
    {
      title: 'Ngôn ngữ',
      dataIndex: 'languages',
    },
    {
      title: 'Độ tuổi',
      dataIndex: 'ageType',
    },
    {
      title: 'Thể loại',
      children: [
        {
          title: 'Tiếng việt',
          dataIndex: 'genres',
          render: (text) => text.map((val) => val.name.vi).join(', '),
        },

        {
          title: 'Tiếng anh',
          dataIndex: 'genres',
          render: (text) => text.map((val) => val.name.en).join(', '),
        },
      ],
    },
  ];
  const dataTable =
    lists?.length &&
    lists?.map((val) => {
      return {
        ...val,
      };
    });

  return (
    <div>
      <div className="text-3xl text-center font-bold uppercase mb-3">DANH SÁCH PHIM</div>
      <div className="flex justify-between mb-3">
        <Search
          enterButton="Search"
          size="large"
          allowClear
          className=" w-[45%]"
          onSearch={(e) => setSearch(e)}
          placeholder="Keyword"
        />
        <Button size="large" onClick={createMovie}>
          Create Movie
        </Button>
      </div>
      <Table loading={loading} bordered columns={columns} dataSource={dataTable} />
      <ToastContainer />
    </div>
  );
}
