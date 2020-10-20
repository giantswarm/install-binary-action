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
variables are `${binary}` and `${version}`.

### `tarball_binary_path`

**Optional.** Binary path in the downloaded archive. Can contain wildcards. Can
be in template format. Templated variables are `${binary}` and `${version}`.

### `smoke_test`

**Optional.** Smoke test to run after the binary is installed. Can be in
template format. Templated variables are `${binary}` and `${version}`.

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

Downloading an external binary with all optional inputs set:

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
