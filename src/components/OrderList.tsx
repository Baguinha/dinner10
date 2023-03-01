import { Box, Button, Divider, Icon, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IProduct, ITable } from '../types';
import { TableListItem } from './TableListItem';
import Add from '@mui/icons-material/Add';
import LocalDining from '@mui/icons-material/LocalDining';
import Dining from '@mui/icons-material/Dining';
import { padding } from '@mui/system';
import {
     AttachMoney,
     Close,
     NoMeals,
     ReceiptLong,
     Restaurant,
     SetMeal,
     ShoppingCart,
} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

interface IOrderListProps {
     table: ITable | undefined;
     onAddProduct: () => void;
     isOpen: boolean;
     onClose: () => void;
}

export const OrderList = (props: IOrderListProps) => {
     const [orderList, setOrderList] = useState<IProduct[]>([] || null);
     const [isOpen, setIsOpen] = useState(false);

     useEffect(() => {
          setIsOpen(props.isOpen);
     }, [props.isOpen]);

     return (
          <div
               style={{
                    padding: '20px',
                    maxWidth: '50%',
                    margin: 'auto',
                    display: props.isOpen ? 'inherit' : 'none',
               }}
          >
               <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
               >
                    <Button
                         // style={{ marginRight: 'auto' }}
                         color="secondary"
                         endIcon={<AddIcon />}
                         startIcon={
                              <Typography variant="button" color="secondary">
                                   Add Order
                              </Typography>
                         }
                         onClick={() => {
                              props.onAddProduct();
                         }}
                    ></Button>
                    <Button
                         // style={{ marginLeft: 'auto' }}
                         color="secondary"
                         endIcon={<Close />}
                         startIcon={
                              <Typography variant="button" color="secondary">
                                   Close
                              </Typography>
                         }
                         onClick={() => {
                              props.onClose();
                         }}
                    ></Button>
               </div>
               <Divider />
               <div style={{ padding: '20px' }}>
                    <Box
                         sx={{
                              bgcolor:
                                   props?.table?.order &&
                                   props.table.order.length > 0
                                        ? 'secondary.main'
                                        : 'text.disabled',
                         }}
                         className="orderListContainer"
                    >
                         {props?.table?.order &&
                         props.table.order.length > 0 ? (
                              props?.table.order.map(
                                   (element: any, index: number) => {
                                        return (
                                             <div
                                                  key={index}
                                                  style={{
                                                       display: 'flex',
                                                       justifyContent:
                                                            'space-between',

                                                       //   padding: '10px',
                                                  }}
                                             >
                                                  <Typography
                                                       variant="body2"
                                                       color="text.secondary"
                                                       sx={{
                                                            fontWeight: 600,
                                                            padding: 'padding: 0px 20px 0px 20px;',
                                                            display: 'flex',
                                                            alignItems:
                                                                 'center',
                                                            minWidth: '65%',
                                                       }}
                                                  >
                                                       <Restaurant
                                                            style={{
                                                                 padding: '10px',
                                                            }}
                                                       />
                                                       {element.product.name}
                                                  </Typography>
                                                  <Typography
                                                       variant="body2"
                                                       color="text.secondary"
                                                       sx={{
                                                            fontWeight: 600,
                                                            padding: 'padding: 0px 20px 0px 20px;',
                                                            display: 'flex',
                                                            alignItems:
                                                                 'center',
                                                       }}
                                                  >
                                                       <IconButton
                                                            disableRipple={true}
                                                            aria-label="TableRestaurantIcon"
                                                            style={{
                                                                 cursor: 'auto',
                                                            }}
                                                       >
                                                            <AttachMoney color="action" />
                                                       </IconButton>

                                                       {element.product.price}
                                                  </Typography>
                                                  <Typography
                                                       color="text.secondary"
                                                       variant="body2"
                                                       sx={{
                                                            fontWeight: 600,
                                                            padding: 'padding: 0px 20px 0px 20px;',
                                                            display: 'flex',
                                                            alignItems:
                                                                 'center',
                                                            paddingRight:
                                                                 '10px',
                                                       }}
                                                  >
                                                       <IconButton
                                                            disableRipple={true}
                                                            aria-label="TableRestaurantIcon"
                                                            style={{
                                                                 cursor: 'auto',
                                                            }}
                                                       >
                                                            <ShoppingCart color="action" />
                                                       </IconButton>

                                                       {element.quantity}
                                                  </Typography>

                                                  {/*  */}
                                             </div>
                                        );
                                   }
                              )
                         ) : (
                              <Typography
                                   variant="body2"
                                   sx={{
                                        color: '#414141',
                                        fontWeight: 600,
                                        padding: 'padding: 0px 20px 0px 20px;',
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingRight: '10px',
                                   }}
                              >
                                   <IconButton
                                        disableRipple={true}
                                        aria-label="TableRestaurantIcon"
                                        style={{
                                             cursor: 'auto',
                                        }}
                                   >
                                        <NoMeals color="action" />
                                   </IconButton>

                                   {'No orders yet'}
                              </Typography>
                         )}
                    </Box>
               </div>
          </div>
     );
};
