const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

const frontend = path.join(__dirname, '..', '../Frontend');

const buildProcess = exec('npm run build', { cwd: frontend });


buildProcess.stdout.pipe(process.stdout);
buildProcess.stderr.pipe(process.stderr);

buildProcess.on('close', (code) => {
    if (code !== 0) {
        console.error(`Build process exited with code ${code}`);
        return;
    }

    console.log('Build completed successfully. Preparing to copy files...');

    const distDir = path.join(frontend, 'dist');
    const publicDir = path.join(__dirname, 'public');

    try {
        fs.removeSync(publicDir);
        fs.copySync(distDir, publicDir); 
        fs.removeSync(distDir)
        console.log('Files copied to the public directory.');
    } catch (err) {
        console.error(`Error during file copy: ${err.message}`);
    }
});
