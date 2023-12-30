import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SearchOutlined } from '@ant-design/icons';
import { MANAGER_APPROVAL_LIST_PAGE_SIZE } from '../../../constants/pagination';
import apiCaller from '../../../apis/apiCaller';
import { managerApi } from '../../../apis/admin/managerApi';
import ManagerDetails from '../Details';
import { getVietNamFormatDate } from '../../../utils/formatDate';

const { Search } = Input;
const { Column, ColumnGroup } = Table;

function Approval() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [keyword, setKeyword] = useState();

  const [currentPage, setCurrrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);

  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState();
  const [refuseLoading, setRefuseLoading] = useState();

  const [data, setData] = useState([]);

  const errorHandler = (error) => {
    setLoading(false);
    setSearching(false);
    setAcceptLoading(undefined);
    setRefuseLoading(undefined);

    toast.error(error.message, { autoClose: 3000, theme: 'colored' });
  };

  const getApprovalList = async () => {
    setLoading(true);
    if (keyword) setSearching(true);

    const response = await apiCaller({
      request: managerApi.approvalList({
        page: currentPage,
        limit: MANAGER_APPROVAL_LIST_PAGE_SIZE,
        keyword,
      }),
      errorHandler,
    });

    if (response) {
      setLoading(false);
      if (keyword) setSearching(false);
      setTotalCount(response.extra.totalCount);
      setData(response.data);
    }
  };

  const handleAccept = async (id, index) => {
    setAcceptLoading(index);
    const response = await apiCaller({
      request: managerApi.activateManager(id),
      errorHandler,
    });

    if (response) {
      data.splice(index, 1);
      setData([...data]);
      toast.success(response.message, { autoClose: 3000, theme: 'colored' });
      setAcceptLoading(undefined);
    }
  };

  const handleRefuse = async (id, index) => {
    setRefuseLoading(index);

    const response = await apiCaller({
      request: managerApi.deleteManager(id),
      errorHandler,
    });

    if (response) {
      toast.success(response.message, { autoClose: 3000, theme: 'colored' });
      setRefuseLoading(undefined);

      await getApprovalList();
    }
  };

  const showModalDetails = async (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getApprovalList();
  }, [currentPage]);

  const dataTable = data?.map((e, idx) => {
    return { ...e, id: idx + 1 };
  });

  return (
    <div>
      <div className="text-3xl text-center font-bold uppercase mb-3">DANH SÁCH PHÊ DUYỆT</div>
      <div className="h-fit">
        <Search
          enterButton="Search"
          size="large"
          loading={searching}
          allowClear
          className="mt-5 mb-3 w-[45%]"
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
            totalCount > MANAGER_APPROVAL_LIST_PAGE_SIZE && {
              pageSize: MANAGER_APPROVAL_LIST_PAGE_SIZE,
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
          <Column title="ID" align="center" dataIndex="id" fixed="left" />
          <Column title="Code" align="center" dataIndex="code" fixed="left" />
          <ColumnGroup title="Theater">
            <Column title="Name" align="center" dataIndex="theater" render={(obj) => <div>{obj?.name}</div>} />
            <Column
              align="center"
              title="Logo"
              dataIndex="theater"
              render={(obj) => <div>{obj?.logo ? <Avatar size="large" src={obj?.logo} /> : ''}</div>}
            />
            <Column title="Address" align="center" dataIndex="theater" render={(obj) => <div>{obj?.address}</div>} />
            <Column title="Email" align="center" dataIndex="theater" render={(obj) => <div>{obj?.email}</div>} />
            <Column title="Hotline" align="center" dataIndex="theater" render={(obj) => <div>{obj?.hotline}</div>} />
          </ColumnGroup>
          <Column
            align="center"
            title="Created At"
            dataIndex="createdAt"
            fixed="right"
            render={(date) => <div>{getVietNamFormatDate(date)}</div>}
          />
          <Column
            title="Actions"
            fixed="right"
            align="center"
            render={(_text, record, index) => (
              <div className="flex gap-2">
                <Button
                  onClick={(e) => {
                    e.stopPropagation(); // Tắt sự kiện click vào row
                    handleAccept(record._id, index);
                  }}
                  shape="circle"
                  style={{ background: 'green', opacity: 0.75 }}
                  loading={acceptLoading === index}
                  icon={<FontAwesomeIcon color="white" size="xl" icon={faCheck} />}
                />
                <Button
                  loading={refuseLoading === index}
                  onClick={(e) => {
                    e.stopPropagation(); // Tắt sự kiện click vào row
                    handleRefuse(record._id, index);
                  }}
                  shape="circle"
                  color="red"
                  style={{ background: 'red', opacity: 0.75 }}
                  icon={<FontAwesomeIcon color="white" size="xl" icon={faXmark} />}
                />
              </div>
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

export default Approval;
