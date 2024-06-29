# todo

-   [x] on login request
    -   [x] if user is registered
        -   [x] check if password is correct
        -   [x] if password is correct
            -   [ ] generate token
            -   [ ] generate refresh token
            -   [ ] create refresh token api
            -   [ ] create refresh token schema
            -   [ ] save refresh token in database
            -   [x] return user data
        -   [x] if password is incorrect
            -   [x] return error message
    -   [x] if user is not registered
