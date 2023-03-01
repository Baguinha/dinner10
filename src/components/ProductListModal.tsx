import { Group, LocalDining } from '@mui/icons-material';

import {
     Box,
     Button,
     Divider,
     FormControl,
     IconButton,
     InputLabel,
     MenuItem,
     Modal,
     Paper,
     Select,
     TextField,
     Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { IProduct, IOrder } from '../types';

interface IProductListModalProps {
     products: IProduct[];
     isOpen: boolean;
     onClose: () => void;
     onSave: (newOrder: IOrder[]) => void;
     order: IOrder[];
}

export const ProductListModal = (props: IProductListModalProps) => {
     const [open, setOpen] = React.useState(false);
     const [order, setOrder] = React.useState<IOrder[]>(props?.order);

     useEffect(() => {
          setOpen(props.isOpen);
     }, [props.isOpen]);
     console.log('%%%%', props.order);

     // useEffect(() => {
     //      const newthing = order.filter(
     //           (orderItem) => orderItem.quantity !== 0
     //      );
     //      console.log('new', newthing);
     //      setOrder(newthing);
     //      console.log('order', order);
     //      console.log('props', props.order);
     // }, [props.order]);

     const onAddOrder = (quantity: number, productId: number) => {
          // If order already exist
          // Find the product
          if (order.length > 0) {
               const foundProductOnOrder = order.find((obj) => {
                    if (obj.product.id === productId) return true;
                    else return false;
               });
               // If this product already exist and qnt exist
               // Update the qnt
               if (foundProductOnOrder) {
                    if (quantity === 0) {
                         const newthing = order.filter(
                              (orderItem) => orderItem.product.id !== productId
                         );
                         setOrder(newthing);
                    } else {
                         const newOrderList = order.map((order) => {
                              if (order.product.id === productId) {
                                   const updatedOrder = {
                                        ...order,
                                        quantity: quantity,
                                   };
                                   return updatedOrder;
                              }
                              return order;
                         });
                         setOrder(newOrderList);
                    }

                    // If this product alredy exist but the qnt is 0
                    // Add one
               }

               // If this product is not in the list
               // Add one
               else {
                    const foundProductOnMenu = props.products.find(
                         (product) => product.id === productId
                    );
                    if (quantity !== 0) {
                         const newOrder: IOrder = {
                              product: foundProductOnMenu!,
                              quantity: quantity,
                         };
                         setOrder((order) => [...order, newOrder]);
                    }
               }
               // If order is empty yet
               // Create one
          } else {
               const foundProductOnMenu = props.products.find(
                    (product) => product.id === productId
               );
               if (foundProductOnMenu)
                    setOrder([
                         { product: foundProductOnMenu, quantity: quantity },
                    ]);
          }
          // console.log(order);
          // const newthing = order.filter(
          //      (orderItem) => orderItem.quantity !== 0
          // );

          // setOrder(newthing);
          // console.log('%%%5', newthing);
          // console.log(order);
     };

     return (
          <Modal
               open={open}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
          >
               <Paper
                    className="form-modal"
                    elevation={0}
                    sx={{
                         border: 2,
                         borderColor: 'secondary.main',
                         borderRadius: '5%',
                         bgcolor: 'secondary',
                    }}
               >
                    <div className="form-item">
                         <Typography color={'secondary'} variant="h3">
                              Add a product
                         </Typography>
                    </div>
                    <Divider />

                    <div className="form-item" style={{ padding: '20px' }}>
                         {props.products.map((product) => (
                              <div
                                   style={{
                                        padding: '10px',
                                        display: 'flex',
                                        minWidth: 'fit-content',
                                   }}
                                   key={product.id}
                              >
                                   <Typography
                                        style={{
                                             display: 'flex',
                                             alignItems: 'center',
                                             minWidth: '250px',
                                        }}
                                        variant="body1"
                                        color={'secondary'}
                                   >
                                        <LocalDining
                                             color={'secondary'}
                                             style={{
                                                  padding: '10px',
                                             }}
                                        />
                                        {product.name}
                                   </Typography>
                                   <TextField
                                        color={'secondary'}
                                        sx={{ m: 1, width: '100px' }}
                                        size="small"
                                        title={product.name}
                                        id={product.id.toString()}
                                        label={'quantidade'}
                                        type="number"
                                        onChange={(e) => {
                                             // setOrder([e.target.value]);
                                             onAddOrder(
                                                  Number(e.target.value),
                                                  Number(e.target.id)
                                             );
                                        }}
                                   />
                              </div>
                         ))}
                    </div>

                    <div className="form-btn">
                         <Button
                              color="secondary"
                              variant="contained"
                              onClick={() => {
                                   // props.onSave(
                                   //      tableNum,
                                   //      seatsAvNum,
                                   //      seatsOcNum
                                   // );
                                   // props.onClose();
                                   props.onSave(order);
                                   console.log('onclick Save');
                                   // console.log(order);
                              }}
                         >
                              Save
                         </Button>
                         <Button
                              color="secondary"
                              onClick={() => props.onClose()}
                         >
                              Cancel
                         </Button>
                    </div>
               </Paper>
          </Modal>
     );
};
