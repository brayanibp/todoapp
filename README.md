# Getting Started with ToDoApp

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## What you will need

You will have to get installed Node.js in latest LTS version if you don't have it

### To install Node.js on Windows

You will have to download the official installer from [nodejs.org](https://nodejs.org/es/download/).

![](./doc/NodeJsWin.png)

Once you downloaded just have to install like any other program.

### To install Node.js on Linux

To install Node.js on Linux I prefer to use NVM (Node Version Manager) so you can follow the instructions below or just go to official [nvm repo](https://github.com/nvm-sh/nvm#installing-and-updating)

We have two options of commands you could use which you prefer

```
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

or

```
  wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

Running either of the above commands downloads a script and runs it. The script clones the nvm repository to ~/.nvm, and attempts to add the source lines from the snippet below to the correct profile file (`~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`).

```
  export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

## After install dependencies

After install dependendicies we are ready to download the project with the command below.

```
  git clone https://github.com/brayanibp/todoapp.git
```

Which will create a new folder in the place you downloaded the ToDoApp

## How to start the program

Now we move on to `./todoapp` folder with the command `cd todoapp` and once inside the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

You will no need to do nothing else after this command to run this project.

## Learn More

You can learn more about the tool used to build this project in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
