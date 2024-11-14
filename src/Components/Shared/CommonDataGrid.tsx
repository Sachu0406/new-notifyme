import React, { useState, useEffect } from "react";
import { Table, Pagination, Button, FormControl, Form } from "react-bootstrap";
import { FaSyncAlt } from "react-icons/fa";

interface Column {
  field: string;
  headerName: string;
  width?: string;
  renderCell?: (row: any) => JSX.Element;
  filterable?: boolean;
}

interface DataGridProps {
  data: any[];
  rowsPerPage: number;
  columns: Column[];
  fetchData: () => void;
  gridFilters: boolean;
}

const CommonDataGrid: React.FC<DataGridProps> = ({
  data,
  rowsPerPage: initialRowsPerPage,
  columns,
  fetchData,
  gridFilters,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [filteredData, setFilteredData] = useState(data);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  useEffect(() => {
    const filtered = data.filter((row) =>
      columns.every((col) => {
        if (!col.filterable) return true;
        const value = row[col.field];
        return (
          value !== undefined &&
          value
            .toString()
            .toLowerCase()
            .includes(filters[col.field]?.toLowerCase() || "")
        );
      })
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [filters, data, columns]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
    if (showFilter) {
      setFilters({});
    }
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page whenever rows per page changes
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const startRecord = (currentPage - 1) * rowsPerPage + 1;
  const endRecord = Math.min(currentPage * rowsPerPage, filteredData.length);

  const renderPaginationItems = () => {
    let items = [];
    const ellipsis = <Pagination.Ellipsis key="ellipsis" />;

    if (totalPages <= 4) {
      for (let number = 1; number <= totalPages; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        );
      }
    } else {
      if (currentPage <= 3) {
        for (let number = 1; number <= 3; number++) {
          items.push(
            <Pagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </Pagination.Item>
          );
        }
        items.push(ellipsis);
        items.push(
          <Pagination.Item
            key={totalPages}
            active={totalPages === currentPage}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Pagination.Item>
        );
      } else if (currentPage >= totalPages - 2) {
        items.push(
          <Pagination.Item
            key={1}
            active={1 === currentPage}
            onClick={() => handlePageChange(1)}
          >
            {1}
          </Pagination.Item>
        );
        items.push(ellipsis);
        for (let number = totalPages - 2; number <= totalPages; number++) {
          items.push(
            <Pagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </Pagination.Item>
          );
        }
      } else {
        items.push(
          <Pagination.Item
            key={1}
            active={1 === currentPage}
            onClick={() => handlePageChange(1)}
          >
            {1}
          </Pagination.Item>
        );
        items.push(ellipsis);
        for (
          let number = currentPage - 1;
          number <= currentPage + 1;
          number++
        ) {
          items.push(
            <Pagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </Pagination.Item>
          );
        }
        items.push(ellipsis);
        items.push(
          <Pagination.Item
            key={totalPages}
            active={totalPages === currentPage}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Pagination.Item>
        );
      }
    }
    return items;
  };

  return (
    <div className="container">
      {gridFilters && <hr className="mb-1" />}
      <div className="d-flex justify-content-between mb-1">
        <Form.Select
          className="ms-2"
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          style={{ width: "auto" }}
        >
          <option value={10}>10 rows</option>
          <option value={20}>20 rows</option>
          <option value={50}>50 rows</option>
          <option value={100}>100 rows</option>
        </Form.Select>
        {gridFilters && (
          <>
            <button className="btn btn-primary ms-2" onClick={handleShowFilter}>
              {showFilter ? "Hide Filter" : "Show Filter"}
            </button>
          </>
        )}
      </div>
      <Table striped bordered hover responsive className="mb-1">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                style={{ width: col.width || "100px", textAlign: "center" }}
              >
                {col.headerName}
              </th>
            ))}
          </tr>
          {showFilter && (
            <tr>
              {columns.map((col, index) => (
                <th key={index}>
                  {col.filterable !== false && (
                    <FormControl
                      type="text"
                      placeholder={`Filter ${col.headerName}`}
                      value={filters[col.field] || ""}
                      onChange={(e) =>
                        handleFilterChange(col.field, e.target.value)
                      }
                    />
                  )}
                </th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  style={{ width: col.width || "100px", textAlign: "center" }}
                >
                  {col.renderCell ? col.renderCell(row) : row[col.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between align-items-baseline">
        <Pagination className="mb-1">{renderPaginationItems()}</Pagination>
        <div className="d-flex align-items-center">
          {endRecord - startRecord + 1 + ` of ${filteredData.length} records`}
        </div>
        <Button onClick={fetchData} className="">
          <FaSyncAlt />
        </Button>
      </div>
      <hr className="m-0" />
    </div>
  );
};

export default CommonDataGrid;
