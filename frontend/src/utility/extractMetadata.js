import axios from "axios";

let extract = async (uri) => {
    let res = await axios.get(`https://ipfs.io/ipfs/${uri}`);
    if (res) {
        // console.log("Got Data", res.data.data);
        return {
            name : res.data.name,
            desc : res.data.description,
            properties : res.data.properties,
            imgUri : res.data.data
        }
        
    }
}

export default extract;