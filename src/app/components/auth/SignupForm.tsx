"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Snackbar,
  Alert,
  Link,
  Card,
  CardContent,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { registerUser } from "@/store/slices/authSlice";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("waiter"); // Default role: waiter
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSignup = async () => {
    if (!name || !age || !email || !password) {
      alert("All fields are required!");
      return;
    }

    // Clear input fields immediately
    setName("");
    setAge("");
    setEmail("");
    setPassword("");

    // Show success message instantly
    setSuccessMessage("Account created successfully!");

    const response = await dispatch(
      registerUser({ name, age: Number(age), email, password, role }) as any
    );

    // If there is an API error, restore input values
    if (response?.error) {
      setName(name);
      setAge(age);
      setEmail(email);
      setPassword(password);
      setSuccessMessage(null);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Card sx={{ p: 4, width: "100%", boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h4" fontWeight="bold" color="primary">
              Restaurant User
            </Typography>
            <Typography variant="h5" gutterBottom>
              Sign Up
            </Typography>
          </Box>

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

          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            Already have an account?{" "}
            <Link href="/login" sx={{ cursor: "pointer", color: "primary.main" }}>
              Login
            </Link>
          </Typography>
        </CardContent>
      </Card>

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
