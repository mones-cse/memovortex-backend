# todo

-   [x] on login request
    -   [x] if user is registered
        -   [x] check if password is correct
        -   [x] if password is correct
            -   [x] generate token
            -   [x] generate refresh token
            -   [x] create refresh token schema
            -   [x] save refresh token in database
            -   [x] prevent duplicate session entry
            -   [x] return user data
            -   [ ] create refresh token api
        -   [x] if password is incorrect
            -   [x] return error message
    -   [x] if user is not registered
