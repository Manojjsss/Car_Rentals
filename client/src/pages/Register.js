import React from 'react';
import { Row, Col, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { userRegister } from '../redux/actions/userActions';
import { useDispatch , useSelector} from 'react-redux';
import AOS from 'aos';
import Spinner from '../components/Spinner';
import 'aos/dist/aos.css'; // You can also use <link> for styles

// ..
AOS.init();

function Register() {
  const dispatch = useDispatch();
  const {loading}=useSelector(state=>state.alertsReducer)

  // Custom validation function for confirming password
  const validateConfirmPassword = (_, value) => {
    const { getFieldValue } = form;
    if (value && value !== getFieldValue('password')) {
      return Promise.reject('The two passwords that you entered do not match!');
    }
    return Promise.resolve();
  };

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    dispatch(userRegister(values));
    console.log(values);
  };

  return (
    <div className='login'>
      {loading && (<Spinner/>)}

      <Row gutter={16} className='d-flex align-items-center'>
        <Col lg={16} style={{ position: 'relative' }}>
          <img
            data-aos='slide-left'
            data-aos-duration='1500'
            src='https://wallpaperaccess.com/full/124020.jpg'
            className='full'
            alt='background'
          />
          <h1 className='login-logo'>DriveEasy</h1>
        </Col>
        <Col lg={8} className='text-left p-5'>
          <Form layout='vertical' className='login-form p-5' form={form} onFinish={onFinish}>
            <h1>Register</h1>
            <hr />
            <Form.Item
              name='username'
              label='Username'
              rules={[{ required: true, message: 'Please enter your username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='password'
              label='Password'
              rules={[
                { required: true, message: 'Please enter your password!' },
                { min: 8, message: 'Password must be at least 8 characters long!' },
              ]}
            >
              <Input type='password' />
            </Form.Item>
            <Form.Item
              name='cpassword'
              label='Confirm Password'
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                { min: 8, message: 'Password must be at least 8 characters long!' },
                { validator: validateConfirmPassword },
              ]}
            >
              <Input type='password' />
            </Form.Item>

            <button type='submit' className='btn1 mt-2 mb-3'>
              Register
            </button>
            <br />
            <Link to='/Login'>Click Here to Login</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
