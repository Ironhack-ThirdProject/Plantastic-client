import { useEffect, useRef } from "react";

export const UploadWidget = () => {
    const cloudinaryRef = useRef();
    useEffect(() => {
      cloudinaryRef.current = window.cloudinary;
      console.log(cloudinaryRef.current)
    }, [])
  }