import { AttachMoney, LocalDining } from '@mui/icons-material';

import {
     Button,
     Divider,
     Modal,
     Paper,
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
     const [isValid, setIsValid] = React.useState(false);
     const [total, setTotal] = React.useState(0);

     useEffect(() => {
          setOpen(props.isOpen);
     }, [props.isOpen]);

     useEffect(() => {
          setOrder(props.order);
     }, [props.order]);

     useEffect(() => {
          const t = order
               .map((element) => element.product.price * element.quantity)
               .reduce((a, b) => a + b, 0);
          setTotal(t);
     }, [order]);

     useEffect(() => {
          order.find((element) => {
               if (element.quantity > 0) setIsValid(true);
               else {
                    setIsValid(false);
               }
          });
     }, [order]);

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
     };

     const fillDefaultQnt = (productId: number) => {
          const orderItem = order.find(
               (order) => order.product.id === productId
          );
          return orderItem ? orderItem.quantity : 0;
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
                                   <Typography
                                        style={{
                                             display: 'flex',
                                             alignItems: 'center',
                                             minWidth: '150px',
                                        }}
                                        variant="body1"
                                        color={'secondary'}
                                   >
                                        <AttachMoney
                                             color={'secondary'}
                                             style={{
                                                  padding: '10px',
                                             }}
                                        />
                                        {product.price}
                                   </Typography>
                                   <TextField
                                        defaultValue={fillDefaultQnt(
                                             product.id
                                        )}
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
                    <div>
                         <Typography
                              style={{
                                   display: 'flex',
                                   alignItems: 'center',
                                   justifyContent: 'center',
                                   padding: '20px',
                              }}
                              color="secondary"
                              variant="h4"
                         >
                              {`Total: ${total}`}
                              <AttachMoney
                                   color={'secondary'}
                                   fontSize="large"
                              />
                         </Typography>
                    </div>

                    <div className="form-btn">
                         <Button
                              disabled={!isValid}
                              color="secondary"
                              variant="contained"
                              onClick={() => {
                                   props.onSave(order);
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
