import { ButtonBase, Paper, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useRef, useState } from "react";
import { FiCamera, FiX } from "react-icons/fi";
import { IMAGE_TYPE } from "../constant";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: "1rem",
    marginBottom: "1rem",
    borderRadius: 9,
    width: 200,
    height: 200,
    backgroundColor: "#DADADA",
  },
  bigButton: {
    marginTop: "1rem",
    marginBottom: "1rem",
    borderRadius: 9,
    width: "100%",
    height: 330,
    backgroundColor: "#DADADA",
  },
  removeBtn: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  container: {
    position: "relative",
    marginTop: "1rem",
    marginBottom: "1rem",
    borderRadius: 9,
    width: 200,
    height: 200,
  },
  bigContainer: {
    position: "relative",
    marginTop: "1rem",
    marginBottom: "1rem",
    borderRadius: 9,
    height: 330,
    width: "100%",
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
    borderRadius: 9,
  },
}));

function ImageUpload(props) {
  const classes = useStyles();
  const inputRef = useRef();
  const [src, setSrc] = useState(null);

  const addPictureStep = (picture) => {
    let reader = new FileReader();
    reader.readAsDataURL(picture);
    reader.onloadend = () => {
      setSrc(reader.result);
      const data = reader.result.substr(reader.result.lastIndexOf(",") + 1);
      props.onChange(data);
    };
  };

  const removeImg = () => {
    setSrc(null);
    props.onRemove();
  };

  if (src) {
    return (
      <>
        <Paper
          elevation={0}
          className={
            props.type === IMAGE_TYPE.NORMAL
              ? classes.container
              : classes.bigContainer
          }
          style={props.style}
        >
          <span
            className={classes.imageSrc}
            style={{ backgroundImage: `url("${src}")` }}
          />
          <IconButton className={classes.removeBtn} onClick={removeImg}>
            <FiX size={28} color="white" />
          </IconButton>
        </Paper>
      </>
    );
  }

  return (
    <>
      <input
        accept="image/*"
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={(e) => addPictureStep(e.target.files[0])}
      />
      <ButtonBase
        focusRipple
        className={
          props.type === IMAGE_TYPE.NORMAL ? classes.button : classes.bigButton
        }
        onClick={() => inputRef.current.click()}
        style={props.style}
      >
        <FiCamera size={48} color="#9B9B9B" />
      </ButtonBase>
    </>
  );
}

ImageUpload.defaultProps = {
  onChange: (data) => {},
  type: IMAGE_TYPE.NORMAL,
  onRemove: () => {},
  style: {},
};

export default ImageUpload;
