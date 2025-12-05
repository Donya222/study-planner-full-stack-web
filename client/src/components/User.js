import { useSelector } from 'react-redux';

const User=()=>{
    const uname=useSelector((state)=>state.users.user.uname);
    return(
        <>
            <h1>{uname}</h1>
        </>
    )
}
export default User;