# /apps

This directory contains all of the programs functionallity in decoupled apps.  
Each function of the server is placed in its own subdirectory.  

<br>

Each app will have these subdirectories or files (depends on how much code is needed)
- `routes`
    - Exposed endpoints consumed by the REST API
- `controllers`
    - The functions that carry out and process the route requests
- `services`
    - Business logic used by the controllers