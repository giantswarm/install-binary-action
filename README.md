# install-binary-action

This action installs a binary packed into a .tar.gz archive from a given URL.

## Inputs

To check all the inputs and their defaults see [action.yml](action.yml) file.

### `binary`

**Required.** Name of the binary to be installed.

### `version`

**Required.** Version of the binary to be installed.

### `download_url`

**Optional.** Archive download URL. Can be in template format. Templated
variables are `${binary}` and `${version}`. If the URL has to extension then no
unarchiving will happen.

### `tarball_binary_path`

**Optional.** Binary path in the downloaded archive. Can contain wildcards. Can
be in template format. Templated variables are `${binary}` and `${version}`.

### `smoke_test`

**Optional.** Smoke test to run after the binary is installed. Can be in
template format. Templated variables are `${binary}` and `${version}`.

## `binary_new_name`

**Optional.** Name of the binary once is uncompressed and installed in the selected directory.

## Outputs

This action doesn't have any outputs.

## Example usage

Downloading a Giant Swarm binary with optional inputs left with default values:

```yaml
- name: Test downloading Giant Swarm binary
  uses: giantswarm/install-binary-action@VERSION
  with:
    binary: "devctl"
    version: "2.0.0"
```

Downloading an external binary with all optional inputs set except `binary_new_name` :

```yaml
- name: Test downloading external binary
  uses: giantswarm/install-binary-action@VERSION
  with:
    binary: "semver"
    version: "3.0.0"
    download_url: "https://github.com/fsaintjacques/${binary}-tool/archive/${version}.tar.gz"
    tarball_binary_path: "*/src/${binary}"
    smoke_test: "${binary} --version"
```

Downloading an external binary with all optional inputs including `binary_new_name` :

```yaml
- name: Test downloading aws-nuke with binary new name
  uses: ./
  with:
    binary: "aws-nuke"
    version: "v2.25.0"
    download_url: "https://github.com/rebuy-de/aws-nuke/releases/download/${version}/aws-nuke-${version}-linux-amd64.tar.gz"
    tarball_binary_path: "aws-nuke-${version}-linux-amd64"
    smoke_test: "${binary} version"
    binary_new_name: "aws-nuke"
```

Downloading an unarchived binary:

```yaml
- name: Test downloading external unarchived binary
  uses: ./
  with:
    binary: "vendir"
    version: "0.40.2"
    download_url: "https://github.com/carvel-dev/vendir/releases/download/v${version}/vendir-linux-amd64"
    smoke_test: "${binary} --version"
```
