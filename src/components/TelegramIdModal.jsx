import React from 'react';
import { Modal, Box, Typography, TextField, Button, CardContent } from '@mui/material';
import PropTypes from 'prop-types';

const TelegramIdModal = ({ open, handleClose, manualTelegramId, setManualTelegramId, handleTelegramIdSubmit }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="telegram-id-modal"
      aria-describedby="enter-telegram-id-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <CardContent>
          <Typography id="telegram-id-modal" variant="h5" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
            Enter Your Telegram ID
          </Typography>
          <Typography id="enter-telegram-id-description" variant="body1" sx={{ marginBottom: "20px" }}>
            We noticed you are not comming from Telegram, please provide your Telegram ID so we can grant you the access.
          </Typography>
          <TextField
            label="Telegram ID"
            variant="outlined"
            fullWidth
            value={manualTelegramId}
            onChange={(e) => setManualTelegramId(e.target.value)}
            sx={{ marginBottom: "20px", borderRadius: "5px" }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: "100%",
              background: "linear-gradient(135deg, #0088cc 30%, #005f99 90%)",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "25px",
              "&:hover": {
                background: "linear-gradient(135deg, #005f99 30%, #004080 90%)",
              },
            }}
            onClick={handleTelegramIdSubmit}
          >
            Submit
          </Button>
        </CardContent>
      </Box>
    </Modal>
  );
};

TelegramIdModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  manualTelegramId: PropTypes.string.isRequired,
  setManualTelegramId: PropTypes.func.isRequired,
  handleTelegramIdSubmit: PropTypes.func.isRequired,
};

export default TelegramIdModal;
