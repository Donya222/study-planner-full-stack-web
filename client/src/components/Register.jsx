import {Container,Row,Col, FormGroup, Label, Button} from 'reactstrap';
import Logo from '../assets/logo.png';
import { UserRegisterSchemaValidation } from '../validations/UserRegisterSchemaValidation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { addUser } from '../features/UserSlice';
import {useDispatch,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Register=()=>{
    let [email,setEmail]=useState('');
    let [password,setPassword]=useState('');
    let [uname, setUname] = useState('');
    let [location,setLoc]=useState('');
    const dispatch=useDispatch();
    const message=useSelector((state)=>state.users.message);
    const navigate=useNavigate();

    const {
        register,
        handleSubmit:submitForm,
        formState:{errors}
    } = useForm({resolver:yupResolver(UserRegisterSchemaValidation)});

    const validate = ()=>{
        const data={
            uname:uname,
            email:email,
            password:password,
            location:location
        }
        dispatch(addUser(data));
        navigate("/");
    }

    return(
 <div>
      <Container fluid>
        <Row className="div-row">
          <Col md="6" className="div-col">
            <form className="div-form">
              <div>
                <img
                  alt="Logo"
                  className="img-fluid rounded mx-auto d-block"
                  src={Logo}
                  style={{ width: "150px" }}
                />
              </div>

              <div
                style={{
                  backgroundColor: '#2b63d9',
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  marginTop: '10px',
                  marginBottom: '20px'
                }}
              >
                <h4 style={{ color: 'white', margin: 0, fontWeight: '700' }}>
                  Sign Up
                </h4>
              </div>

              <FormGroup>
                <Label>Name</Label>
                <input
                  {...register('uname', {
                    value: uname,
                    onChange: (e) => setUname(e.target.value)
                  })}
                  placeholder="Enter your name"
                  type="text"
                  className="form-control"
                />
                <p style={{ color: 'red' }}>{errors.uname?.message}</p>
              </FormGroup>

              <FormGroup>
                <Label>Email</Label>
                <input
                  {...register('email', {
                    value: email,
                    onChange: (e) => setEmail(e.target.value)
                  })}
                  placeholder="Enter your email"
                  type="email"
                  className="form-control"
                />
                <p style={{ color: 'red' }}>{errors.email?.message}</p>
              </FormGroup>


              <FormGroup>
                <Label>Password</Label>
                <input
                  {...register('password', {
                    value: password,
                    onChange: (e) => setPassword(e.target.value)
                  })}
                  placeholder="Enter your password"
                  type="password"
                  className="form-control"
                />
                <p style={{ color: 'red' }}>{errors.password?.message}</p>
              </FormGroup>

              <FormGroup>
                <Label>Location</Label>
                <input
                  {...register('location', {
                    value: location,
                    onChange: (e) => setLoc(e.target.value)
                  })}
                  placeholder="Enter your location"
                  type="text"
                  className="form-control"
                />
                <p style={{ color: 'red' }}>{errors.location?.message}</p>
              </FormGroup>

              {/* Submit */}
              <FormGroup>
                <Button
                  onClick={submitForm(validate)}
                  className="small-btn"
                  color="primary"
                >
                  Sign Up
                </Button>
              </FormGroup>

              {/* Message */}
              <FormGroup>
                <p>{message}</p>
              </FormGroup>

              <div className="text-center mt-2">
                <Label>
                  Already have an account? <Link to="/">Sign In</Link>
                </Label>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>

    );
}

export default Register;
