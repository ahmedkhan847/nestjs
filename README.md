# Practice Todo Application With NestJS

To run this application clone it in your local machine. The project uses yarn as a dependency manager as default dependency manager. If you are using it after cloning application run `yarn` and if your are using `npm` run `npm install`

After dependcies are install you can change default PostgreSQL connection. This app by default uses an online PostgreSQL connection but if you need to change the connection open `app.module.ts` file and change these settings

```
host: '',
port: 5432,
username: '',
password: '',
database: '',
```

Once everything is configure start application by running `yarn start`. Once the application is started you can visit `localhost:3000/api` to check the api documentation. All the apis except for login are protected with _jwt stragtegy_ so you need to login first using `username:john` and `password:password`. Once you are login a token will be generated which you can then use to access APIs
