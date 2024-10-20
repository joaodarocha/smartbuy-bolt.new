import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface MaterialTableProps<T> {
  columns: string[];
  data: T[];
}

const MaterialTable = <T extends { [key: string]: number }>({
                                                              columns,
                                                              data
                                                            }: MaterialTableProps<T>) => {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>{t(column)}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column}>{row[column].toFixed(3)}%</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaterialTable;
