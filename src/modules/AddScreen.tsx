import React, { useState } from 'react';
import { RouterProps } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { useStore } from 'react-redux';
import { firebaseConfig } from '../firebase';

interface Props extends RouterProps {}

export default function AddScreen(p: Props) {
    const [category, setCategory] = useState('Home');
    const store = useStore();

    const onBackClick = React.useCallback(() => p.history.goBack(), [
        p.history,
    ]);

    const categories = [
        {
            value: 'Sport',
            label: 'Sport',
        },
        {
            value: 'Home',
            label: 'Home',
        },
        {
            value: 'Work',
            label: 'Work',
        },
        {
            value: 'School',
            label: 'School',
        },
    ];

    const handleCategoriesChange = React.useCallback((event: any) => {
        setCategory(event.target.value);
    }, []);

    const handleAddTodo = React.useCallback(
        (event) => {
            event.preventDefault();
            const { title, description, time } = event.target.elements;
            const database = firebaseConfig.firestore();
            const userId = store.getState().user.userId;
            const date = new Date().toISOString();
            database.collection('tasks').doc(date).set({
                userId: userId,
                taskId: date,
                title: title.value,
                description: description.value,
                category: category,
                time: time.value,
                isFinished: false,
            });
            p.history.push('/');
        },
        [category, p.history, store]
    );

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        aria-label="Back"
                        onClick={onBackClick}
                        style={{ marginRight: 8 }}
                    >
                        <ArrowBackOutlinedIcon style={{ color: 'white' }} />
                    </IconButton>
                    <Typography variant="h6">Add new todo</Typography>
                </Toolbar>
            </AppBar>
            <form style={{ margin: 16 }} onSubmit={handleAddTodo}>
                <TextField
                    id="title"
                    label="Title"
                    placeholder="Enter a title of a todo"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="description"
                    label="Description"
                    placeholder="Enter a description of a todo"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="category"
                    select
                    fullWidth
                    margin="normal"
                    label="Category"
                    value={category}
                    onChange={handleCategoriesChange}
                    variant="outlined"
                >
                    {categories.map((option: any) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="time"
                    label="Time"
                    type="time"
                    defaultValue="07:30"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ height: 40, marginTop: 16 }}
                >
                    SUBMIT
                </Button>
            </form>
        </div>
    );
}
