## Angular2 Express slim starter
### Heroku ready wih SystemJS builder

- Angular 2 STABLE RELEASE 2.0.1
- Express ( from generator )

## Install
```bash
git clone https://github.com/dlwebdev/angular2-mean-slim
cd angular2-mean-slim

# Install dependencies
npm install && npm run typings

# To rebuild js
tsc
npm run bundle
npm run bundle:prod

# run and watch for changes in .ts files
npm start

# Application available at url: http://localhost:8080
```

## Development
Uncomment in public/index.html:

```html
<script src="js/systemjs.config.js"></script>
<script>
  System.import('main')
        .then(null, console.error.bind(console));
</script>
```

Comment out
```html
<!-- Production mod -->
<script src="js/bundle.min.js"></script>
```