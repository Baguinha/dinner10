import { Button, Divider, IconButton, Typography } from '@mui/material';
import React from 'react';
import { ITable } from '../types';
import { TableListItem } from './TableListItem';
import Add from '@mui/icons-material/Add';
import Dining from '@mui/icons-material/Dining';
import { padding } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';

interface ITableListProps {
     tables: ITable[];
     onAdd: () => void;
     onDelete: (selectedTable: number) => void;
     onAddClient: (selectedTable: number) => void;
     onDeleteClient: (selectedTable: number) => void;
     onShowOrderList: (selectedTable: number) => void;
}

export const TableList = (props: ITableListProps) => {
     return (
          <div style={{ padding: '20px', maxWidth: '50%', margin: 'auto' }}>
               <div>
                    <Button
                         color="secondary"
                         endIcon={<AddIcon />}
                         startIcon={
                              <Typography variant="button" color="secondary">
                                   Add table
                              </Typography>
                         }
                         onClick={() => {
                              props.onAdd();
                         }}
                    ></Button>
               </div>
               <Divider />
               <div style={{ padding: '20px' }}>
                    {props.tables.map((table) => (
                         <TableListItem
                              key={table.num}
                              table={table}
                              onDelete={props.onDelete}
                              onAddClient={props.onAddClient}
                              onDeleteClient={props.onDeleteClient}
                              onShowOrderList={props.onShowOrderList}
                         />
                    ))}
               </div>
          </div>
     );
};
