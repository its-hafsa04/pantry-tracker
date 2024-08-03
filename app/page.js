"use client";
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { firestore } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import PlusOneOutlinedIcon from "@mui/icons-material/PlusOneOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveSharp";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  maxWidth: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPantry, setFilteredPantry] = useState([]);
  const [itemName, setItemName] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, "pantry"));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({ name: doc.id, ...doc.data() });
    });
    setPantry(pantryList);
    setFilteredPantry(pantryList);
  };

  useEffect(() => {
    updatePantry();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      await setDoc(docRef, { count: count + 1 });
    } else {
      await setDoc(docRef, { count: 1 });
    }
    await updatePantry();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      if (count === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { count: count - 1 });
      }
    }
    await updatePantry();
  };

  const deleteItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    await deleteDoc(docRef);
    await updatePantry();
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredPantry(pantry);
    } else {
      const filteredItems = pantry.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPantry(filteredItems);
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      gap={2}
      sx={{
        backgroundImage:
          'url("https://organizedliving.com/images/default-source/homeowners/rooms/pantry/pantry-gallery/dsc_4209.jpg?sfvrsn=6f737695_3")',
        backgroundSize: "cover",
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "#3fd404", borderColor: "#3fd404" }}
          >
            Add Items
          </Typography>
          <Stack width="100%" direction={"row"} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Items"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                handleClose();
              }}
              sx={{ color: "#3fd404", borderColor: "#3fd404" }}
            >
              <AddTaskIcon />
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Stack
        direction="row"
        spacing={2}
        width={{ xs: "90%", sm: "70%", md: "50%" }}
        borderRadius={"25px"}
      >
        <TextField
          label="Search Items"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            backgroundColor: "white",
            width: "100%",
          }}
        />
        <Button variant="contained" onClick={handleSearch}>
          <SearchIcon />
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: "#3fd404" }}
          onClick={handleOpen}
        >
          <AddShoppingCartIcon />
        </Button>
      </Stack>
      <Box
        border={"1px solid #333"}
        width={{ xs: "95%", sm: "80%", md: "70%", lg: "60%" }}
      >
        <Box
          width="100%"
          height="100px"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          bgcolor={"#ADD8E6"}
        >
          <Typography
            variant={"h2"}
            color={"#333"}
            textAlign={"center"}
            sx={{
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
                md: "2.5rem",
                lg: "3rem",
                xl: "3.5rem",
              },
            }}
          >
            Pantry Items🛒
          </Typography>
        </Box>
        <Stack width="100%" height="400px" spacing={2} overflow={"auto"}>
          {filteredPantry.map(({ name, count }) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              bgcolor={"#f0f0f0"}
              paddingX={3}
              paddingY={2}
              sx={{
                flexDirection: { xs: "column", sm: "row" }, // Stack items vertically on small screens
                gap: { xs: 1, sm: 2 }, // Adjust gap between items based on screen size
              }}
            >
              <Typography
                variant={"h3"}
                color={"#333"}
                textAlign={"center"}
                sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" } }}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography
                variant={"h3"}
                color={"#333"}
                textAlign={"center"}
                sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" } }}
              >
                {count}
              </Typography>
              <Stack direction={"row"} spacing={1} sx={{ flexShrink: 0 }}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#46c414",
                    width: { xs: "40px", sm: "50px" },
                    height: { xs: "40px", sm: "50px" },
                    minWidth: "auto",
                    fontSize: { xs: "0.75rem", sm: "1rem" },
                  }}
                  onClick={() => addItem(name)}
                >
                  <PlusOneOutlinedIcon
                    sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
                  />
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#46c414",
                    width: { xs: "40px", sm: "50px" },
                    height: { xs: "40px", sm: "50px" },
                    minWidth: "auto",
                    fontSize: { xs: "0.75rem", sm: "1rem" },
                  }}
                  onClick={() => removeItem(name)}
                >
                  <RemoveCircleOutlineOutlinedIcon
                    sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
                  />
                  1
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "red",
                    width: { xs: "40px", sm: "50px" },
                    height: { xs: "40px", sm: "50px" },
                    minWidth: "auto",
                    fontSize: { xs: "0.75rem", sm: "1rem" },
                  }}
                  onClick={() => deleteItem(name)}
                >
                  <DeleteIcon
                    sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
                  />
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
