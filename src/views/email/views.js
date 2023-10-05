function renderRegisterEmail(name) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        .body{background-color: #0c101b; color: white; min-height: 90vh; padding: 1rem;}
        </style>
    </head>
    <body class="body">
        <div>
            <center><h1>Welcome on task manager</h1></center>
            <p>
                Hello ${name},
            </p>
            <p>
                You can now 
                <a href="https://task-manager-frontend-zfl8.onrender.com">login</a>
                and see your tasks at
            </p>
            <p>
                if there is any issue, contact your admin or email at tsafack07albin@gmail.com
            </p>
            <p>
                best regard, task manager
            </p>
        </div>
    </body>
    </html>`;
}

function renderRoleChangedEmail(name, prevRole, nextRole) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            .body{background-color: #0c101b; color: white; min-height: 100vh; padding: 1rem;}
        </style>
    </head>
    <body class="body">
        <div>
            <center><h1>Your role have been updated</h1></center>
            <p>
                Hello ${name},
            </p>
            <p>
                Your role have changed from <strong>${prevRole}</strong> to <strong>${nextRole}</strong>
                You can now 
                <a href="https://task-manager-frontend-zfl8.onrender.com">login</a>
                and access your functionnalities
            </p>
            <p>
                if there is any issue, contact your admin or email at tsafack07albin@gmail.com
            </p>
            <p>
                best regard, task manager
            </p>
        </div>
    </body>
    </html>`;
}

function renderTaskAssignEmail(name, task) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            .body{background-color: #0c101b; color: white; min-height: 100vh; padding: 1rem;}
        </style>
    </head>
    <body class="body">
        <div>
            <center><h1>Your role have been update</h1></center>
            <p>
                Hello ${name},
            </p>
            <p>
                The task < ${task} > have been assigned to you
                You can now 
                <a href="https://task-manager-frontend-zfl8.onrender.com">login</a>
                and take a look at your tasks
            </p>
            <p>
                if there is any issue, contact your admin or email at tsafack07albin@gmail.com
            </p>
            <p>
                best regard, task manager
            </p>
        </div>
    </body>
    </html>`;
}

function renderTaskStatusEmail(name, task, currentStatus) {
  return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <style>
              .body{background-color: #0c101b; color: white; min-height: 100vh; padding: 1rem;}
          </style>
      </head>
      <body class="body">
          <div>
              <center><h1>Your role have been update</h1></center>
              <p>
                  Hello ${name},
              </p>
              <p>
                  The task < ${task} > has changed it status to < ${currentStatus} >
                  You can now 
                  <a href="https://task-manager-frontend-zfl8.onrender.com">login</a>
                  and take a look at your tasks
              </p>
              <p>
                  if there is any issue, contact your admin or email at tsafack07albin@gmail.com
              </p>
              <p>
                  best regard, task manager
              </p>
          </div>
      </body>
      </html>`;
}

module.exports = {
  renderRegisterEmail,
  renderRoleChangedEmail,
  renderTaskAssignEmail,
  renderTaskStatusEmail,
};
