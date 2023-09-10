import axios from "axios";

const getAvatar = (username:string)=>{
    axios.get("http://localhost:10000/user?username="+username).then((res)=>{
        console.log(res.data[0].avatar);
        return res.data[0].avatar;
    })
}
export default getAvatar;