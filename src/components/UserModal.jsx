// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   Input,
// } from "@nextui-org/react";
// import PropTypes from "prop-types";

// export default function UserModal({ onClose, user }) {
//   const userId = localStorage.getItem("USER_ID");
//   const [name, setName] = useState(user?.name || "");
//   const [email, setEmail] = useState(user?.email || "");
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [profilePicturePreview, setProfilePicturePreview] = useState(
//     user?.profile || ""
//   );
//   const [isLoading, setIsLoading] = useState(false);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfilePicture(file);
//       setProfilePicturePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       let imageUrl = user?.profile || ""; // Conserver l'ancienne image si aucune nouvelle n'est téléversée
//       if (profilePicture) {
//         imageUrl = await uploadToCloudinary(profilePicture, "profile-pictures");
//       }

//       aw`${process.env.VITE_BACKEND_API_URL}/user/updateUser/` + userId,
//         { name, email, profile: imageUrl },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       toast.success("Profil mis à jour avec succès !");
//       onClose();
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         "Erreur lors de la mise à jour du profil.";
//       toast.error(errorMessage);
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Modal isOpen={true} onClose={onClose}>
//       <ModalContent>
//         <ModalHeader>Modifier le profil</ModalHeader>
//         <ModalBody>
//           <form onSubmit={handleSubmit}>
//             <Input
//               label="Nom"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               fullWidth
//               required
//             />
//             <Input
//               label="Email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               fullWidth
//               required
//             />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               style={{ margin: "10px 0" }}
//             />
//             {profilePicturePreview && (
//               <img
//                 src={profilePicturePreview}
//                 alt="Aperçu de la photo de profil"
//                 style={{ width: "100px", height: "100px", borderRadius: "50%" }}
//               />
//             )}
//             <Button type="submit" color="primary" disabled={isLoading}>
//               {isLoading ? "Enregistrement..." : "Enregistrer"}
//             </Button>
//           </form>
//         </ModalBody>
//         <ModalFooter>
//           <Button onClick={onClose}>Fermer</Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// }

// // Ajoutez cette section après votre composant
// UserModal.propTypes = {
//   onClose: PropTypes.func.isRequired, // onClose doit être une fonction et est obligatoire
//   user: PropTypes.shape({
//     name: PropTypes.string,
//     email: PropTypes.string,
//     profile: PropTypes.string,
//   }),
// };
