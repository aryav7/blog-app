// API NOTIFICATION

export const API_NOTIFICATION_MESSAGES ={
    loading :{
        title: 'Loading...',
        message: 'Data is being loaded, Please Wait'
    },
    success:{
        title:'Success',
        message:'Data Successfully loaded'
    },
    responseFailure:{
        title:'Error',
        message: "An error occur while fetching response from server.Please try again"

    },
    requestFailure:{
        title:'Error',
        message:'An error occured while parsing request data'
    },
    networkError:{
        title:'Error',
        message:'Unable to connect with the server.Please check the intenet connectivity and try again'
    }
}

// API SERVICE CALL
// SAMPLE REQUEST
// NEED SERVICE CALL :{url : '/', method: 'POST/GET/PUT/DELETE' params: true/false , query: true/false}
export const SERVICE_URLs = {
    userSignup:{
        url:'/signup',
        method:'POST'
    },
    userLogin:{
        url:'/login',
        method:'POST'
    },
    uploadFile:{
        url:'/file/upload',
        method:'POST'
    },
    createPost:{
        url:'create',
        method:'POST'
    },
    getAllPosts:{
        url:'/posts',
        method:'GET',
        params: true
    },
    getPostById:{
        url:'post',
        method:'GET',
        query:true
    },
    updatePost:{
        url:'update',
        method:'PUT',
        query:true
    },
    deletePost:{
        url:'delete',
        method:'DELETE',
        query:true
    },
    newComment:{
        url: '/comment/new',
        method: 'POST'
    },
    getAllComments:{
        url: 'comments',
        method: 'GET',
        query: true
    },
    deleteComment:{
        url: 'comment/delete',
        method: 'DELETE',
        query: true
    }
}
