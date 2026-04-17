import paths from 'path';
import { promises as fs } from 'fs';
import os from 'os';
import process from 'process';
import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as tc from '@actions/tool-cache';

const run = async () => {
  try {
    const binary = core.getInput('binary');
    const version = core.getInput('version');
    const binaryNewName = core.getInput('binary_new_name');
    let downloadURL = core.getInput('download_url');
    let tarballBinaryPath = core.getInput('tarball_binary_path');
    let smokeTest = core.getInput('smoke_test');

    const fillTemplate = str => 
      str
        .replace(/\$\{binary\}/ug, binary)
        .replace(/\$\{version\}/ug, version);

    downloadURL = fillTemplate(downloadURL);
    tarballBinaryPath = fillTemplate(tarballBinaryPath)
    smokeTest = fillTemplate(smokeTest);

    core.info(`binary:               ${binary}`);
    if (binaryNewName) {
      core.info(`binaryNewName:        ${binaryNewName}`);
    }
    core.info(`download URL:         ${downloadURL}`)
    core.info(`tarball binary path:  ${tarballBinaryPath}`)
    core.info(`smoke test:           ${smokeTest}`)

    const stripComponents = tarballBinaryPath.split("/").length - 1;

    await installTool(binary, version, downloadURL, stripComponents, tarballBinaryPath, binaryNewName);
    await exec.exec(smokeTest);
  } catch (error) {
    core.setFailed(error.message);
  }
}

const getUnTarCommand = (extractDir, path, stripComponents, wildcard, binaryNewName) => {
  let command = `tar -C ${extractDir} -xzvf ${path} --strip-components ${stripComponents} --wildcards ${wildcard}`;
  if (binaryNewName) {
    command += ` --transform=s/${wildcard}/${binaryNewName}/`;
  }
  return command;
}

const installTool = async (name, version, url, stripComponents, wildcard, binaryNewName) => {
  let cachedPath = tc.find(name, version);
  if (cachedPath) {
    core.addPath(cachedPath);
    return
  }

  const path = await tc.downloadTool(url);

  // Extract into a unique directory under RUNNER_TEMP (or the OS temp dir
  // When running outside GitHub Actions) so the binary name cannot collide
  // With files or directories that already exist in the workspace.
  const tempRoot = process.env.RUNNER_TEMP || os.tmpdir();
  const extractDir = await fs.mkdtemp(paths.join(tempRoot, 'install-binary-'));

  if (paths.extname(url) === '') {
    // If there is no extension, assume this is an unarchived binary.
    const destination = paths.join(extractDir, name);
    await exec.exec(`mv "${path}" "${destination}"`);
    await exec.exec(`chmod +x "${destination}"`);
  } else {
    const unTarCommand = getUnTarCommand(extractDir, path, stripComponents, wildcard, binaryNewName);
    await exec.exec(`${unTarCommand}`);
  }

  cachedPath = await tc.cacheDir(extractDir, name, version);
  core.addPath(cachedPath);
}

run();
