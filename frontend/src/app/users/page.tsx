"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../../components/Sidebar";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type TokenPayload = {
  id: number;
  email: string;
  role: string;
  exp: number;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }
        const decoded = jwtDecode<TokenPayload>(token);
        setCurrentUserRole(decoded.role);
        console.log(currentUserRole);
        const res = await axios.get("http://localhost:6000/api/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data);
      } catch (err: any) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
        } else {
          setError("Failed to load users.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [router]);

  const handleDelete = async (id: number) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:6000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      alert("Failed to delete user.");
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-6">User List</h1>

        {currentUserRole === "admin" && (
          <button
            className="mb-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            onClick={() => router.push("/register")}
          >
            Add User
          </button>
        )}

        {loading && (
          <p className="text-center text-gray-600">Loading users...</p>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6">Name</th>
                  <th className="py-3 px-6">Email</th>
                  <th className="py-3 px-6">Role</th>
                  {currentUserRole === "admin" && (
                    <th className="py-3 px-6 text-center">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-6">{user.name}</td>
                      <td className="py-3 px-6">{user.email}</td>
                      <td className="py-3 px-6 capitalize">{user.role}</td>
                      {currentUserRole === "admin" && (
                        <td className="py-3 px-6 flex gap-2 justify-center">
                          <button
                            className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                            onClick={() => router.push(`/edit-user/${user.id}`)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
