import { DarkMode, Dining } from '@mui/icons-material';
import { Button, Divider, IconButton, Paper, Typography } from '@mui/material';
import { table } from 'console';
import React, { useEffect, useState } from 'react';
import { OrderList } from './components/OrderList';
import { ProductListModal } from './components/ProductListModal';
import { TableAddModal } from './components/TableAddModal';
import { TableList } from './components/TableList';
import { ITable, IProduct, IOrder } from './types';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const initialTables: ITable[] = [
     {
          num: 1,
          seatsAvailable: 4,
          clients: 0,
          order: [],
     },
     {
          num: 2,
          seatsAvailable: 2,
          clients: 1,
          order: [
               {
                    product: {
                         id: 0,
                         type: 'prato-principal',
                         price: 7,
                         name: 'Cozido das furnas',
                    },
                    quantity: 2,
               },
               {
                    product: {
                         id: 1,
                         type: 'sobremesa',
                         price: 4,
                         name: 'Malassadas',
                    },
                    quantity: 1,
               },
          ],
     },
];

const initialProducts: IProduct[] = [
     {
          id: 0,
          type: 'prato-principal',
          price: 7,
          name: 'Cozido das furnas',
     },
     {
          id: 1,
          type: 'sobremesa',
          price: 4,
          name: 'Malassadas',
     },
     {
          id: 2,
          type: 'bebida',
          price: 2.5,
          name: 'Kima',
     },
];

function App() {
     const [IsDarkTheme, setIsDarkTheme] = useState(false);
     const [tables, setTables] = useState(initialTables);
     const [products, setproducts] = useState(initialProducts);
     const [tableDetails, setTableDetails] = useState<ITable>() || undefined;
     const [tableAddModalIsOpen, setTableAddModalIsOpen] = useState(false);
     const [orderAddModalIsOpen, setOrderAddModalIsOpen] = useState(false);

     // const [orderList, setOrderList] = useState<IProduct[]>([]);
     // const [productsList, setProductsList] = useState<IProduct[]>([]);

     const darkTheme = createTheme({
          palette: {
               mode: 'dark',
          },
     });
     const lightTheme = createTheme({
          palette: {
               mode: 'light',
          },
     });

     useEffect(() => {
          setTables(tables);
     }, [tables]);

     const addTable = (
          tableNu: number,
          seatseatsAvailableNum: number,
          clients: number
     ) => {
          const newTable: ITable = {
               num: tableNu,
               seatsAvailable: seatseatsAvailableNum,
               clients: clients,
               order: [],
          };
          setTables([...tables, newTable]);
     };

     const deleteTable = (selectedTable: number) => {
          const result = tables.filter((table) => table.num !== selectedTable);
          setTables(result);
     };
     const addClient = (selectedTable: number) => {
          const newTableList = tables.map((table) => {
               if (
                    table.num === selectedTable &&
                    table.clients < table.seatsAvailable
               ) {
                    const updatedTable = {
                         ...table,
                         clients: table.clients + 1,
                    };
                    return updatedTable;
               }
               return table;
          });
          console.log(newTableList);
          setTables(newTableList);
     };
     const deleteClient = (selectedTable: number) => {
          const newTableList = tables.map((table) => {
               if (table.num === selectedTable && table.clients > 0) {
                    const updatedTable = {
                         ...table,
                         clients: table.clients - 1,
                    };
                    return updatedTable;
               }
               return table;
          });
          setTables(newTableList);
     };
     const showOrderList = (selectedTable: number) => {
          const foundTable = tables.find(
               (table) => table.num === selectedTable
          );
          if (foundTable) {
               setTableDetails(foundTable);
          }
     };

     const onAddProduct = () => {
          // console.log(productAddOrderModal);
          setOrderAddModalIsOpen(true);
          // setProductAddOrderModal(productAddOrderModal);
     };
     const onCloseOrderList = () => {
          setTableDetails(undefined);
     };

     console.log(tableDetails);

     const updateOrder = (newOrder: IOrder[]) => {
          const newTableList = tables.map((table) => {
               if (table.num === tableDetails?.num) {
                    const updatedTable = {
                         ...table,
                         order: newOrder,
                    };

                    setTableDetails(updatedTable);
                    return updatedTable;
               }

               return table;
          });
          setTables(newTableList);
          setOrderAddModalIsOpen(false);
     };

     return (
          <ThemeProvider theme={IsDarkTheme ? lightTheme : darkTheme}>
               {/* <div className="App"> */}
               <Paper
                    sx={{
                         height: '100vh',
                         bgcolor: 'secondary',
                    }}
                    elevation={0}
               >
                    <div
                         style={{
                              padding: '10px',
                              textAlign: 'center',
                         }}
                    >
                         {/* <Dining
                              color="secondary"
                              fontSize="large"
                              style={{}}
                         /> */}
                         <Typography variant="h2" color="secondary">
                              Dinner 10
                         </Typography>
                         <IconButton
                              onClick={() => {
                                   console.log(IsDarkTheme);
                                   setIsDarkTheme(!IsDarkTheme);
                              }}
                         >
                              <DarkMode color="secondary" />
                         </IconButton>
                    </div>

                    <TableList
                         tables={tables}
                         onDelete={deleteTable}
                         onAdd={() => {
                              setTableAddModalIsOpen(true);
                         }}
                         onAddClient={addClient}
                         onDeleteClient={deleteClient}
                         onShowOrderList={showOrderList}
                    />
                    <OrderList
                         isOpen={!!tableDetails}
                         table={tableDetails}
                         onAddProduct={onAddProduct}
                         onClose={onCloseOrderList}
                    />
                    <TableAddModal
                         onClose={() => {
                              setTableAddModalIsOpen(false);
                         }}
                         isOpen={tableAddModalIsOpen}
                         onSave={addTable}
                    />
                    <ProductListModal
                         order={
                              orderAddModalIsOpen && tableDetails
                                   ? tableDetails.order
                                   : []
                         }
                         products={products}
                         isOpen={orderAddModalIsOpen ? true : false}
                         onClose={() => {
                              setOrderAddModalIsOpen(false);
                         }}
                         onSave={(newOrder) => {
                              updateOrder(newOrder);

                              // console.log('app', order);
                         }}
                    />
               </Paper>
               {/* </div> */}
          </ThemeProvider>
     );
}

export default App;
