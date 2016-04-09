Packaging project.

TODO: For production replace the sample icons and data in the appinfo.json file with the appropriate ones. Make other needed changes according to the LG requirements.
For testing and development the current set is enough.

## 1.  
To make a package for deploy on emulator or tv first make build of the project using
```
node build/build.js
```
command. 

Before making this build you must make following changes to the following files:
in routes.js file change 
```
<Route path="/" component={App}>
```
for 
```
<Route path="/media/developer/apps/usr/palm/applications/com.yourdomain.app/index.html" component={App}>
```
Note. If you make changes in the appinfo.json file, the routes above and below must also be corrected accordingly.



In index.htm file change
```
<link href="/dist/bundle.css" rel="stylesheet">
</head>
<body>
  <div id="root"></div>
  <script src="/dist/bundle.js"></script>
```
for 
```
<link href="./bundle.css" rel="stylesheet">
</head>
<body>
  <div id="root"></div>
  <script src="./bundle.js"></script>
```
    

## 2.
Copy from the dist folder files:
 - index.html
 - bundle.js
 - bundle.css
 
And replace files with these names in /webos folder with new built files from dist folder.

## 3.
Go to the /webos_package folder. In LG webos CLI type:
```
ares-package ./app
```

The .ipk packaged file will be generated. this is the needed package file.


## 4. Note!!!

For TESTING purposes to make a package type
```
ares-package –-no-minify ./app
```
This will create unminified file to be debugged.

Command 
```
ares-inspect --device webOS_Emulator --app com.yourdomain.app --open
```
will start the launch and debugging process.


