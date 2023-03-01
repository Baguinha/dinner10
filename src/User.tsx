import * as React from 'react';
import { useState } from 'react';
import { IUserProps } from './types';

const User = (props: IUserProps) => {
     return (
          <div>
               <p>greeting</p>
               <h1>User</h1>
               Hello, <b>{props.name}</b>
               <br />
               You are <b>{props.age} years old</b>
               <br />
               You live at: <b>{props.address}</b>
               <br />
               You were born: <b>{props.dob.toDateString()}</b>
          </div>
     );
};

export default User;
