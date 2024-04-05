import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,
    borderRadius: 5,
  };

const showCustomerModal = ({ showModal, handleShowModal, locations, customer, selectedLocation }) => {
    console.log(customer)
    console.log(selectedLocation)
    console.log(locations)

    const station = locations.find(location => location.id === selectedLocation);
    const stationName = station ? station.name : 'Station not found';
    return (
        <Modal open={showModal}
        onClose={handleShowModal}>
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Customer Name: {customer.customerName} <br /> Customer Id: {customer.id}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Returning Station: {stationName} <br /> Returning Station id: {selectedLocation} <br /> Start Date:{customer.startDate} <br /> End Date:{customer.endDate}
          </Typography>
          <span className="flex justify-center">
          <Button variant="outlined"  onClick={handleShowModal}>Close</Button>
          </span>
        </Box>
        </Modal>
    )
}

export default showCustomerModal;