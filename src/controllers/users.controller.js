// import usersService from "../services/users.service.js";

// const getUsers = async (req, res) => {
//   try {
//     const users = await usersService.getUsers();
//     res.send({ status: "success", payload: users });
//   } catch (error) {
//     res
//       .status(500)
//       .send({ status: "error", error: "Failed to fetch users: " + error.message });
//   }
// };

// const getUserById = async (req, res) => {
//   try {
//     const user = await usersService.getUserById(req.params.uid);

//     if (!user) {
//       return res
//         .status(404)
//         .send({ status: "error", error: "User not found" });
//     }

//     res.send({ status: "success", payload: user });
//   } catch (error) {
//     res
//       .status(500)
//       .send({ status: "error", error: "Failed to fetch user: " + error.message });
//   }
// };

// const uploadUserDocuments = async (req, res) => {
//   try {
//     const uid = req.params.uid;

//     // Validar archivos
//     if (!req.files || req.files.length === 0) {
//       return res
//         .status(400)
//         .send({ status: "error", error: "No documents uploaded" });
//     }

//     const docs = req.files.map((f) => ({
//       name: f.originalname,
//       reference: `/uploads/documents/${f.filename}`,
//     }));

//     const user = await usersService.addDocuments(uid, docs);

//     if (!user) {
//       return res
//         .status(404)
//         .send({ status: "error", error: "User not found" });
//     }

//     res.send({
//       status: "success",
//       message: "Documents uploaded",
//       payload: user,
//     });
//   } catch (error) {
//     res.status(500).send({
//       status: "error",
//       error: "Error uploading documents: " + error.message,
//     });
//   }
// };

// export default {
//   getUsers,
//   getUserById,
//   uploadUserDocuments,
// };
