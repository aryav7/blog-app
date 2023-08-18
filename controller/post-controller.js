import { response } from "express";
import Post from "../model/post.js"

export const createPost = async (request,response)=>{
   try
   {
    const post =  await new Post(request.body)
    post.save();

    return response.status(200).json('Post saved successfully')
   }
   catch(error){
    return response.status(500).json(error)
   }
}

export const getAllPosts =async (request,response)=>{
   let username = request.query.username;
   let category  = request.query.category;
   let posts;
   try{
      if(username) {
            posts = await Post.find({ username: username });
      }
      else if(category){
         posts = await Post.find({categories:category})
      }
      else{
      posts = await Post.find({})
      }
      return response.status(200).json(posts)
   }
   catch(error){
      return response.status(500).json({msg: error.message})
   }
}

export const getPost = async(request,response)=>{
   try {
      const post = await Post.findById(request.params.id);
        response.status(200).json(post);
      
   } catch (error) {
        response.status(500).json({msg:error.message})
   }
}

export const updatePost = async(request,response)=>{
   try {
      const post = await Post.findById(request.params.id);
      if(!post){
          response.status(404).json({msg:'Post not found '})
      }
      await Post.findByIdAndUpdate(request.params.id, {$set: request.body})
       response.status(200).json({msg: 'Post updated Successfully'});
      
   } catch (error) {
       response.status(500).json(error)
   }
}

export const deletePost = async(request,response)=>{
   try {
      const post = await Post.findById(request.params.id);
      if(!post){
          response.status(404).json({msg:'Post not found '})
      }
      await Post.findByIdAndDelete(post._id);

       response.status(200).json({msg: 'Post Deleted Successfully'});
      
   } catch (error) {
       response.status(500).json({msg:error.message})
   }
}