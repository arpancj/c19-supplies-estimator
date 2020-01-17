const fs = require('fs');
const path = require('path');
const md5 = require('md5');
const assetsFolder = path.join(__dirname, '..', 'dist', 'assets');

const getAllFiles = function(directory, arrayOfFiles) {
  let files = fs.readdirSync(directory);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(file => {
    let filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push({ directory, file });
    }
  });

  return arrayOfFiles;
};

const generateHash = file => {
  const filePath = path.join(file.directory, file.file);
  const fileContent = fs.readFileSync(filePath);
  return md5(fileContent.toString());
};

const hashedFileName = file => {
  let fileName = file['file'];
  let splitFileName = fileName.split('.');
  let length = splitFileName.length;
  let hash = generateHash(file);
  splitFileName.splice(length - 1, 0, hash);

  return splitFileName.join('.');
};

const relativePath = file => {
  let dirPath = file.directory;
  let assetsPosition = dirPath.search('/assets');
  let length = dirPath.length;

  return dirPath.slice(assetsPosition, length);
};

const addFileHash = file => {
  file.hashedFileName = hashedFileName(file);
  file.relativePath = `${relativePath(file)}/${file.file}`;
  file.hashedRelativePath = `${relativePath(file)}/${file.hashedFileName}`;

  fs.rename(
    path.join(file.directory, file.file),
    path.join(file.directory, file.hashedFileName),

    function(err) {
      if (err) {
        console.log(`Error: ${err}`);
      }
    }
  );

  return true;
};

filesArray = getAllFiles(assetsFolder);

filesArray.forEach(function(file) {
  addFileHash(file);
});

console.log(filesArray);
