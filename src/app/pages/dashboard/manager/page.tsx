"use client";

import { useEffect } from "react";
import { Box, Typography, Button, Card, CardContent, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchTables } from "@/store/slices/tableSlices";

const ManagerDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tables, loading, error } = useSelector((state: RootState) => state.tables || {});

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manager Dashboard
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {tables?.map((table: { id: string; number: number; waiter?: string }) => (
            <Card key={table.id} sx={{ width: 300 }}>
              <CardContent>
                <Typography variant="h6">Table {table.number}</Typography>
                <Typography variant="body2">Assigned to: {table.waiter || "Not Assigned"}</Typography>
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                  Assign Waiter
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ManagerDashboard;
