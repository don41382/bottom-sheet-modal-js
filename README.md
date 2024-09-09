# Bottom Sheet Modal/Dialog test

This test was to implement a bottom sheet dialog in a minimal parceljs environment, without react. 

This is a stepping stone to use it in HTMX / template environment.

## Run

**Install**
```shell
npm run build
```

**Run**
```shell
python -m http.server
```


## Ideas

- how to integrate it with htmx? Which options do we have to lead dynamic content on click?
  - out of bounds swap?
  - have fill / loading content to not have any jumps, when true content is available
- 