export interface IUserProps {
     name: string;
     age: number;
     address: string;
     dob: Date;
}

export interface IProduct {
     id: number;
     type: 'bebida' | 'prato-principal' | 'sobremesa';
     price: number;
     name: string;
}

export interface ITable {
     num: number;
     seatsAvailable: number;
     clients: number;
     order: IOrder[];
}

export interface IOrder {
     product: IProduct;
     quantity: number;
}

export interface ITableListItemProps {
     table: ITable;
     onDelete: (selectedTable: number) => void;
     onAddClient: (selectedTable: number) => void;
     onDeleteClient: (selectedTable: number) => void;
     onShowOrderList: (selectedTable: number) => void;
}

// interface ITableListProps {
//      tables: ITable[];
//      onDelete: (selectedTable: number) => void;
// }
