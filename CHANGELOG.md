# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [4.0.2] - 2026-04-20

### Changed

- Apply `${binary}` / `${version}` template substitution to `binary_new_name`,
  matching the behaviour already documented for `download_url`,
  `tarball_binary_path`, and `smoke_test`
  ([#339](https://github.com/giantswarm/install-binary-action/issues/339)).

## [4.0.1] - 2026-04-17

### Fixed

- Extract downloaded binaries into a unique directory under `RUNNER_TEMP`
  instead of the workspace, so the action no longer fails with
  `mkdir: cannot create directory 'X': File exists` when a workspace file or
  directory has the same name as the binary being installed
  ([#334](https://github.com/giantswarm/install-binary-action/issues/334)).

## [4.0.0] - 2025-12-12

### Changed

- Use NodeJS v24
- Bump @actions/core to v2
- Bump @actions/exec to v2

## [3.1.1] - 2025-08-07

### Changed

- Fix regression in handling unarchived downloads.

## [3.1.0] - 2025-08-04

### Added

- Add input `binary_new_name`.

## [3.0.0] - 2024-07-11

- Handle unarchived downloads. If downloaded file has no extension assume it's a binary.

## [2.0.0] - 2024-02-01

- Update action to use NodeJS 20.

## [1.1.0] - 2023-01-19

- Update action to use NodeJS 16.

## [1.0.0] - 2020-10-20

Initial release

[Unreleased]: https://github.com/giantswarm/install-binary-action/compare/v4.0.2...HEAD
[4.0.2]: https://github.com/giantswarm/install-binary-action/compare/v4.0.1...v4.0.2
[4.0.1]: https://github.com/giantswarm/install-binary-action/compare/v4.0.0...v4.0.1
[4.0.0]: https://github.com/giantswarm/install-binary-action/compare/v3.1.1...v4.0.0
[3.1.1]: https://github.com/giantswarm/install-binary-action/compare/v3.1.0...v3.1.1
[3.1.0]: https://github.com/giantswarm/install-binary-action/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/giantswarm/install-binary-action/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/giantswarm/install-binary-action/compare/v1.1.0...v2.0.0
[1.1.0]: https://github.com/giantswarm/install-binary-action/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/giantswarm/install-binary-action/releases/tag/v1.0.0
