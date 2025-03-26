"use client";

import { useState } from "react";
import { Container, Typography, Card, CardContent, Button, MenuItem, Select, AppBar, Toolbar, Box } from "@mui/material";
import { useRouter } from "next/navigation";

const ManagerDashboard = () => {
  const router = useRouter();
  const [selectedWaiter, setSelectedWaiter] = useState<{ [key: number]: string }>({});

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <Container maxWidth="lg">
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Manager Dashboard</Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: "center" }}>
        Manage Restaurant Tables
      </Typography>

      {/* Responsive Layout using Flexbox */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
        {[...Array(6)].map((_, index) => (
          <Card key={index} sx={{ width: 300, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6">Table {index + 1}</Typography>
              <Typography variant="body2" color="text.secondary">
                Status: Unassigned
              </Typography>

              {/* Assign waiter dropdown */}
              <Select
                fullWidth
                value={selectedWaiter[index] || ""}
                onChange={(e) => setSelectedWaiter({ ...selectedWaiter, [index]: e.target.value })}
                sx={{ mt: 2 }}
              >
                <MenuItem value="">Select Waiter</MenuItem>
                {/* Future: Replace with API-based waiter list */}
              </Select>

              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Assign Table
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default ManagerDashboard;
