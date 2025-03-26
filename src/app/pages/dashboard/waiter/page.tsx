"use client";

import { Container, Typography, Card, CardContent, Button, AppBar, Toolbar, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const WaiterDashboard = () => {
  const router = useRouter();

  // Placeholder for assigned tables (To be replaced with API data in the future)
  const [assignedTables, setAssignedTables] = useState<number[]>([1, 3, 5]);

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <Container maxWidth="lg">
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Waiter Dashboard</Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: "center" }}>
        Assigned Tables
      </Typography>

      {/* Responsive Layout using Flexbox */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
        {assignedTables.length > 0 ? (
          assignedTables.map((table, index) => (
            <Card key={index} sx={{ width: 300, boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6">Table {table}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: Active
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
            No tables assigned yet.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default WaiterDashboard;
