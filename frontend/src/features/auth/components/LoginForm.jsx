import React, {
  useState,
} from "react";


import {
  useNavigate,
} from "react-router-dom";


import useAuth from "@/hooks/useAuth";



const LoginForm = () => {


  const navigate =
    useNavigate();



  const {
    login,
  } = useAuth();



  const [form,setForm] =
    useState({

      email:"",
      password:"",

    });



  const [error,setError] =
    useState("");



  const [loading,setLoading] =
    useState(false);





  const handleChange = (e)=>{


    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });


  };





  const handleSubmit =
  async(e)=>{


    e.preventDefault();


    try{


      setLoading(true);

      setError("");



      await login(form);



      navigate(
        "/dashboard"
      );


    }
    catch(err){


      setError(
        err.message
      );


    }
    finally{


      setLoading(false);


    }


  };





return (

<form
 onSubmit={handleSubmit}
 className="space-y-5"
>


<div>

<label>
 Email
</label>


<input

type="email"

name="email"

value={form.email}

onChange={handleChange}

placeholder="admin@xllentfoods.com"

className="w-full border rounded-lg p-3"

/>

</div>



<div>

<label>
 Password
</label>


<input

type="password"

name="password"

value={form.password}

onChange={handleChange}

placeholder="********"

className="w-full border rounded-lg p-3"

/>


</div>




{
error && (

<p className="text-red-500">
{error}
</p>

)
}





<button

disabled={loading}

className="w-full bg-blue-600 text-white rounded-lg p-3"

>

{

loading
?
"Logging in..."
:
"Login"

}


</button>



</form>

);


};


export default LoginForm;