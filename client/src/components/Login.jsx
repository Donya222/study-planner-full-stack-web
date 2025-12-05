import { Container, Row, Col, FormGroup, Label, Button } from 'reactstrap';
import Logo from '../assets/logo.png';
import { UserSchemaValidation } from '../validations/userSchemaValidation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../features/UserSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users.user);
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isError = useSelector((state) => state.users.isError);

  // Validation
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(UserSchemaValidation)
  });

 
  const onSubmit = (data) => {
    console.log("Submitting form with data:", data); 
    dispatch(getUser(data));
  };
  useEffect(() => {

    if (isSuccess && user?.email) {
      navigate("/home");
    }
  }, [user, isSuccess, navigate]);

  return (
    <Container fluid>
      <Row className='div-row'>
        <Col md='6' className='div-col'>
          <form className='div-form' onSubmit={handleSubmit(onSubmit)}>
            <img alt='Logo' src={Logo} className='img-fluid rounded mx-auto d-block' style={{ width: '150px' }} />
            <div 
              style={{
                backgroundColor: '#2b63d9',
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                textAlign: 'center',
                marginTop: '10px',
                marginBottom: '25px'
              }}
            >
              <h4 style={{ color: 'white', margin: 0, fontWeight: '700' }}>Sign In</h4>
            </div>

            <FormGroup>
              <Label>Email</Label>
              <input
                {...register("email")}
                className="form-control"
                type="email"
                placeholder="Enter your email"
              />
              <p className='text-danger'>{errors.email?.message}</p>
            </FormGroup>

            <FormGroup>
              <Label>Password</Label>
              <input
                {...register("password")}
                className="form-control"
                type="password"
                placeholder="Enter your password"
              />
              <Link to="/forget-password" className="small text-decoration-none">
                Forgot Password?
              </Link>
              <p className='text-danger'>{errors.password?.message}</p>
            </FormGroup>

            <Button
              type="submit"
              color='primary'
              className="small-btn"
            >
              Sign In
            </Button>

            <div className='text-center mt-2'>
              <Label>Don't have an Account? <Link to="/register">Sign Up</Link></Label>
            </div>
            
          
            {isError && <p className="text-center text-danger mt-2">Login failed. Please check your credentials.</p>}
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;


















