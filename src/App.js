import React, { useState } from 'react';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import {
  Container, List, ListItem, ListItemText, TextField, Typography, IconButton, Checkbox, ListItemSecondaryAction, Divider,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      // Our list of todos
      todos: [],
      // Inprogress todo stored in the textField
      inprogressTodoText: ''
    }
  }

  // Update the inprogress todo text
  updateInprogressTodo(text) {
    this.setState({ inprogressTodoText: text })
  }

  // Create and return a new todo object
  createTodoFromText(text) {
    const newTodo = {
      id: 1,
      todo: text,
      isCompleted: false,
    };
    return newTodo
  }

  // Delete a todo from our list
  deleteTodo(todo) {
    const clonedTodos = [...this.state.todos];
    const filteredTodos = clonedTodos.filter((t) => !(t.id === todo.id));
    this.setState({ todos: filteredTodos });
  }

  // Add a todo to our list of todos
  addCurrentTodo() {
    const newTodo = this.createTodoFromText(this.state.inprogressTodoText)
    const todosCloned = [...this.state.todos]
    todosCloned.push(newTodo)
    this.setState({ todos: todosCloned })
  }

  // Toggle the isCompleted flag on a given todo
  toggleComplete(todo) {
    todo.isCompleted = !todo.isCompleted;
  }

  render() {
    // Ignore this – has more to do with MaterialUI
    const { classes } = this.props
    // Destructure state for easy referencing throughout the render
    const { todos, inprogressTodoText } = this.state
    return (
      <Container className={classes.root} >
        <Typography variant="h2" component="h1" className={classes.heading} gutterBottom>
          Todo List
      </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            this.addCurrentTodo()
          }}
        >
          <TextField
            className={classes.input}
            value={inprogressTodoText}
            variant="outlined"
            onChange={(e) => this.updateInprogressTodo(e.target.value)}
          />
        </form>

        {/* List of all todos and the completed ones */}
        <List>
          {/* Divider for styles */}
          <Divider inset className={classes.dividerFullWidth} />
          <li>
            <Typography
              className={classes.dividerInset}
              color="textSecondary"
              display="block"
              variant="caption"
            >
              Todos
          </Typography>
          </li>

          {/* The Todos */}
          {todos
            .filter((todo) => !todo.isCompleted)
            .map((todo, i) => (
              <ListItem button key={i}>
                <ListItemText>
                  {todo.todo}
                </ListItemText>
                <ListItemSecondaryAction>
                  <Checkbox checked={todo.isCompleted} value={todo.isCompleted} onClick={() => this.toggleComplete(todo)} />
                  <IconButton onClick={() => this.deleteTodo(todo)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          }

          {/* If there are completed todos, render the Divider for styles */}
          {!_.isEmpty(todos.filter((todo) => todo.isCompleted)) && (
            <>
              <Divider inset className={classes.dividerFullWidth} />
              <li>
                <Typography
                  className={classes.dividerInset}
                  color="textSecondary"
                  display="block"
                  variant="caption"
                >
                  Completed Items
                </Typography>
              </li>
            </>
          )}

          {/* The Completed Todos */}
          {todos
            .filter((todo) => todo.isCompleted)
            .map((todo, i) => (
              <ListItem button key={i}>
                <ListItemText>
                  {todo.todo}

                </ListItemText>
                <ListItemSecondaryAction>
                  <IconButton onClick={() => deleteTodo(todo)}>
                    <DeleteIcon />
                  </IconButton>
                  <Checkbox checked={todo.isCompleted} onChange={() => toggleComplete(todo)} />
                </ListItemSecondaryAction>
              </ListItem>
            ))
          }
        </List>
      </Container>
    );
  }
}


// styles object for styling various components in the App
const styles = (theme) => ({
  root: {
    maxHeight: '100vh',
    maxWidth: '1000px',
  },
  heading: {
    textAlign: 'center',
  },
  input: {
    width: '100%',
  },
  dividerFullWidth: {
    margin: '5px 0 0 0',
  },
  dividerInset: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  },
});
export default withStyles(styles)(App);
