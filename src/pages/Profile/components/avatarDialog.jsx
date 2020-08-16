import { Button, Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useDispatch, useSelector } from "react-redux";
import { UpdateInformation } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 24,
  },
  btnStyle: {
    borderRadius: 25,
  },
}));

function AvatarDialog(props) {
  const classes = useStyles();
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();

  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [imageRef, setImageRef] = useState(null);
  const [cropped, setCropped] = useState(null);

  const { onClose, value, open } = props;

  const handleClose = () => {
    onClose();
  };

  const onSubmit = () => {
    dispatch(
      UpdateInformation.get({
        userId: user.id,
        data: { name: user.name, avatar: cropped },
      })
    );
    onClose();
  };

  const makeClientCrop = async (crop) => {
    if (imageRef && crop.width && crop.height) {
      await getCroppedImg(imageRef, crop);
    }
  };

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const reader = new FileReader();
    canvas.toBlob((blob) => {
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        setCropped(reader.result.substr(reader.result.lastIndexOf(",") + 1));
      };
    });
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <ReactCrop
        src={value}
        crop={crop}
        ruleOfThirds
        onImageLoaded={(image) => setImageRef(image)}
        onComplete={makeClientCrop}
        onChange={(crop) => setCrop(crop)}
      />
      <div className={classes.container}>
        <Button
          color="primary"
          variant="outlined"
          className={classes.btnStyle}
          onClick={onClose}
        >
          Huỷ
        </Button>
        <Button
          color="primary"
          variant="contained"
          className={classes.btnStyle}
          style={{ marginLeft: 16 }}
          disabled={cropped == null}
          onClick={onSubmit}
        >
          Đồng ý
        </Button>
      </div>
    </Dialog>
  );
}

AvatarDialog.defaultProps = {
  value: null,
  onClose: () => {},
  open: false,
};

export default AvatarDialog;
