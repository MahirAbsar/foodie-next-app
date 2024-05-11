"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const imageInputRef = useRef();
  const [pickedImage, setPickedImage] = useState();
  function handleOnClick() {
    imageInputRef.current.click();
  }
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      console.log(fileReader.result);
      setPickedImage(fileReader.result);
    };
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet!</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="Image picked by the user" fill />
          )}
        </div>

        <input
          className={classes.input}
          type="file"
          name={name}
          id={name}
          ref={imageInputRef}
          onChange={handleImageChange}
          accept="image/png, image/jpeg"
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handleOnClick}
        >
          Pick an image
        </button>
      </div>
    </div>
  );
}
