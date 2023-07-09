import React, { useState } from 'react'
import { Page1 } from './Page1';
import { Page2 } from './Page2';
import { Page3 } from './Page3';
import { Page4 } from './Page4';

export const Register: React.FC = () => {

  const [page, setpage] = useState(0)

  return (
    <div>
      {page === 0 && <Page1 setpage={setpage} />}
      {page === 1 && <Page2 setpage={setpage} />}
      {page === 2 && <Page3 setpage={setpage} />}
      {page === 3 && <Page4/>}
    </div>
  )
}

// name: "AjinkyaP",
//         email_id : "ajinkya@gmail.com",
//         mobile_no : "9876543210",
//         password : "12345678901",
//         gender : "Male",
//         age : 30,
//         location : "Pune"