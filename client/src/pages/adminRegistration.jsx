import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance } from '../api';
import { Container, Typography, Grid, Card, CardHeader, CardContent, TextField, Button } from '@mui/material';

function AdminRegistrationPage() {
    const [token, setToken] = React.useState(JSON.parse(localStorage.getItem("admin_token")) || "");
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phoneNumber: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/admin/create', formData, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });
            toast.success("Admin account created successfully!");
            setFormData({
                email: '',
                password: '',
                phoneNumber: ''
            })
        } catch (error) {
            console.error('Error creating admin account:', error);
            toast.error("Failed to create admin account!");
        }
    };

    return (
        <Container maxWidth="md" mt={5}>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardHeader title="Create New Admin Account" sx={{ textAlign: 'center', backgroundColor: 'primary.main', color: 'common.white' }} />
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={{ borderBottom: "none" }}
                                    margin="normal"
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Password"
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    style={{ borderBottom: "none" }}
                                    margin="normal"
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    style={{ borderBottom: "none" }}
                                    margin="normal"
                                />
                                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                                    Submit
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default AdminRegistrationPage;
