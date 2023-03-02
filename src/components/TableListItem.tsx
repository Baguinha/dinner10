// import '../App.css';
import '../App.css';
import { Box, Button, IconButton, Typography } from '@mui/material';
import React from 'react';
import { ITableListItemProps } from '../types';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import {
     Delete,
     Check,
     Close,
     GroupAdd,
     GroupRemove,
     Group,
     ReceiptLong,
} from '@mui/icons-material/';

export const TableListItem = (props: ITableListItemProps) => {
     return (
          <Box
               sx={{
                    bgcolor: props.table.clients
                         ? 'secondary.main'
                         : 'text.disabled',
               }}
               className="tableContainer"
          >
               <div
                    style={{
                         display: 'inline-flex',
                         alignItems: 'center',
                    }}
               >
                    <IconButton
                         disableRipple={true}
                         aria-label="TableRestaurantIcon"
                         style={{ cursor: 'auto' }}
                    >
                         <TableRestaurantIcon color="action" />
                    </IconButton>
                    <Typography
                         variant="body2"
                         color="text.secondary"
                         sx={{
                              // color: '#414141',
                              fontWeight: 600,
                              padding: 'padding: 0px 20px 0px 20px;',
                         }}
                    >
                         {props.table.num.toString()}
                    </Typography>
               </div>

               <div
                    style={{
                         display: 'inline-flex',
                         alignItems: 'center',
                    }}
               >
                    <IconButton
                         // color="secondary"
                         disableRipple={true}
                         aria-label="Group"
                         style={{ cursor: 'auto' }}
                    >
                         <Group color="action" />
                    </IconButton>
                    <Typography
                         color="text.secondary"
                         variant="body2"
                         sx={{
                              // color: '#414141',
                              fontWeight: 600,
                         }}
                    >
                         ({props.table.clients}/{props.table.seatsAvailable})
                    </Typography>
               </div>

               <IconButton
                    disabled={
                         props.table.clients === props.table.seatsAvailable
                              ? true
                              : false
                    }
                    aria-label="GroupAdd"
                    onClick={() => {
                         props.onAddClient(props.table.num);
                    }}
               >
                    <GroupAdd color="action" style={{ cursor: 'pointer' }} />
               </IconButton>
               <IconButton
                    disabled={props.table.clients === 0 ? true : false}
                    aria-label="GroupRemove"
                    onClick={() => {
                         props.onDeleteClient(props.table.num);
                    }}
               >
                    <GroupRemove color="action" style={{ cursor: 'pointer' }} />
               </IconButton>
               <IconButton
                    disabled={!props.table.clients}
                    aria-label="ReceiptLong"
                    onClick={(e) => {
                         props.onShowOrderList(props.table.num);
                         e.stopPropagation();
                         e.preventDefault();
                    }}
               >
                    <ReceiptLong style={{ cursor: 'pointer' }} />
               </IconButton>
               <IconButton
                    disabled={!!props.table.clients}
                    aria-label="Delete"
                    onClick={() => {
                         props.onDelete(props.table.num);
                    }}
               >
                    <Delete style={{ cursor: 'pointer' }} />
               </IconButton>
          </Box>
     );
};
