// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   maxWidth: 600,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   blur: 24,
//   boxShadow: 24,
//   p: 5,
//   borderRadius: 5,
// };

// This component is used to show the customer modal, this component is unused since I choose to implement a spefific view page instead of a modal.
// I am leaving it in the codebase for future reference.

// const showCustomerModal = ({
//   showModal,
//   handleShowModal,
//   locations,
//   customer,
//   selectedLocation,
// }) => {
//   const startDate = new Date(customer.startDate);
//   const endDate = new Date(customer.endDate);

//   const formattedStartDate = startDate.toLocaleDateString();
//   const formattedEndDate = endDate.toLocaleDateString();

//   const startTime = startDate.toLocaleTimeString();
//   const endTime = endDate.toLocaleTimeString();

//   const parsedStartDate = new Date(formattedStartDate);
//   const parsedEndDate = new Date(formattedEndDate);

//   const durationMs = parsedEndDate - parsedStartDate;
//   const durationDays = Math.floor(durationMs / (1000 * 60 * 60 * 24));

//   const station = locations.find(
//     (location) => location.id === selectedLocation
//   );
//   const stationName = station ? station.name : "Station not found";

//   return (
//     <Modal open={showModal} onClose={handleShowModal}>
//       <Box sx={style}>
//         <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
//           Customer Name: {customer.customerName} <br /> Customer Id:{" "}
//           {customer.id}
//         </Typography>
//         <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
//           Returning Station: {stationName} <br /> Returning Station id:{" "}
//           {selectedLocation} <br />
//           Start Date: {formattedStartDate} <br /> End Date: {formattedEndDate}{" "}
//           <br />
//           Start Time: {startTime} <br /> End Time: {endTime} <br />
//           Duration: {durationDays} days
//         </Typography>
//         <span className="flex justify-center">
//           <Button variant="outlined" onClick={handleShowModal}>
//             Close
//           </Button>
//         </span>
//       </Box>
//     </Modal>
//   );
// };

// export default showCustomerModal;
