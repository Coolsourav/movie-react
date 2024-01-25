import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

function Searchbar({ input, onInputChange, onSubmit }) {
  return (
    <Paper
      component="form"
      onSubmit={onSubmit}
      sx={{
        backgroundColor: "rgba(102, 109, 104, 0.4)",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        width: "80%",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, color: "white" }}
        placeholder="Search for Movies, TV shows of your choice"
        inputProps={{ "aria-label": "search google maps" }}
        value={input}
        onChange={(event) => onInputChange(event.target.value)}
      />
      <IconButton
        type="submit"
        sx={{ p: "10px", color: "white" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default Searchbar;
