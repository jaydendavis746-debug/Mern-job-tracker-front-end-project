const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/jobs`;

const index = async ()=>{

    try{
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        });
        return res.json();
        
        } catch(err){

        console.log(err);
    }


};

const show = async (jobId) => {
    try {
        const res = await fetch(`${BASE_URL}/${jobId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        return res.json();
    } catch (err) {
        console.log(err);
    }
};

const create = async (jobFormData) =>{

    try{

        const res = await fetch(BASE_URL,{

            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobFormData),
           
        })

        return res.json()

    } catch (err){

        console.log(err)
    }
}


const createNote = async (jobId, noteFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${jobId}/notes`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};



const deleteJob = async (jobId) =>{

    try{

        const res = await fetch(`${BASE_URL}/${jobId}`,{

            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
           
        })

        return res.json()

    } catch (err){

        console.log(err)
    }
}



const update = async (jobId, jobFormData)=>{

    try{
         const res = await fetch(`${BASE_URL}/${jobId}`,{

            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobFormData),
    });
    return res.json
} catch (err){

console.log(err)
}
};


const deleteNote = async (jobId, noteId) => {
  try {
    const res = await fetch(`${BASE_URL}/${jobId}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
     
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const updateJobStatus = async (jobId, newStatus) =>{

   try{
       console.log('newStatus', newStatus)
    const res = await fetch(`${BASE_URL}/${jobId}`,{


        method: 'PATCH',
        headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        },

        body: JSON.stringify({status: newStatus}),

    })

    
    // console.log("ENV:", import.meta.env.VITE_BACK_END_SERVER_URL);
    // console.log("BASE_URL:", BASE_URL);

    const data = await res.json()

    console.log('data', data)
    return data;
} catch(err){

console.log(err);    
}

}



export {
  index,
  show,
  create,
  createNote,
  deleteJob,
  update,
  deleteNote,
  updateJobStatus,
}


