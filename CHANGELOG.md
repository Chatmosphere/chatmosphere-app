# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
-
### Added
-
### Changed
-
### Fixed
-
### Removed


## [0.5.6] - 2021-01-27

### Added
- Added a changelog to track our releases :)

### Changed
- bumped version to 0.5.6
- Interim Enter Screen is omitted for now since it's currently more confusing than helpful; 
  so after Welcome one is direcly in the session/call; 
  we know some people are irritated that they are directly visible with video; we will target that with the enter screen in future releases


### Fixed
- No Videos where shown after camera permission request; hopefully fixed for now. 
- Potential Vulnerability in immer lib - updated to 8.0.1
- Dragging Position, meaning the position of the current user, is now truncated to integer; (float values cannot be displayed by browsers anyways)

### Removed
- uncommented the "Video" Button/Control in Footer because its not implemented yet

