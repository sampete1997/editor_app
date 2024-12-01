import axios from "axios"

export const loginService  = async (payload) => {

    try {
        const result = await axios.post(
            `${window.server_url}/api/auth/login`,
            payload,
            {
              headers: {
                // Authorization: `Bearer`, // Add your token or other headers here
                "Content-Type": "application/json",
              },
            }
          );
          const response = result?.data
          console.log('response', response);
          return response;

    }catch(err){
        throw new Error(err);
    }
  

}

