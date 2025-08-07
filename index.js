import paths from 'path';
import core from '@actions/core';
import exec from '@actions/exec';
import tc from '@actions/tool-cache';

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

const getUnTarCommand = (name, path, stripComponents, wildcard, binaryNewName) => {
  let command = `tar -C ${name} -xzvf ${path} --strip-components ${stripComponents} --wildcards ${wildcard}`;
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
  await exec.exec(`mkdir ${name}`);

  if (paths.extname(url) === '') {
    // If there is not extension, assume this is an unarchived binary.
    await exec.exec(`mv "${path}" "${name}/${name}"`);
    await exec.exec(`chmod +x "${name}/${name}"`);
  } else {
    const unTarCommand = getUnTarCommand(name, path, stripComponents, wildcard, binaryNewName);
    await exec.exec(`${unTarCommand}`);
  }

  cachedPath = await tc.cacheDir(name, name, version);
  core.addPath(cachedPath);
}

run();
