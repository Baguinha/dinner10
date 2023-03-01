import {
     Box,
     Button,
     Divider,
     FormControl,
     InputLabel,
     MenuItem,
     Modal,
     Paper,
     Select,
     TextField,
     Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { ITable } from '../types';

interface ITableAddModalProps {
     onSave: (
          tableN: number,
          SeatsAvailableNum: number,
          SeatsOccupiedNum: number
     ) => void;
     isOpen: boolean;
     onClose: () => void;
}

export const TableAddModal = (props: ITableAddModalProps) => {
     const [open, setOpen] = React.useState(false);
     const [tableNum, setTableNum] = React.useState(0);
     const [seatsAvNum, setSeatsAvNum] = React.useState(0);
     const [seatsOcNum, setSeatsOcNum] = React.useState(0);

     useEffect(() => {
          setOpen(props.isOpen);
     }, [props.isOpen]);

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
                         <Typography color="secondary" variant="h3">
                              Add a table
                         </Typography>
                    </div>
                    <Divider />

                    <div className="form-item">
                         <TextField
                              color="secondary"
                              id="table-num"
                              label="Table number"
                              type="number"
                              onChange={(e) =>
                                   setTableNum(parseInt(e.target.value))
                              }
                         />
                    </div>
                    <div className="form-item">
                         <TextField
                              color="secondary"
                              id="seats-num"
                              label="Seats"
                              type="number"
                              onChange={(e) => {
                                   setSeatsAvNum(parseInt(e.target.value));
                              }}
                         />
                    </div>
                    <div className="form-btn">
                         <Button
                              color="secondary"
                              variant="contained"
                              onClick={() => {
                                   props.onSave(
                                        tableNum,
                                        seatsAvNum,
                                        seatsOcNum
                                   );
                                   props.onClose();
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
