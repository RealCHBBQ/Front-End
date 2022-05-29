import React, { useState, useEffect, useContext} from "react";
import CreateIcon from "@material-ui/icons/Create";
import {
  Box, Button, Snackbar, Table,
  TableBody, TableCell, TableHead, TableRow
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { status, json } from '/utilities/requestHandlers';

// Creating styles
const useStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  table: {
    minWidth: 650,
  },
  snackbar: {
    bottom: "104px",
  },
});

function TableDemo() {
  // Creating style object
  const classes = useStyles();

  // Defining a state named rows
  // which we can update by calling on setRows function
  const [rows, setRows] = useState([]);

  // Initial states
  const [open, setOpen] = React.useState(false);
  const [isEdit, setEdit] = React.useState(false);
  const [disable, setDisable] = React.useState(true);
  const [showConfirm, setShowConfirm] = React.useState(false);



  useEffect(() => {

    console.log('component mounted!')
    fetch('https://Rest-API-andDB.RealCHBBQ.repl.co/api/v1/dogs')
      .then(status)
      .then(json)
      .then(data => {
        // this.setState({ posts: data })
        //setRows(data)
        console.log("post ", data)

        for (let i = 0; i < data.length; i++) {

          setRows(oldArray => [...oldArray, { id: data[i].id, title: data[i].title, alltext: data[i].alltext, summary: data[i].summary,authorid:1 }])
        }
      })
      .catch(err => console.log("Error fetching articles", err));
  }, [])

  // Function For closing the alert snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Function For adding new row object
  const handleAdd = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1, title: "",
        summary: "", size: ""
      },
    ]);
    setEdit(true);
  };

  // Function to handle edit
  const handleEdit = (i) => {
    // If edit mode is true setEdit will
    // set it to false and vice versa
    setEdit(!isEdit);
  };

  // Function to handle save
  const handleSave = () => {
    setEdit(!isEdit);
    setRows(rows);
    console.log("saved : ", rows);
    setDisable(true);
    setOpen(true);
  };

  // The handleInputChange handler can be set up to handle
  // many different inputs in the form, listen for changes
  // to input elements and record their values in state
  const handleInputChange = (e, index) => {
    setDisable(false);
    const { name, value } = e.target;
    const list = [...rows];
    list[index][name] = value;
    console.log(JSON.stringify(list[index]));
    console.log('https://Rest-API-andDB.RealCHBBQ.repl.co/api/v1/dogs/' + list[index]['id']);
    fetch('https://Rest-API-andDB.RealCHBBQ.repl.co/api/v1/dogs/' + list[index]['id'], {
      method: 'PUT',
      body: JSON.stringify(list[index]),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(status)
      .then(json)
      .then(data => {
        // For you TODO: display success message and/or redirect
        console.log(data);

      })
      .catch(errorResponse => {
        // For you TODO: show nicely formatted error message and clear form
        console.error(errorResponse);
        alert(`Error: ${errorResponse}`);
      });
    /*useEffect(() => {
      console.log('component mounted!')
      fetch('https://Rest-API-andDB.RealCHBBQ.repl.co/api/v1/dogs')
        .then(status)
        .then(json)
        .then(data => {
          setposts(data)
          setAll(data)
        })
        .catch(err => console.log("Error fetching articles", err));
    }, [])*/
    setRows(list);
  };

  // Showing delete confirmation to users
  const handleConfirm = () => {
    setShowConfirm(true);
  };

  // Handle the case of delete confirmation where
  // user click yes delete a specific row of id:i
  const handleRemoveClick = (i) => {
    const list = [...rows];
    list.splice(i, 1);
    setRows(list);
    setShowConfirm(false);
  };

  // Handle the case of delete confirmation
  // where user click no
  const handleNo = () => {
    setShowConfirm(false);
  };

  return (
    <TableBody>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        className={classes.snackbar}
      >
        <Alert onClose={handleClose} severity="success">
          Record saved successfully!
		</Alert>
      </Snackbar>
      <Box margin={1}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {isEdit ? (
              <div>
                <Button onClick={handleAdd}>
                  <AddBoxIcon onClick={handleAdd} />
                  ADD
				</Button>
                {rows.length !== 0 && (
                  <div>
                    {disable ? (
                      <Button disabled align="right" onClick={handleSave}>
                        <DoneIcon />
                        SAVE
					</Button>
                    ) : (
                        <Button align="right" onClick={handleSave}>
                          <DoneIcon />
                          SAVE
					</Button>
                      )}
                  </div>
                )}
              </div>
            ) : (
                <div>
                  <Button onClick={handleAdd}>
                    <AddBoxIcon onClick={handleAdd} />
                    ADD
				</Button>
                  <Button align="right" onClick={handleEdit}>
                    <CreateIcon />
                    EDIT
				</Button>
                </div>
              )}
          </div>
        </div>
        <TableRow align="center"></TableRow>

        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Summary</TableCell>
              <TableCell align="center">Size</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              return (
                <div>
                  <TableRow>
                    {isEdit ? (
                      <div>
                        <TableCell padding="none">
                          <input
                            value={row.title}
                            name="title"
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </TableCell>
                        <TableCell padding="none">
                          <input
                            value={row.summary}
                            name="summary"
                            onChange={(e) => handleInputChange(e, i)}
                          />
                          <select
                            style={{ width: "100px" }}
                            name="size"
                            value={row.size}
                            onChange={(e) => handleInputChange(e, i)}
                          >
                            <option value=""></option>
                            <option value="Big">Big</option>
                            <option value="Medium">Medium</option>
                            <option value="Small">Small</option>
                          </select>
                        </TableCell>
                      </div>
                    ) : (
                        <div>
                          <TableCell component="th" scope="row">
                            {row.firstname}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.lastname}
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            {row.city}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            align="center"
                          ></TableCell>
                        </div>
                      )}
                    {isEdit ? (
                      <Button className="mr10" onClick={handleConfirm}>
                        <ClearIcon />
                      </Button>
                    ) : (
                        <Button className="mr10" onClick={handleConfirm}>
                          <DeleteOutlineIcon />
                        </Button>
                      )}
                    {showConfirm && (
                      <div>
                        <Dialog
                          open={showConfirm}
                          onClose={handleNo}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Confirm Delete"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Are you sure to delete
							</DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={() => handleRemoveClick(i)}
                              color="primary"
                              autoFocus
                            >
                              Yes
							</Button>
                            <Button
                              onClick={handleNo}
                              color="primary"
                              autoFocus
                            >
                              No
							</Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    )}
                  </TableRow>
                </div>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </TableBody>
  );
}

export default TableDemo;