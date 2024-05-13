import { Col, Row, Form, Input, Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { editCar, getAllCars } from "../redux/actions/carsActions";
import axios from "axios";

function EditCar({ match }) {
  const { cars } = useSelector((state) => state.carsReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState(null);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      const foundCar = cars.find((o) => o._id === match.params.carid);
      setCar(foundCar);
    }
  }, [cars, match.params.carid]);

  const onFinish = async (values) => {
    if (!car) {
      return;
    }
    const updatedCar = { ...car, ...values };
    try {
      const response = await axios.post("/api/editcar", updatedCar);
      message.success(response.data);
      dispatch(editCar(updatedCar));
    } catch (error) {
      message.error("Failed to update car");
      console.error("Edit car error:", error);
    }
  };

  if (loading || !car) {
    return <Spinner />;
  }

  return (
    <DefaultLayout>
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          <Form
            initialValues={car}
            className="bs1 p-2"
            layout="vertical"
            onFinish={onFinish}
          >
            <h3>Edit Car</h3>
            <hr />
            <Form.Item name="name" label="Car name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image url" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="rentPerHour" label="Rent per hour" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="capacity" label="Capacity" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="fuelType" label="Fuel Type" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <div className="text-right">
              <Button type="primary" htmlType="submit">
                Edit Car
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default EditCar;
