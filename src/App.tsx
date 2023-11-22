import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import styled from 'styled-components';
import { gridColumnType, gridColumnTypeToLabel } from './static';
import axios from 'axios';
import { observer, useLocalObservable } from 'mobx-react';
import OrderStore from './store';
import { runInAction } from 'mobx';

const Container = styled.div`
  padding: 36px;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const TitleContainer = styled.div`
  justify-content: space-between;
  display: flex;
`;

const Input = styled.input`
  top: 36px;
  left: 116px;
  width: 240px;
  height: 44px;

  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #d9dbe0;
  border-radius: 8px;

  -moz-appearance: textfield;
  -webkit-appearance: none;
`;

const SearchButton = styled.div`
  top: 36px;
  left: 1764px;
  width: 120px;
  height: 44px;
  background: #4882e3 0% 0% no-repeat padding-box;
  border-radius: 22px;
  text-align: center;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const YearTitle = styled.div`
  letter-spacing: 0px;
  color: #676d7e;
  display: flex;
  align-items: center;
`;

const RowContainer = styled.div`
  text-align: left;
  font: normal normal normal 16px/19px Spoqa Han Sans Neo;
  letter-spacing: 0px;
  color: #444a5c;
`;

const Columns: GridColDef[] = [
  {
    minWidth: 150,
    sortable: false,
    field: gridColumnType.number,
    headerName: gridColumnTypeToLabel[gridColumnType.number],
    renderCell: ({ row }) => {
      return <RowContainer>{row[gridColumnType.number]}</RowContainer>;
    },
  },
  {
    minWidth: 150,
    sortable: false,
    field: gridColumnType.createdAt,
    headerName: gridColumnTypeToLabel[gridColumnType.createdAt],
    renderCell: ({ row }) => {
      return <RowContainer>{row[gridColumnType.createdAt]}</RowContainer>;
    },
  },
  {
    minWidth: 150,
    sortable: false,
    field: gridColumnType.status,
    headerName: gridColumnTypeToLabel[gridColumnType.status],
    renderCell: ({ row }) => {
      return <RowContainer>{row[gridColumnType.status]}</RowContainer>;
    },
  },
  {
    minWidth: 150,
    sortable: false,
    field: gridColumnType.applicantAddress,
    headerName: gridColumnTypeToLabel[gridColumnType.applicantAddress],
    renderCell: ({ row }) => {
      return (
        <RowContainer>{row[gridColumnType.applicantAddress]}</RowContainer>
      );
    },
  },
  {
    minWidth: 150,
    sortable: false,
    field: gridColumnType.applicantName,
    headerName: gridColumnTypeToLabel[gridColumnType.applicantName],
    renderCell: ({ row }) => {
      return <RowContainer>{row[gridColumnType.applicantName]}</RowContainer>;
    },
  },
  {
    minWidth: 150,
    sortable: false,
    field: gridColumnType.applicantPhone,
    headerName: gridColumnTypeToLabel[gridColumnType.applicantPhone],
    renderCell: ({ row }) => {
      return <RowContainer>{row[gridColumnType.applicantPhone]}</RowContainer>;
    },
  },
  {
    minWidth: 150,
    sortable: false,
    field: gridColumnType.destAddress,
    headerName: gridColumnTypeToLabel[gridColumnType.destAddress],
    renderCell: ({ row }) => {
      return <RowContainer>{row[gridColumnType.destAddress]}</RowContainer>;
    },
  },
  {
    minWidth: 150,
    sortable: false,
    field: gridColumnType.destName,
    headerName: gridColumnTypeToLabel[gridColumnType.destName],
    renderCell: ({ row }) => {
      return <RowContainer>{row[gridColumnType.destName]}</RowContainer>;
    },
  },
  {
    minWidth: 150,
    sortable: false,
    field: gridColumnType.destPhone,
    headerName: gridColumnTypeToLabel[gridColumnType.destPhone],
    renderCell: ({ row }) => {
      return <RowContainer>{row[gridColumnType.destPhone]}</RowContainer>;
    },
  },
];

const App: React.FC = () => {
  const store = useLocalObservable(() => new OrderStore());

  const { orderList } = store;
  const [rows, setRows] = useState(orderList);

  const handleSearch = async () => {
    const response = await axios.get('http://localhost:3000/orders');

    runInAction(() => {
      store.orderList = response.data.orders || [];
    });
  };

  useEffect(() => {
    console.log(orderList);
    setRows(
      orderList.map((value, idx) => ({
        // ...mileage,
        // TODO; id가 겹치는 경우도 존재 유사한 로직의 경우에 + idx 필요
        id: value.id,
        [gridColumnType.number]: value.id,
        [gridColumnType.createdAt]: value.created_at,
        [gridColumnType.status]: value.status,
        [gridColumnType.applicantAddress]: value.applicant.address,
        [gridColumnType.applicantName]: value.applicant.name,
        [gridColumnType.applicantPhone]: value.applicant.phone,
        [gridColumnType.destAddress]: value.dest.address,
        [gridColumnType.destName]: value.dest.name,
        [gridColumnType.destPhone]: value.dest.phone,
      })),
    );
  }, [orderList]);

  return (
    <Container>
      <TitleContainer>
        <FlexContainer>
          <YearTitle>연도</YearTitle>
          <Box width="51px" />
          <Input type="number" />
        </FlexContainer>

        <SearchButton onClick={handleSearch}>검색</SearchButton>
      </TitleContainer>

      <Box height="24px" />

      <DataGrid
        columns={Columns}
        rows={rows}
        autoHeight
        hideFooter
        disableColumnMenu
      />

    </Container>
  );
};

export default observer(App);
