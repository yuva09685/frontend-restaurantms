"use client";

import { useState } from "react";
import { TextField, Button, Typography, Container, Box, Snackbar, Alert, Link, Card, CardContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { loginUser } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const response = await dispatch(loginUser({ email, password }) as any);

    if (response?.payload?.token) {
      setSuccessMessage("Login successful! Redirecting...");

      setTimeout(() => {
        if (response.payload.role === "manager") {
          router.push("/pages/dashboard/manager");
        } else {
          router.push("/pages/dashboard/waiter");
        }
      }, 2000);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Card sx={{ p: 4, width: "100%", boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h4" fontWeight="bold" color="primary">Restaurant user</Typography>
            <Typography variant="h5" gutterBottom>Login</Typography>
          </Box>

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

          {error && <Typography color="error">{error}</Typography>}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          {/* Signup link */}
          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            Don't have an account?{" "}
            <Link href="/signup" sx={{ cursor: "pointer", color: "primary.main" }}>
              Sign up
            </Link>
          </Typography>
        </CardContent>
      </Card>

      <Snackbar open={!!successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage(null)}>
        <Alert severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginForm;
