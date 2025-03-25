"use client";

import { useEffect } from "react";
import { Box, Typography, Card, CardContent, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchTables } from "@/store/slices/tableSlices";

const WaiterDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Ensure correct type for authState
  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.user;

  const tablesState = useSelector((state: RootState) => state.tables);
  const { tables, loading, error } = tablesState;

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Waiter Dashboard
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {tables.map((table) => (
            <Card key={table.id} sx={{ width: 300 }}>
              <CardContent>
                <Typography variant="h6">Table {table.number}</Typography>
                <Typography variant="body2">
                  Status: {table.status}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <Typography variant="h6" sx={{ mt: 4 }}>
        Logged in as: {user?.email || "Unknown"}
      </Typography>
    </Box>
  );
};

export default WaiterDashboard;
