"use client";

import { useState } from "react";
import { TextField, Button, Typography, Container, Box, MenuItem, Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { registerUser } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number | "">("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("waiter"); // Default role: waiter
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSignup = async () => {
    if (!name || !age || !email || !password) {
      alert("All fields are required!");
      return;
    }

    const response = await dispatch(registerUser({ name, age: Number(age), email, password, role }) as any);

    if (response?.payload?.token) {
      setSuccessMessage("User created successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h5" gutterBottom>Sign Up</Typography>

        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          fullWidth
          label="Age"
          type="number"
          variant="outlined"
          margin="normal"
          value={age}
          onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
        />

        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          select
          fullWidth
          label="Role"
          variant="outlined"
          margin="normal"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="manager">Manager</MenuItem>
          <MenuItem value="waiter">Waiter</MenuItem>
        </TextField>

        {error && <Typography color="error">{error}</Typography>}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignup}
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </Box>

      {/* Success Message Snackbar */}
      <Snackbar open={!!successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage(null)}>
        <Alert severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignupForm;
