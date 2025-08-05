import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkinginAuth: false,
  signup: async (name, email, password, confirmPassword) => {
    set({ loading: true });
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      set({ loading: false });
      return;
    }
    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      set({ loading: false });
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      set({ loading: false });
      return;
    }
    try {
      const res = await axios.post("/auth/signup", {
        name,
        email,
        password,
      });
      set({ user: res.data.user, loading: false });
      set({ loading: false });
      toast.success("Signup successful");
      get().redirect("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
      set({ loading: false });
    }
  },
  login: async (email, password) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });
      console.log(res);
      set({ user: res.data.user, loading: false });
      toast.success("Login successful");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message + "Something went wrong");
      set({ loading: false });
    }
  },
  checkAuth: async () => {
    try {
      set({ checkinginAuth: true });
      const res = await axios.get("/auth/profile");

      set({ user: res.data.user, checkinginAuth: false });
    } catch (err) {
      console.log(err);
      set({ user: null, checkinginAuth: false });
      get().redirect("/login");
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  },
}));
