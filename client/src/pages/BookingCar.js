import { Col, Row, Divider, DatePicker, Checkbox, Modal,Button } from "antd";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';

import { getAllCars } from '../redux/actions/carsActions';
import moment from 'moment'
import { bookCar } from "../redux/actions/bookingActions";
import StripeCheckout from 'react-stripe-checkout';

const {RangePicker}=DatePicker
function BookingCar() {
  const { cars } = useSelector(state => state.carsReducer);
  const { loading } = useSelector(state => state.alertsReducer);
  const [car, setCar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setdriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Use useParams hook to access route parameters
  const { carid } = useParams();

  useEffect(() => {
    if(cars.length==0){
      dispatch(getAllCars())
    }

    else{
      setCar(cars.find(o => o._id === carid));
    }
  }, [cars]);


  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + 30 * totalHours);
    }
  }, [driver, totalHours]);



  
  function selectTimeSlots(values) {
    // Add a guard clause to handle null or undefined values
    if (!values || values.length < 2) {
      // Handle the case when values are null, undefined, or insufficient
      return;
    }
    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
    setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));
  
    setTotalHours(values[1].diff(values[0], "hours"));
  }
  

 
  function onToken(token){
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookCar(reqObj));
  }



  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24} className='p-3'>
          <img src={car.image} className="carimg2 bs1 w-100" data-aos='flip-left' data-aos-duration='1500'/>
        </Col>
        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal" dashed>
            Car Info
          </Divider>
          <div style={{ textAlign: "right" }}>
            <p>{car.name}</p>
            <p>{car.rentPerHour} Rent Per hour /-</p>
            <p>Fuel Type : {car.fuelType}</p>
            <p>Max Persons : {car.capacity}</p>
          </div>

          <Divider type="horizontal" dashed>
            Select Time Slots
          </Divider>

          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={selectTimeSlots}
          />
          <br/>
          <Button className="btn1 mt-2 " onClick={()=>(setShowModal(true))}>See Booked Slots</Button>
          {from && to && (
            <div style={{ textAlign: "right" }}>
              <p>Total Hours : {totalHours}</p> 
              <p>Rent Per Hour : <b>{car.rentPerHour}</b></p>
              <Checkbox
                onChange={(e) => {
                  setdriver(e.target.checked);
                }}
              >Driver Required
              </Checkbox>
              <h3>Total Amount : {totalAmount}</h3>

              <StripeCheckout
  shippingAddress
  token={onToken}
  currency='INR'
  amount={totalAmount * 100}
  stripeKey="pk_test_51PCyDdSGyVnMovWeXukwYDB9WhCmbP4lN1cp8VA35pOoxPttCUp43jg8r9fYvVMojRfC9gEbe7oRtCf5DzHXjf7T00u14wL0Ch"
>
  <Button className="btn1">Book Now</Button>
</StripeCheckout>
            </div>
          )}
        </Col>
        <Modal
        visible={showModal}
        closable={false}
        footer={false}
        title="Booked time slots"
      >
        {car.bookedTimeSlots && car.bookedTimeSlots.length > 0 ? (
          <div className="p-2">
            {car.bookedTimeSlots.map((slot) => (
              <Button className="btn1 mt-2" key={slot.from}>
                {slot.from} - {slot.to}
              </Button>
            ))}
            <div className="text-right mt-5">
              <Button
                className="btn1"
                onClick={() => {
                  setShowModal(false);
                }}
              >CLOSE</Button>
            </div>
          </div>
        ) : (
          <p>No booked time slots available</p>
          
          
        )}
      </Modal>
      </Row>
    </DefaultLayout>
  );
}

export default BookingCar;
