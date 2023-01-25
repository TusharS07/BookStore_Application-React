import React from 'react'
import { Table } from 'react-bootstrap';
import orderPlacedImg from '../../assets/orderPlaced.PNG'
import Header from '../../components/Header/Header'

import './PlacedSuccessfull.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import PlaceOrder from '../../components/PlaceOrder/PlaceOrder';

const PlacedSuccessfull = () => {

    let navigate = useNavigate();

  return (
    <div>
        <Header/>
        <img src={orderPlacedImg} className="img" />
        <div className="confirmationMsg" >
            <h4>hurry!!! Your Order is confirmed <br />
            we have emailed your Order confirmation, <br />
            and will send you an update when your order has shipped.
            </h4>
        </div>
        <Table className='contactus'>
            <thead>
                <tr>
                    <th>Email us </th>
                    <th>Contact us</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>admin@bookstore.com</td>
                    <td>1800 202 9898</td>
                    <td>Malhotra Chambers, BridgeLabz Solutions Private Limited, <br/>
                        1st Floor, Deonar, Govandi East, Mumbai,<br/>
                         Maharashtra 400088</td>
                </tr>
            </tbody>
        </Table>
        <Button variant="contained" onClick = {() => { navigate("/")}} sx={{ ml: 81, mt: 3 }}>CONTINUE SHOPPING</Button>
    </div>
  )
}

export default PlacedSuccessfull