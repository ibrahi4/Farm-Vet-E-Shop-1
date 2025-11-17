import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addOrder, getUserOrders } from "./OrdersService";

// create order
export const createOrder = createAsyncThunk(
    "orders/create",
    async (orderData, thunkAPI) => {
        try {
            const doc = await addOrder(orderData);
            return { id: doc.id, ...orderData };
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

// fetch user orders
export const fetchUserOrders = createAsyncThunk(
    "orders/fetchUser",
    async (userId, thunkAPI) => {
        try {
            return await getUserOrders(userId);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

const ordersSlice = createSlice({
    name: "orders",
    initialState: { orders: [], loading: false, error: null },
    extraReducers: (builder) => {
        builder
            // Create order
            .addCase(createOrder.pending, (s) => {
                s.loading = true;
                s.error = null;
            })
            .addCase(createOrder.fulfilled, (s, a) => {
                s.loading = false;
                s.orders.push(a.payload);
            })
            .addCase(createOrder.rejected, (s, a) => {
                s.loading = false;
                s.error = a.payload;
            })

            // Fetch orders
            .addCase(fetchUserOrders.pending, (s) => {
                s.loading = true;
                s.error = null;
            })
            .addCase(fetchUserOrders.fulfilled, (s, a) => {
                s.loading = false;
                s.orders = a.payload;
            })
            .addCase(fetchUserOrders.rejected, (s, a) => {
                s.loading = false;
                s.error = a.payload;
            });
    },
});

export default ordersSlice.reducer;
